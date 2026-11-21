import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: serial().primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
