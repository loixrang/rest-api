import {pgTable, text, timestamp, integer, pgEnum} from "drizzle-orm/pg-core"

export const userRole = pgEnum("role", [
  "INTERN", "ENGINEER", "ADMIN"
])

export const users = pgTable("Employee", {
  employee_id: text("employee_id").primaryKey(),
  id: integer("id").notNull(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  role: userRole("role").notNull(),
  createdAt: timestamp("createdAt", {withTimezone: true, mode: "date"}).defaultNow().notNull(),
  updatedAt: timestamp("updatedTime", {withTimezone: true, mode: "date"}).defaultNow().$onUpdate(() => new Date()).notNull()
})