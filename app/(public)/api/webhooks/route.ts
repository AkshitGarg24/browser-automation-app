import { verifyWebhook } from "@clerk/nextjs/webhooks"
import { NextRequest } from "next/server"

import { deleteWorkflowsByOrgId } from "@/features/workflows/data"

// TODO:
// Add real url in Clerk Dashboard Webhook to accept this POST request.

export async function POST(req: NextRequest) {
  let evt

  try {
    evt = await verifyWebhook(req)
  } catch (err) {
    console.error("Webhook verification failed:", err)
    return new Response("Webhook verification failed", { status: 400 })
  }

  if (evt.type === "organization.deleted") {
    const { id } = evt.data
    if (id) {
      await deleteWorkflowsByOrgId(id)
    }
  }

  return new Response("OK", { status: 200 })
}
