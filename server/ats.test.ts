import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ── Mock LLM to avoid real API calls ─────────────────────────────────────────
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [
      {
        message: {
          content: JSON.stringify({
            archetype: "The Visionary",
            strengths: ["Strategic thinking", "Innovation"],
            challenges: ["Delegation", "Patience"],
            cosmicGuidance: "Your Jupiter placement amplifies your visionary capacity.",
            actionSteps: ["Build a strong team", "Focus on systems"],
            affirmation: "I lead with clarity and cosmic purpose.",
            affirmations: [
              "I am a powerful creator.",
              "Abundance flows to me naturally.",
              "I lead with wisdom and courage.",
            ],
            guide: "Begin by settling into a comfortable position...",
            aiGuidance: "The stars align for your entrepreneurial journey.",
          }),
        },
      },
    ],
  }),
}));

vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue(null),
  upsertUser: vi.fn().mockResolvedValue(undefined),
  getUserByOpenId: vi.fn().mockResolvedValue(undefined),
  updateUserProfile: vi.fn().mockResolvedValue(undefined),
  saveQuizResult: vi.fn().mockResolvedValue(undefined),
  getUserQuizResults: vi.fn().mockResolvedValue([]),
  saveBirthChart: vi.fn().mockResolvedValue(undefined),
  getUserBirthCharts: vi.fn().mockResolvedValue([]),
  saveAffirmation: vi.fn().mockResolvedValue(undefined),
  getUserAffirmations: vi.fn().mockResolvedValue([]),
  saveGoal: vi.fn().mockResolvedValue({ id: 1 }),
  getUserGoals: vi.fn().mockResolvedValue([]),
  updateGoalStatus: vi.fn().mockResolvedValue(undefined),
}));

// ── Helpers ───────────────────────────────────────────────────────────────────
function makeCtx(authenticated = false): TrpcContext {
  return {
    user: authenticated
      ? {
          id: 1,
          openId: "test-user-123",
          name: "Test User",
          email: "test@example.com",
          loginMethod: "manus",
          role: "user" as const,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastSignedIn: new Date(),
        }
      : null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
      cookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

// ── Auth Tests ────────────────────────────────────────────────────────────────
describe("auth", () => {
  it("auth.me returns null for unauthenticated user", async () => {
    const caller = appRouter.createCaller(makeCtx(false));
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });

  it("auth.me returns user for authenticated user", async () => {
    const caller = appRouter.createCaller(makeCtx(true));
    const result = await caller.auth.me();
    expect(result).not.toBeNull();
    expect(result?.name).toBe("Test User");
  });

  it("auth.logout clears session cookie and returns success", async () => {
    const ctx = makeCtx(true);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
    expect(ctx.res.clearCookie).toHaveBeenCalled();
  });
});

// ── Quiz Tests ────────────────────────────────────────────────────────────────
describe("quiz", () => {
  it("quiz.analyze requires authentication", async () => {
    const caller = appRouter.createCaller(makeCtx(false));
    await expect(
      caller.quiz.analyze({
        quizType: "entrepreneur-archetype",
        answers: [{ question: "How do you make decisions?", answer: "Intuitively" }],
      })
    ).rejects.toThrow();
  });

  it("quiz.analyze returns AI analysis for authenticated user", async () => {
    const caller = appRouter.createCaller(makeCtx(true));
    const result = await caller.quiz.analyze({
      quizType: "entrepreneur-archetype",
      answers: [
        { question: "How do you make decisions?", answer: "Intuitively" },
        { question: "What drives you most?", answer: "Impact and legacy" },
      ],
    });
    expect(result).toBeDefined();
    expect(result.aiAnalysis).toBeDefined();
    expect(result.personalityType).toBeDefined();
  });

  it("quiz.history returns empty array for new authenticated user", async () => {
    const caller = appRouter.createCaller(makeCtx(true));
    const result = await caller.quiz.history();
    expect(Array.isArray(result)).toBe(true);
  });
});

// ── Birth Chart Tests ─────────────────────────────────────────────────────────
describe("birthChart", () => {
  it("birthChart.interpret requires authentication", async () => {
    const caller = appRouter.createCaller(makeCtx(false));
    await expect(
      caller.birthChart.interpret({
        name: "Test User",
        birthDate: "1990-01-01",
        birthTime: "12:00",
        birthPlace: "New York, USA",
      })
    ).rejects.toThrow();
  });

  it("birthChart.history returns array for authenticated user", async () => {
    const caller = appRouter.createCaller(makeCtx(true));
    const result = await caller.birthChart.history();
    expect(Array.isArray(result)).toBe(true);
  });
});

// ── Affirmations Tests ────────────────────────────────────────────────────────
describe("affirmations", () => {
  it("affirmations.generate is publicly accessible", async () => {
    const caller = appRouter.createCaller(makeCtx(false));
    const result = await caller.affirmations.generate({
      zodiacSign: "Aries",
      category: "abundance",
      count: 3,
    });
    expect(result).toBeDefined();
    expect(result.affirmations).toBeDefined();
    expect(Array.isArray(result.affirmations)).toBe(true);
  });

  it("affirmations.save requires authentication", async () => {
    const caller = appRouter.createCaller(makeCtx(false));
    await expect(
      caller.affirmations.save({ text: "I am powerful.", category: "confidence" })
    ).rejects.toThrow();
  });

  it("affirmations.saved returns array for authenticated user", async () => {
    const caller = appRouter.createCaller(makeCtx(true));
    const result = await caller.affirmations.saved();
    expect(Array.isArray(result)).toBe(true);
  });
});

// ── Goals Tests ───────────────────────────────────────────────────────────────
describe("goals", () => {
  it("goals.list requires authentication", async () => {
    const caller = appRouter.createCaller(makeCtx(false));
    await expect(caller.goals.list()).rejects.toThrow();
  });

  it("goals.list returns array for authenticated user", async () => {
    const caller = appRouter.createCaller(makeCtx(true));
    const result = await caller.goals.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("goals.create requires authentication", async () => {
    const caller = appRouter.createCaller(makeCtx(false));
    await expect(
      caller.goals.create({ title: "Scale to $100K", category: "revenue" })
    ).rejects.toThrow();
  });

  it("goals.create returns goal with AI guidance for authenticated user", async () => {
    const caller = appRouter.createCaller(makeCtx(true));
    const result = await caller.goals.create({
      title: "Scale to $100K",
      category: "revenue",
      zodiacSign: "Capricorn",
    });
    expect(result).toBeDefined();
    expect(result.aiGuidance).toBeDefined();
  });
});

// ── Meditation Tests ──────────────────────────────────────────────────────────
describe("meditation", () => {
  it("meditation.getGuide is publicly accessible", async () => {
    const caller = appRouter.createCaller(makeCtx(false));
    const result = await caller.meditation.getGuide({
      type: "morning-activation",
      duration: 10,
    });
    expect(result).toBeDefined();
    expect(result.guide).toBeDefined();
    expect(typeof result.guide).toBe("string");
  });

  it("meditation.getGuide accepts zodiac sign parameter", async () => {
    const caller = appRouter.createCaller(makeCtx(false));
    const result = await caller.meditation.getGuide({
      type: "abundance-visualization",
      duration: 5,
      zodiacSign: "Taurus",
    });
    expect(result.guide).toBeDefined();
  });
});
