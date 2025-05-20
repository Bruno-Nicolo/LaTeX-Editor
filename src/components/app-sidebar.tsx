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
import { MainNav, Workbench } from "./nav-sections";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [editing, setEditing] = React.useState(false);

  // placeholder da rimuovere!
  const projectName = "Project Name very very very long";
  const [newName, setName] = React.useState(projectName);

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
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
                {/* Display File Name */}
                <span
                  onDoubleClick={() => setEditing(true)}
                  className={`${editing && "hidden"} truncate font-semibold`}
                >
                  {newName}
                </span>
                {/* Modifica File Name */}
                <form
                  action="/foo"
                  method="post"
                  className={`${!editing && "hidden"} `}
                >
                  <input
                    autoFocus
                    name="renameFileInput"
                    value={newName}
                    onChange={(element) => setName(element.target.value)}
                    type="text"
                    className="w-full outline-none font-semibold"
                  ></input>
                  <button type="submit" className="hidden">
                    submit
                  </button>
                </form>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* Sidebar Content */}
      <SidebarContent>
        <MainNav />
      </SidebarContent>
      <SidebarFooter>
        <Workbench />
      </SidebarFooter>
    </Sidebar>
  );
}
