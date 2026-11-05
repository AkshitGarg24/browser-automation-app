import { auth } from "@clerk/nextjs/server"

import { WorkflowShell } from "@/features/workflows/components/workflow-shell"

interface WorkflowPageProps {
  params: Promise<{ id: string }>
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  await auth.protect()
  const { id } = await params

  return (
    <div className="h-svh w-full overflow-hidden">
      <WorkflowShell workflowId={id} />
    </div>
  )
}
