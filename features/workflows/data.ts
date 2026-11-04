import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  workflows,
  type WorkflowInsert,
  type WorkflowSelect,
} from "@/lib/db/schema";

export async function getWorkflows(orgId: string): Promise<WorkflowSelect[]> {
  return db.query.workflows.findMany({
    where: (workflow, { eq }) => eq(workflow.orgId, orgId),
  });
}

export async function createWorkflow({
  name,
  orgId,
}: Pick<WorkflowInsert, "name" | "orgId">): Promise<WorkflowSelect> {
  const [workflow] = await db
    .insert(workflows)
    .values({ name, orgId })
    .returning();

  return workflow;
}

export async function deleteWorkflowsByOrgId(orgId: string): Promise<void> {
  await db.delete(workflows).where(eq(workflows.orgId, orgId));
}
