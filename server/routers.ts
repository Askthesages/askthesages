import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import {
  saveQuizResult, getUserQuizResults,
  saveBirthChart, getUserBirthCharts,
  saveAffirmation, getUserAffirmations,
  saveGoal, getUserGoals, updateGoalStatus,
  updateUserProfile,
} from "./db";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ── User Profile ──────────────────────────────────────────
  profile: router({
    update: protectedProcedure
      .input(z.object({
        birthDate: z.string().optional(),
        birthTime: z.string().optional(),
        birthLocation: z.string().optional(),
        sunSign: z.string().optional(),
        moonSign: z.string().optional(),
        risingSign: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await updateUserProfile(ctx.user.id, input);
        return { success: true };
      }),
  }),

  // ── Quiz ──────────────────────────────────────────────────
  quiz: router({
    analyze: protectedProcedure
      .input(z.object({
        quizType: z.string(),
        answers: z.array(z.object({
          question: z.string(),
          answer: z.string(),
          score: z.number().optional(),
        })),
      }))
      .mutation(async ({ ctx, input }) => {
        const answersText = input.answers
          .map((a, i) => `Q${i + 1}: ${a.question}\nAnswer: ${a.answer}`)
          .join("\n\n");

        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `You are a wise sage and expert in Vedic astrology, Jungian psychology, and entrepreneurial mindset coaching. 
              Analyze the quiz answers and provide a deeply insightful, personalized personality and mindset analysis for this entrepreneur.
              Your response should be warm, empowering, and actionable. Use spiritual and psychological frameworks.
              Format your response with these sections:
              ## Your Entrepreneurial Archetype
              ## Core Strengths
              ## Growth Opportunities  
              ## Cosmic Alignment
              ## Your Path Forward
              Keep each section concise but profound. Use language that resonates with ambitious entrepreneurs.`,
            },
            {
              role: "user",
              content: `Quiz Type: ${input.quizType}\n\nAnswers:\n${answersText}`,
            },
          ],
        });

        const aiAnalysis = String(response.choices[0]?.message?.content || "");

        // Extract personality type from analysis
        const personalityTypeMatch = aiAnalysis.match(/## Your Entrepreneurial Archetype\n([^\n]+)/);
        const personalityType = personalityTypeMatch?.[1]?.trim() || "The Visionary";

        const resultId = await saveQuizResult({
          userId: ctx.user.id,
          quizType: input.quizType,
          answers: input.answers,
          aiAnalysis,
          personalityType,
          strengths: [],
          growthAreas: [],
        });

        return { aiAnalysis, personalityType, resultId };
      }),

    history: protectedProcedure.query(async ({ ctx }) => {
      return getUserQuizResults(ctx.user.id);
    }),
  }),

  // ── Birth Chart ───────────────────────────────────────────
  birthChart: router({
    interpret: protectedProcedure
      .input(z.object({
        name: z.string(),
        birthDate: z.string(),
        birthTime: z.string().optional(),
        birthLocation: z.string(),
        sunSign: z.string().optional(),
        moonSign: z.string().optional(),
        risingSign: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `You are a master Vedic astrologer and life coach specializing in entrepreneurial success. 
              Provide a profound, personalized birth chart interpretation that bridges ancient Vedic wisdom with modern entrepreneurial psychology.
              Structure your reading with these sections:
              ## Your Cosmic Identity
              ## Sun Sign — Your Core Purpose
              ## Moon Sign — Your Emotional Intelligence  
              ## Rising Sign — How the World Sees You
              ## Your Entrepreneurial Superpower
              ## Planetary Blessings & Challenges
              ## Auspicious Timing for Business
              ## Sacred Guidance
              Be specific, insightful, and empowering. Connect astrology to real business applications.`,
            },
            {
              role: "user",
              content: `Name: ${input.name}
Birth Date: ${input.birthDate}
Birth Time: ${input.birthTime || "Unknown"}
Birth Location: ${input.birthLocation}
Sun Sign: ${input.sunSign || "To be determined"}
Moon Sign: ${input.moonSign || "To be determined"}
Rising Sign: ${input.risingSign || "To be determined"}

Please provide a comprehensive Vedic birth chart interpretation for this entrepreneur.`,
            },
          ],
        });

        const aiInterpretation = String(response.choices[0]?.message?.content || "");

        await saveBirthChart({
          userId: ctx.user.id,
          name: input.name,
          birthDate: input.birthDate,
          birthTime: input.birthTime,
          birthLocation: input.birthLocation,
          sunSign: input.sunSign,
          moonSign: input.moonSign,
          risingSign: input.risingSign,
          aiInterpretation,
          planetaryPositions: {},
        });

        return { aiInterpretation };
      }),

    history: protectedProcedure.query(async ({ ctx }) => {
      return getUserBirthCharts(ctx.user.id);
    }),
  }),

  // ── Affirmations ──────────────────────────────────────────
  affirmations: router({
    generate: publicProcedure
      .input(z.object({
        zodiacSign: z.string().optional(),
        category: z.string().optional(),
        count: z.number().min(1).max(10).default(5),
      }))
      .mutation(async ({ input }) => {
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `You are a Vedic scholar and spiritual guide deeply versed in the sacred texts of ancient India.
              Your affirmations must be STRICTLY and EXCLUSIVELY rooted in the teachings of:
              - The Vedas (Rigveda, Samaveda, Yajurveda, Atharvaveda) — cosmic order, divine energy, universal consciousness
              - The Upanishads (Brihadaranyaka, Chandogya, Mandukya, Kena, Isha, etc.) — Atman, Brahman, self-realization, non-duality (Advaita)
              - The Bhagavad Gita — dharma, karma yoga, nishkama karma (desireless action), surrender to the Divine, equanimity

              Rules for generating affirmations:
              1. Every affirmation must reflect a direct teaching or principle from one of these three sacred sources
              2. Use first-person present tense ("I am...", "I embody...", "I act with...")
              3. Weave in Sanskrit concepts where natural (e.g., dharma, karma, atman, brahman, sattva, tapas, viveka)
              4. Apply the wisdom to the context of an entrepreneur's inner life — clarity, purpose, resilience, right action, detachment from outcomes
              5. Do NOT draw from New Age, Western psychology, or generic motivational language
              6. Each affirmation should feel ancient yet immediately applicable to a modern conscious entrepreneur

              Example style:
              - "I act with full effort and release attachment to outcomes, for I know that right action itself is the highest offering — Bhagavad Gita 2.47"
              - "I am the unchanging Atman, the witness behind all thoughts, unshaken by success or failure — Mandukya Upanishad"
              - "I walk my dharma with courage, for the universe supports those who live in alignment with their highest truth — Rigveda"

              Return ONLY a JSON array of affirmation strings, nothing else.`,
            },
            {
              role: "user",
              content: `Generate ${input.count} affirmations strictly from Vedic, Upanishadic, and Bhagavad Gita teachings${input.zodiacSign ? ` for a ${input.zodiacSign} entrepreneur` : " for a conscious entrepreneur"}${input.category ? ` focused on the theme of ${input.category}` : ""}. Each affirmation should cite or reference the specific teaching it draws from.`,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "affirmations_list",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  affirmations: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
                required: ["affirmations"],
                additionalProperties: false,
              },
            },
          },
        });

        const rawContent = response.choices[0]?.message?.content;
        const content = typeof rawContent === 'string' ? rawContent : '{"affirmations":[]}';
        const parsed = JSON.parse(content);
        return { affirmations: parsed.affirmations as string[] };
      }),

    save: protectedProcedure
      .input(z.object({ text: z.string(), category: z.string().optional() }))
      .mutation(async ({ ctx, input }) => {
        await saveAffirmation(ctx.user.id, input.text, input.category);
        return { success: true };
      }),

    saved: protectedProcedure.query(async ({ ctx }) => {
      return getUserAffirmations(ctx.user.id);
    }),
  }),

  // ── Goals ─────────────────────────────────────────────────
  goals: router({
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        category: z.string().optional(),
        targetDate: z.string().optional(),
        zodiacSign: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Get AI guidance
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `You are a Vedic astrology coach and business strategist. 
              Provide cosmic guidance for achieving this entrepreneurial goal. Include:
              - Astrological timing and planetary support
              - Vedic wisdom aligned with this goal
              - 3 specific action steps
              - Potential obstacles and how to navigate them
              Keep it concise, practical, and spiritually grounded.`,
            },
            {
              role: "user",
              content: `Goal: ${input.title}\n${input.description ? `Description: ${input.description}\n` : ""}${input.zodiacSign ? `Zodiac Sign: ${input.zodiacSign}\n` : ""}${input.targetDate ? `Target Date: ${input.targetDate}` : ""}`,
            },
          ],
        });

        const aiGuidance = String(response.choices[0]?.message?.content || "");

        await saveGoal({
          userId: ctx.user.id,
          title: input.title,
          description: input.description,
          category: input.category,
          targetDate: input.targetDate,
          aiGuidance,
          status: "active",
        });

        return { success: true, aiGuidance };
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserGoals(ctx.user.id);
    }),

    updateStatus: protectedProcedure
      .input(z.object({
        goalId: z.number(),
        status: z.enum(["active", "completed", "paused"]),
      }))
      .mutation(async ({ input }) => {
        await updateGoalStatus(input.goalId, input.status);
        return { success: true };
      }),
  }),

  // ── Meditation ────────────────────────────────────────────
  meditation: router({
    getGuide: publicProcedure
      .input(z.object({
        type: z.string(),
        duration: z.number().default(10),
        zodiacSign: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `You are a Vedic meditation teacher and mindfulness coach for entrepreneurs.
              Create a guided meditation script that is:
              - Practical and grounding for busy entrepreneurs
              - Infused with Vedic wisdom and cosmic awareness
              - Focused on the requested theme
              - Appropriate for the specified duration
              Include: opening intention, body scan, visualization, mantra, and closing.`,
            },
            {
              role: "user",
              content: `Create a ${input.duration}-minute ${input.type} meditation${input.zodiacSign ? ` for a ${input.zodiacSign}` : ""} entrepreneur.`,
            },
          ],
        });

        return { guide: String(response.choices[0]?.message?.content || "") };
      }),
  }),
});

export type AppRouter = typeof appRouter;
