import { useContext } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { GlobalContext } from "@/context";
import { SidebarMenuAction } from "./ui/sidebar";
import {
  Bookmark,
  FilePlus,
  FolderPlus,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import type { file } from "@/temp";

export function NavDropDown(props: { item: file }) {
  const context = useContext(GlobalContext);

  const renameItem = () => {
    context?.setEditedItemId(props.item.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction>
          <MoreHorizontal />
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        {/* ADD NEW FILE/FOLDER ONLY FOR FILES & PROJECTS */}
        {props.item.type !== "file" && (
          <>
            <DropdownMenuItem>
              <FilePlus />
              <span>New File</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FolderPlus />
              <span>New Folder</span>
            </DropdownMenuItem>
          </>
        )}
        {/* RENAMING */}
        <DropdownMenuItem
          onClick={(e) => {
            renameItem();
            e.stopPropagation();
          }}
        >
          <Pencil />
          <span>Rename</span>
        </DropdownMenuItem>
        {/* ADD TO WORKBENCH */}
        <DropdownMenuCheckboxItem checked={props.item.workbench}>
          <Bookmark className="text-muted-foreground" />
          <span>Workbench</span>
        </DropdownMenuCheckboxItem>
        {/* DELETE */}
        <DropdownMenuItem>
          <Trash2 />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
