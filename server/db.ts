import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, formSubmissions, InsertFormSubmission, newsletterSubscriptions, InsertNewsletterSubscription, courses, InsertCourse, lessons, InsertLesson, enrollments, InsertEnrollment, studentProgress, InsertStudentProgress, studentProfiles, InsertStudentProfile, teacherProfiles, InsertTeacherProfile, parentProfiles, InsertParentProfile } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Create a new form submission
 */
export async function createFormSubmission(data: InsertFormSubmission) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(formSubmissions).values(data);
  return result;
}

/**
 * Get all form submissions (for admin)
 */
export async function getAllFormSubmissions() {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return await db.select().from(formSubmissions);
}

/**
 * Subscribe email to newsletter
 */
export async function subscribeToNewsletter(email: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(newsletterSubscriptions).values({
      email,
      isActive: "true",
    }).onDuplicateKeyUpdate({
      set: { isActive: "true" },
    });
    return result;
  } catch (error) {
    console.error("[Database] Failed to subscribe to newsletter:", error);
    throw error;
  }
}

/**
 * Unsubscribe email from newsletter
 */
export async function unsubscribeFromNewsletter(email: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db
    .update(newsletterSubscriptions)
    .set({ isActive: "false", unsubscribedAt: new Date() })
    .where(eq(newsletterSubscriptions.email, email));
}

/**
 * Course queries
 */
export async function getAllCourses() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(courses);
}

export async function getCourseById(courseId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createCourse(data: InsertCourse) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(courses).values(data);
}

/**
 * Lesson queries
 */
export async function getLessonsByCourseId(courseId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(lessons).where(eq(lessons.courseId, courseId));
}

export async function createLesson(data: InsertLesson) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(lessons).values(data);
}

/**
 * Enrollment queries
 */
export async function getEnrollmentsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(enrollments).where(eq(enrollments.userId, userId));
}

export async function createEnrollment(data: InsertEnrollment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(enrollments).values(data);
}

/**
 * Student Profile queries
 */
export async function getStudentProfile(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(studentProfiles).where(eq(studentProfiles.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createOrUpdateStudentProfile(userId: number, data: Partial<InsertStudentProfile>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getStudentProfile(userId);
  if (existing) {
    return await db.update(studentProfiles).set(data).where(eq(studentProfiles.userId, userId));
  }
  return await db.insert(studentProfiles).values({ userId, ...data });
}

/**
 * Teacher Profile queries
 */
export async function getTeacherProfile(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(teacherProfiles).where(eq(teacherProfiles.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createOrUpdateTeacherProfile(userId: number, data: Partial<InsertTeacherProfile>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getTeacherProfile(userId);
  if (existing) {
    return await db.update(teacherProfiles).set(data).where(eq(teacherProfiles.userId, userId));
  }
  return await db.insert(teacherProfiles).values({ userId, ...data });
}

/**
 * Parent Profile queries
 */
export async function getParentProfile(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(parentProfiles).where(eq(parentProfiles.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createOrUpdateParentProfile(userId: number, data: Partial<InsertParentProfile>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getParentProfile(userId);
  if (existing) {
    return await db.update(parentProfiles).set(data).where(eq(parentProfiles.userId, userId));
  }
  return await db.insert(parentProfiles).values({ userId, ...data });
}

/**
 * Authentication queries
 */
export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createUser(name: string, email: string, passwordHash: string, role: 'student' | 'teacher' | 'parent' = 'student') {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Use email as openId for email/password signup
  const openId = `email_${email}`;
  
  const result = await db.insert(users).values({
    openId,
    name,
    email,
    passwordHash,
    role,
    loginMethod: 'email',
    lastSignedIn: new Date(),
  });
  
  return result;
}
