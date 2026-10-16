"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createWorkflow, getWorkflows } from "@/features/workflows/data"
import { generateSlug } from "@/features/workflows/utils"
import type { WorkflowSelect } from "@/lib/db/schema"

export async function createWorkflowAction() {
  const { orgId } = await auth()

  if (!orgId) {
    redirect("/choose-organization?error=org-required")
  }

  const workflowName = generateSlug()

  const workflow = await createWorkflow({
    name: workflowName,
    orgId,
  })

  revalidatePath("/workflows")
  redirect(`/workflows/${workflow.id}`)
}

export async function listWorkflowsAction(): Promise<WorkflowSelect[]> {
  const { orgId } = await auth()

  if (!orgId) {
    return []
  }

  return getWorkflows(orgId)
}
