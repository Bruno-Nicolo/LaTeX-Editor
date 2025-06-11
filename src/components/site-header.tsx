import { Bell, CircleUserRound, Home, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Toolbar, ToolbarButton } from "./toolbar";
import { SettingsMenu } from "./settings";
import type { ReactNode } from "react";

export function SiteHeader(props: { children: ReactNode }) {
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b px-4 flex h-(--header-height) items-center gap-2 ">
      {props.children}
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
