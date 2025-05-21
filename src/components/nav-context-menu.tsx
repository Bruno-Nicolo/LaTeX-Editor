import { useContext, type ReactNode } from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { GlobalContext } from "@/context";

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
  const context = useContext(GlobalContext);

  const renameItem = () => {
    context?.setEditedItemId(props.item.id);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={renameItem}>Rename</ContextMenuItem>
        <ContextMenuCheckboxItem checked={props.item.workbench}>
          Workbench
        </ContextMenuCheckboxItem>
        <ContextMenuItem className="text-destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
