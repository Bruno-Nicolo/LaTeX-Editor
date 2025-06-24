import * as React from "react";
import { BookOpen } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MainNav } from "./main-nav";
import { RenamingArea } from "./ui/renaming-area";
import { Workbench } from "./workbench";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // placeholder da rimuovere!
  const projectName = "Project Name very very very long";
  const projectId = 1;

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height)-3rem)]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <BookOpen className="size-4" />
                </div>
                {/* Name */}
                <RenamingArea id={projectId}>{projectName}</RenamingArea>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* Sidebar Content */}
      <SidebarContent>
        <MainNav />
      </SidebarContent>
      <SidebarFooter className=" m-0 p-0 ">
        <Workbench />
      </SidebarFooter>
    </Sidebar>
  );
}
