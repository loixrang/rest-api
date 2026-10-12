import {pgTable, text, timestamp, integer, pgEnum} from "drizzle-orm/pg-core"

export const userRole = pgEnum("role", [
  "INTERN", "ENGINEER", "ADMIN"
])

export const users = pgTable("employee", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  role: userRole("role").notNull(),
  createdAt: timestamp("created_at", {withTimezone: true, mode: "date"}).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", {withTimezone: true, mode: "date"}).defaultNow().$onUpdate(() => new Date()).notNull()
})