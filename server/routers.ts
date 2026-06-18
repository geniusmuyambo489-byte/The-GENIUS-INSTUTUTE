import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createFormSubmission, subscribeToNewsletter, getAllCourses, getCourseById, getLessonsByCourseId, getEnrollmentsByUserId, getStudentProfile, getTeacherProfile, getParentProfile, createOrUpdateStudentProfile, getUserByEmail, createUser, getUserById, createOrUpdateStudentProfile as createStudentProfile } from "./db";
import { notifyOwner } from "./_core/notification";
import { TRPCError } from "@trpc/server";
import { hashPassword, verifyPassword } from "./auth";
import { sdk } from "./_core/sdk";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    signup: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Valid email is required"),
          password: z.string().min(8, "Password must be at least 8 characters"),
          role: z.enum(['student', 'teacher', 'parent']),
          school: z.string().min(1, "School/Institution is required"),
          level: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        try {
          const existingUser = await getUserByEmail(input.email);
          if (existingUser) {
            throw new TRPCError({
              code: 'CONFLICT',
              message: 'Email already registered. Please log in or use a different email.',
            });
          }

          const passwordHash = await hashPassword(input.password);
          const result = await createUser(input.name, input.email, passwordHash, input.role);
          
          // Get the newly created user
          const newUser = await getUserByEmail(input.email);
          if (!newUser) {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Failed to create account. Please try again.',
            });
          }

          // Create role-specific profile
          if (input.role === 'student') {
            await createStudentProfile(newUser.id, {
              school: input.school,
              currentLevel: input.level,
            });
          }
          
          return {
            success: true,
            message: 'Account created successfully. Please log in.',
            userId: newUser.id,
          };
        } catch (error) {
          if (error instanceof TRPCError) throw error;
          console.error('Signup error:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to create account. Please try again.',
          });
        }
      }),
    login: publicProcedure
      .input(
        z.object({
          email: z.string().email("Valid email is required"),
          password: z.string().min(1, "Password is required"),
        })
      )
      .mutation(async ({ input, ctx }) => {
        try {
          const user = await getUserByEmail(input.email);
          if (!user || !user.passwordHash) {
            throw new TRPCError({
              code: 'UNAUTHORIZED',
              message: 'Invalid email or password.',
            });
          }

          const passwordMatch = await verifyPassword(input.password, user.passwordHash);
          if (!passwordMatch) {
            throw new TRPCError({
              code: 'UNAUTHORIZED',
              message: 'Invalid email or password.',
            });
          }

          // Create session token
          const sessionToken = await sdk.createSessionToken(user.openId, {
            name: user.name || '',
          });

          // Set session cookie
          const cookieOptions = getSessionCookieOptions(ctx.req);
          ctx.res.cookie(COOKIE_NAME, sessionToken, {
            ...cookieOptions,
            maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
          });

          return {
            success: true,
            message: 'Logged in successfully.',
            userId: user.id,
            role: user.role,
          };
        } catch (error) {
          if (error instanceof TRPCError) throw error;
          console.error('Login error:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Login failed. Please try again.',
          });
        }
      }),
  }),

  forms: router({
    submitLeadForm: publicProcedure
      .input(
        z.object({
          studentName: z.string().min(1, "Student name is required"),
          institution: z.string().min(1, "Institution is required"),
          currentLevel: z.string().min(1, "Current level is required"),
          subject: z.string().min(1, "Subject is required"),
          challenges: z.string().min(10, "Please describe your challenges in detail"),
          preferredStart: z.string().min(1, "Preferred start date is required"),
          budgetRange: z.string().min(1, "Budget range is required"),
          email: z.string().email("Valid email is required"),
          phone: z.string().min(7, "Valid phone number is required"),
          preferredContact: z.string().min(1, "Preferred contact method is required"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const result = await createFormSubmission({
            ...input,
            status: "pending",
          });

          await notifyOwner({
            title: "New Lead Form Submission",
            content: `New submission from ${input.studentName} (${input.email}). Subject: ${input.subject}. Level: ${input.currentLevel}.`,
          });

          return {
            success: true,
            message: "Form submitted successfully. We will contact you soon!",
          };
        } catch (error) {
          console.error("Form submission error:", error);
          throw new Error("Failed to submit form. Please try again.");
        }
      }),
  }),

  newsletter: router({
    subscribe: publicProcedure
      .input(
        z.object({
          email: z.string().email("Valid email is required"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          await subscribeToNewsletter(input.email);

          return {
            success: true,
            message: "Successfully subscribed to our newsletter!",
          };
        } catch (error) {
          console.error("Newsletter subscription error:", error);
          throw new Error("Failed to subscribe. Please try again.");
        }
      }),
  }),

  courses: router({
    getAll: publicProcedure.query(async () => {
      return await getAllCourses();
    }),
    getById: publicProcedure
      .input(z.object({ courseId: z.number() }))
      .query(async ({ input }) => {
        return await getCourseById(input.courseId);
      }),
  }),

  lessons: router({
    getByCourseId: publicProcedure
      .input(z.object({ courseId: z.number() }))
      .query(async ({ input }) => {
        return await getLessonsByCourseId(input.courseId);
      }),
  }),

  enrollments: router({
    getByUserId: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.id !== input.userId && ctx.user?.role !== 'admin') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'You can only access your own enrollments',
          });
        }
        return await getEnrollmentsByUserId(input.userId);
      }),
  }),

  studentProfile: router({
    getProfile: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.id !== input.userId && ctx.user?.role !== 'admin') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'You can only access your own profile',
          });
        }
        return await getStudentProfile(input.userId);
      }),
    updateProfile: protectedProcedure
      .input(
        z.object({
          userId: z.number(),
          school: z.string().optional(),
          currentLevel: z.string().optional(),
          subjects: z.string().optional(),
          bio: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { userId, ...data } = input;
        
        if (ctx.user?.id !== userId && ctx.user?.role !== 'admin') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'You can only update your own profile',
          });
        }
        
        await createOrUpdateStudentProfile(userId, data);
        return { success: true };
      }),
  }),

  teacherProfile: router({
    getProfile: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.id !== input.userId && ctx.user?.role !== 'admin') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'You can only access your own profile',
          });
        }
        return await getTeacherProfile(input.userId);
      }),
  }),

  parentProfile: router({
    getProfile: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.id !== input.userId && ctx.user?.role !== 'admin') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'You can only access your own profile',
          });
        }
        return await getParentProfile(input.userId);
      }),
  }),
});

export type AppRouter = typeof appRouter;
