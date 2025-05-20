import type { ReactNode } from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";

export function NavContextMenu(props: {
  item: {
    name: string;
    id: number;
    parent_id: number;
    type: "folder" | "file" | "project" | string;
    workbench: boolean;
    isActive: boolean;
  };
  children: ReactNode;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Rename</ContextMenuItem>
        <ContextMenuCheckboxItem checked={props.item.workbench}>
          Workbench
        </ContextMenuCheckboxItem>
        <ContextMenuItem className="text-destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
