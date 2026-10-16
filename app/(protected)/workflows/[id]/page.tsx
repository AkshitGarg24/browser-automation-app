import { auth } from "@clerk/nextjs/server"
import { Workflow } from "lucide-react"

interface WorkflowPageProps {
  params: Promise<{ id: string }>
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  await auth.protect()
  const { id } = await params

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg border border-border/40 bg-muted/60 text-muted-foreground">
          <Workflow className="size-4" />
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Workflow
        </h1>
      </div>
      <p className="text-sm text-muted-foreground">
        ID: <code className="font-mono text-xs text-foreground">{id}</code>
      </p>
    </div>
  )
}
