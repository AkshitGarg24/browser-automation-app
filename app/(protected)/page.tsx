import { Plus, Workflow } from "lucide-react"

import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server"

export default async function Page() {
  await auth.protect();

  return (
    <div className="flex min-h-[calc(100svh-57px)] flex-col items-center justify-center p-4 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl border border-border/40 bg-muted/60 text-muted-foreground shadow-xs">
        <Workflow className="size-6" />
      </div>
      <h1 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
        No workflow selected
      </h1>
      <p className="mt-2 text-base text-muted-foreground">
        Select a workflow from the sidebar
        <br />
        or create a new one to get started.
      </p>
      <Button className="mt-6 gap-2">
        <Plus className="size-4" />
        New workflow
      </Button>
    </div>
  )
}

