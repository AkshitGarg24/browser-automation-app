import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const timestampColumns = {
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
}

export const workflows = pgTable("Workflows", {
    id: uuid("id").primaryKey().defaultRandom(),
    orgId: text("org_id").notNull(),
    name: text("name").notNull(),
    graph: jsonb("graph"),
    ...timestampColumns
})

export type WorkflowSelect = typeof workflows.$inferSelect;
export type WorkflowInsert = typeof workflows.$inferInsert;