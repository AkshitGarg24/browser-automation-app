interface WorkflowCanvasProps {
  workflowId?: string
}

export function WorkflowCanvas({}: WorkflowCanvasProps) {
  return (
    <div className="flex h-full w-full items-center justify-center text-sm font-medium text-muted-foreground">
      Canvas
    </div>
  )
}
