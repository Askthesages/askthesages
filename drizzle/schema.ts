import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  json,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  // Astrology profile
  birthDate: varchar("birthDate", { length: 20 }),
  birthTime: varchar("birthTime", { length: 10 }),
  birthLocation: text("birthLocation"),
  sunSign: varchar("sunSign", { length: 32 }),
  moonSign: varchar("moonSign", { length: 32 }),
  risingSign: varchar("risingSign", { length: 32 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const quizResults = mysqlTable("quiz_results", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  quizType: varchar("quizType", { length: 64 }).notNull(), // 'personality' | 'mindset' | 'entrepreneur'
  answers: json("answers").notNull(),
  aiAnalysis: text("aiAnalysis"),
  personalityType: varchar("personalityType", { length: 128 }),
  strengths: json("strengths"),
  growthAreas: json("growthAreas"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type QuizResult = typeof quizResults.$inferSelect;
export type InsertQuizResult = typeof quizResults.$inferInsert;

export const birthCharts = mysqlTable("birth_charts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 128 }).notNull(),
  birthDate: varchar("birthDate", { length: 20 }).notNull(),
  birthTime: varchar("birthTime", { length: 10 }),
  birthLocation: text("birthLocation").notNull(),
  latitude: varchar("latitude", { length: 32 }),
  longitude: varchar("longitude", { length: 32 }),
  sunSign: varchar("sunSign", { length: 32 }),
  moonSign: varchar("moonSign", { length: 32 }),
  risingSign: varchar("risingSign", { length: 32 }),
  aiInterpretation: text("aiInterpretation"),
  planetaryPositions: json("planetaryPositions"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BirthChart = typeof birthCharts.$inferSelect;
export type InsertBirthChart = typeof birthCharts.$inferInsert;

export const savedAffirmations = mysqlTable("saved_affirmations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  text: text("text").notNull(),
  category: varchar("category", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SavedAffirmation = typeof savedAffirmations.$inferSelect;

export const goals = mysqlTable("goals", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 64 }),
  targetDate: varchar("targetDate", { length: 20 }),
  status: mysqlEnum("status", ["active", "completed", "paused"]).default("active").notNull(),
  aiGuidance: text("aiGuidance"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Goal = typeof goals.$inferSelect;
export type InsertGoal = typeof goals.$inferInsert;
