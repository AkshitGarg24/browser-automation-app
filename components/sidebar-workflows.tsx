"use client"

import * as React from "react"
import { Plus, Workflow } from "lucide-react"

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
import { cn } from "@/lib/utils"

interface SidebarWorkflowsProps {
  workflows: string[]
}

export function SidebarWorkflows({ workflows }: SidebarWorkflowsProps) {
  const [activeWorkflow, setActiveWorkflow] = React.useState<string>(workflows[0] ?? "")

  return (
    <>
      {/* Expanded workflow list */}
      <SidebarGroup className="px-2 py-1 group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel className="flex items-center justify-between px-2 text-sm font-medium text-muted-foreground/80">
          Workflows
        </SidebarGroupLabel>
        <SidebarGroupAction
          title="Create workflow"
          className="text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Plus className="size-4" />
          <span className="sr-only">Create workflow</span>
        </SidebarGroupAction>

        <SidebarGroupContent className="mt-1">
          <SidebarMenu className="gap-0.5">
            {workflows.map((workflow) => {
              const isActive = activeWorkflow === workflow
              return (
                <SidebarMenuItem key={workflow}>
                  <SidebarMenuButton
                    isActive={isActive}
                    onClick={() => setActiveWorkflow(workflow)}
                    className={cn(
                      "h-9 px-2.5 text-sm font-normal rounded-md transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/90 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <span className="truncate">{workflow}</span>
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
            <DropdownMenuItem className="gap-2 font-medium cursor-pointer">
              <Plus className="size-4" />
              <span>New workflow</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {workflows.map((workflow) => {
              const isActive = activeWorkflow === workflow
              return (
                <DropdownMenuItem
                  key={workflow}
                  onClick={() => setActiveWorkflow(workflow)}
                  className={cn(
                    "cursor-pointer",
                    isActive && "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                  )}
                >
                  <span className="truncate">{workflow}</span>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
