import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { NavDropDown } from "./nav-dropdown";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

import {
  BookOpen,
  ChevronRight,
  File,
  Folder,
  LibraryBig,
  Image,
  Crown,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "./ui/sidebar";
import { CreationDialog, UploadFileDialog } from "./nav-dialogs";
import { RenamingArea } from "./ui/renaming-area";

// REMOVE
import { ACTIVEPROJECTID, MOCKFOLDERS, type file } from "@/temp";

export function MainNav() {
  const activeResources = MOCKFOLDERS.filter(
    (item) => item.parent_id == ACTIVEPROJECTID
  );

  return (
    <SidebarGroup className="max-h-full">
      {/* Group heading */}
      <SidebarGroupLabel className="gap-2 p-2">
        <span className="flex-grow">Files</span>
        <CreationDialog type="file" />
        <CreationDialog type="folder" />
        <UploadFileDialog />
      </SidebarGroupLabel>
      {/* Content */}
      <SidebarGroupContent className="p-2 overflow-y-auto overflow-x-hidden">
        <FileTree data={activeResources} />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function FileTree(props: { data: file[] }) {
  return (
    <SidebarMenu>
      {props.data.map((item) => (
        <NavItem item={item} key={item.id} />
      ))}
    </SidebarMenu>
  );
}

function GetIcon(props: { item: file }) {
  return props.item.name.includes(".bib") ? (
    <LibraryBig />
  ) : props.item.name.includes(".png") || props.item.name.includes(".jpg") ? (
    <Image />
  ) : props.item.isMain ? (
    <Crown className="stroke-amber-400 fill-amber-100" />
  ) : (
    <File />
  );
}

export function NavItem(props: { item: file }) {
  if (props.item.type === "file") {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton tooltip={props.item.name} asChild>
          <a href="#">
            <GetIcon item={props.item} />
            <RenamingArea id={props.item.id}>{props.item.name}</RenamingArea>
            <NavDropDown item={props.item} />
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  const subItems = MOCKFOLDERS.filter((obj) => obj.parent_id == props.item.id);
  return (
    <SidebarMenuItem>
      <Collapsible className="group/collapsible" defaultOpen={true}>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={props.item.name} className="truncate ">
            <ChevronRight className="toggle" />
            {props.item.type === "folder" ? <Folder /> : <BookOpen />}
            <RenamingArea id={props.item.id}>{props.item.name}</RenamingArea>
            <NavDropDown item={props.item} />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {subItems.length ? (
            <SidebarMenuSub className="mr-0 pr-0.5">
              {subItems.map((subItem) => (
                <NavItem item={subItem} key={subItem.id} />
              ))}
            </SidebarMenuSub>
          ) : null}
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
