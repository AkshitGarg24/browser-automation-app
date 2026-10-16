"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Loader2, Plus, Workflow } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { createWorkflowAction } from "@/features/workflows/action"
import type { WorkflowSelect } from "@/lib/db/schema"
import { cn } from "@/lib/utils"

interface SidebarWorkflowsProps {
  workflows: WorkflowSelect[]
}

export function SidebarWorkflows({ workflows }: SidebarWorkflowsProps) {
  const pathname = usePathname()
  const [isPending, startTransition] = React.useTransition()

  const handleCreateWorkflow = () => {
    startTransition(async () => {
      await createWorkflowAction()
    })
  }

  return (
    <>
      {/* Expanded workflow list */}
      <SidebarGroup className="px-2 py-1 group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel className="flex items-center justify-between px-2 text-sm font-medium text-muted-foreground/80">
          Workflows
        </SidebarGroupLabel>
        <SidebarGroupAction
          title="Create workflow"
          onClick={handleCreateWorkflow}
          disabled={isPending}
          className="text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Plus className="size-4" />
          )}
          <span className="sr-only">Create workflow</span>
        </SidebarGroupAction>

        <SidebarGroupContent className="mt-1">
          <SidebarMenu className="gap-0.5">
            {workflows.map((workflow) => {
              const isActive = pathname === `/workflows/${workflow.id}`
              return (
                <SidebarMenuItem key={workflow.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      "h-9 px-2.5 text-sm font-normal rounded-md transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/90 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <Link href={`/workflows/${workflow.id}`}>
                      <span className="truncate">{workflow.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Collapsed icon view with dropdown */}
      <div className="hidden group-data-[collapsible=icon]:flex flex-col items-center py-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
              title="Workflows"
            >
              <Workflow className="size-4" />
              <span className="sr-only">Workflows</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="w-56">
            <DropdownMenuItem
              onClick={handleCreateWorkflow}
              disabled={isPending}
              className="gap-2 font-medium cursor-pointer"
            >
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Plus className="size-4" />
              )}
              <span>New workflow</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {workflows.map((workflow) => {
              const isActive = pathname === `/workflows/${workflow.id}`
              return (
                <DropdownMenuItem
                  key={workflow.id}
                  asChild
                  className={cn(
                    "cursor-pointer",
                    isActive &&
                      "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                  )}
                >
                  <Link href={`/workflows/${workflow.id}`}>
                    <span className="truncate">{workflow.name}</span>
                  </Link>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
