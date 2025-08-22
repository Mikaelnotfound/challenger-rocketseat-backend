import { pgTable, uuid, text, timestamp, unique } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
});

export const courses = pgTable("courses", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull().unique(),
  description: text("description"),
});

export const enrollments = pgTable(
  "enrollments",
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid()
      .notNull()
      .references(() => users.id),
    courseId: uuid()
      .notNull()
      .references(() => courses.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      uniqueEnrollment: unique().on(table.userId, table.courseId),
    };
  },
);

