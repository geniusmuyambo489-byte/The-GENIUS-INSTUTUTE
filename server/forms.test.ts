import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("forms.submitLeadForm", () => {
  it("validates required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Test missing student name
    try {
      await caller.forms.submitLeadForm({
        studentName: "",
        institution: "Test School",
        currentLevel: "Advanced Level",
        subject: "Mathematics",
        challenges: "Struggling with calculus concepts",
        preferredStart: "Next Month",
        budgetRange: "$100-200",
        email: "test@example.com",
        phone: "1234567890",
        preferredContact: "email",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("required");
    }
  });

  it("validates email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.forms.submitLeadForm({
        studentName: "John Doe",
        institution: "Test School",
        currentLevel: "Advanced Level",
        subject: "Mathematics",
        challenges: "Struggling with calculus concepts",
        preferredStart: "Next Month",
        budgetRange: "$100-200",
        email: "invalid-email",
        phone: "1234567890",
        preferredContact: "email",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("email");
    }
  });

  it("validates challenges description length", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.forms.submitLeadForm({
        studentName: "John Doe",
        institution: "Test School",
        currentLevel: "Advanced Level",
        subject: "Mathematics",
        challenges: "Short",
        preferredStart: "Next Month",
        budgetRange: "$100-200",
        email: "test@example.com",
        phone: "1234567890",
        preferredContact: "email",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("detail");
    }
  });
});

describe("newsletter.subscribe", () => {
  it("validates email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.newsletter.subscribe({
        email: "invalid-email",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("email");
    }
  });
});
