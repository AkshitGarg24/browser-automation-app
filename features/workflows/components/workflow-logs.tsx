interface WorkflowLogsProps {
  workflowId?: string
}

export function WorkflowLogs({}: WorkflowLogsProps) {
  return (
    <div className="flex h-full w-full items-center justify-center text-sm font-medium text-muted-foreground">
      Logs
    </div>
  )
}
