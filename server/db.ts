import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, quizResults, birthCharts, savedAffirmations, goals, InsertQuizResult, InsertBirthChart, InsertGoal } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

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
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }
  try {
    const values: InsertUser = { openId: user.openId };
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
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserProfile(userId: number, data: Partial<typeof users.$inferInsert>) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set(data).where(eq(users.id, userId));
}

// Quiz Results
export async function saveQuizResult(data: InsertQuizResult) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(quizResults).values(data);
  return result;
}

export async function getUserQuizResults(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(quizResults).where(eq(quizResults.userId, userId)).orderBy(desc(quizResults.createdAt)).limit(10);
}

// Birth Charts
export async function saveBirthChart(data: InsertBirthChart) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(birthCharts).values(data);
}

export async function getUserBirthCharts(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(birthCharts).where(eq(birthCharts.userId, userId)).orderBy(desc(birthCharts.createdAt)).limit(5);
}

// Affirmations
export async function saveAffirmation(userId: number, text: string, category?: string) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(savedAffirmations).values({ userId, text, category });
}

export async function getUserAffirmations(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(savedAffirmations).where(eq(savedAffirmations.userId, userId)).orderBy(desc(savedAffirmations.createdAt)).limit(20);
}

// Goals
export async function saveGoal(data: InsertGoal) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(goals).values(data);
}

export async function getUserGoals(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(goals).where(eq(goals.userId, userId)).orderBy(desc(goals.createdAt));
}

export async function updateGoalStatus(goalId: number, status: "active" | "completed" | "paused") {
  const db = await getDb();
  if (!db) return;
  await db.update(goals).set({ status }).where(eq(goals.id, goalId));
}
