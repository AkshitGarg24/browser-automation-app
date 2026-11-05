interface WorkflowInspectorProps {
  workflowId?: string
}

export function WorkflowInspector({}: WorkflowInspectorProps) {
  return (
    <div className="flex h-full w-full items-center justify-center text-sm font-medium text-muted-foreground">
      Inspector
    </div>
  )
}
