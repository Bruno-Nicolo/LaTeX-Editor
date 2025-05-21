import {
  Bell,
  CircleUserRound,
  Home,
  Settings,
  SidebarIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useSidebar } from "@/components/ui/sidebar";
import { Toolbar, ToolbarButton } from "./toolbar";
import { SettingsMenu } from "./settings";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b px-4 flex h-(--header-height) items-center gap-2 ">
      <Button
        className="h-8 w-8"
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
      >
        <SidebarIcon />
      </Button>
      <Button className="h-8 w-8" variant="ghost" size="icon">
        <Home />
      </Button>

      <div className="flex-grow flex justify-center">
        <Toolbar />
      </div>

      <Button className="h-8 w-8" variant="ghost" size="icon">
        <Bell />
      </Button>

      <SettingsMenu>
        <ToolbarButton icon>
          <Settings />
        </ToolbarButton>
      </SettingsMenu>

      <Button className="h-8 w-8" variant="ghost" size="icon">
        <CircleUserRound />
      </Button>
    </header>
  );
}
