import * as React from "react"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

import { listWorkflowsAction } from "@/features/workflows/action"
import { SidebarWorkflows } from "@/features/workflows/components/sidebar-workflows"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const workflows = await listWorkflowsAction()

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border" {...props}>
      <SidebarHeader className="p-3">
        <div className="flex items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center">
          <div className="flex min-w-0 items-center group-data-[collapsible=icon]:hidden">
            <OrganizationSwitcher
              hidePersonal={false}
              appearance={{
                elements: {
                  rootBox: "flex items-center",
                  organizationSwitcherTrigger:
                    "flex items-center gap-2 p-1.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors",
                },
              }}
            />
          </div>
          <SidebarTrigger className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarWorkflows workflows={workflows} />
      </SidebarContent>

      <SidebarFooter className="p-3">
        <div className="flex items-center group-data-[collapsible=icon]:justify-center">
          <UserButton
            appearance={{
              elements: {
                rootBox: "flex items-center",
                userButtonAvatarBox: "size-8",
              },
            }}
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
