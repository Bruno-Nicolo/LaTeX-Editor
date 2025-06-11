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
  Bookmark,
  BookOpen,
  ChevronRight,
  File,
  Folder,
  Maximize2,
  LibraryBig,
  Image,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { CreationDialog, UploadFileDialog } from "./nav-dialogs";
import { RenamingArea } from "./ui/renaming-area";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type ReactNode } from "react";
import { Button } from "./ui/button";
import { MonacoEditor } from "./editor/editorMonaco";

// REMOVE
import { ACTIVEPROJECTID, getFilePath, MOCKFOLDERS, type file } from "@/temp";

export function Workbench() {
  const pinnedResources = MOCKFOLDERS.filter((item) => item.workbench == true);

  if (pinnedResources)
    return (
      <>
        <Separator />
        <SidebarGroup className="gap-2  max-h-80">
          <SidebarGroupLabel className="gap-2">
            <Bookmark />
            Workbench
          </SidebarGroupLabel>
          <SidebarGroupContent className="overflow-y-auto  overflow-x-hidden">
            <FileTree data={pinnedResources} isWorkbenchSection={true} />
          </SidebarGroupContent>
        </SidebarGroup>
      </>
    );
}

function WorkbenchPreview(props: { children: ReactNode; item: file }) {
  return (
    <Dialog>
      <DialogTrigger className="truncate w-full">
        {props.children}
      </DialogTrigger>
      <DialogContent className="min-w-[70%] h-[80%] flex flex-col">
        <DialogHeader className="truncate ">
          <Button
            variant={"ghost"}
            className="w-fit absolute m-2 right-4 top-1"
          >
            <Maximize2 />
          </Button>
          <DialogTitle className="truncate mr-8 pb-2">
            <span>{getFilePath(props.item)}</span>
          </DialogTitle>
        </DialogHeader>
        <Separator className="mb-2" />
        {/* Mostra l'editor solo con file LaTeX */}
        {props.item.name.includes(".tex") ||
        props.item.name.includes(".bib") ? (
          <MonacoEditor />
        ) : (
          <p>Embed photo</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function MainNav() {
  const activeResources = MOCKFOLDERS.filter(
    (item) => item.parent_id == ACTIVEPROJECTID
  );

  return (
    <SidebarGroup className="max-h-full">
      {/* Group heading */}
      <SidebarGroupLabel className="gap-2">
        <span className="flex-grow">Files</span>
        <CreationDialog type="file" />
        <CreationDialog type="folder" />
        <UploadFileDialog />
      </SidebarGroupLabel>
      {/* Content */}
      <SidebarGroupContent className="overflow-y-auto overflow-x-hidden">
        <FileTree data={activeResources} />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function FileTree(props: {
  data: file[];
  isWorkbenchSection?: boolean;
}) {
  return (
    <SidebarMenu>
      {props.data.map((item) => (
        <NavItem
          item={item}
          key={item.id}
          isWorkbenchSection={props.isWorkbenchSection ?? false}
        />
      ))}
    </SidebarMenu>
  );
}

function FileIcon(props: { itemName: string }) {
  return props.itemName.includes(".bib") ? (
    <LibraryBig />
  ) : props.itemName.includes(".png") || props.itemName.includes(".jpg") ? (
    <Image />
  ) : (
    <File />
  );
}

export function NavItem(props: { item: file; isWorkbenchSection?: boolean }) {
  if (props.item.type === "file") {
    return (
      <SidebarMenuItem>
        {props.isWorkbenchSection == true ? (
          <WorkbenchPreview item={props.item}>
            <SidebarMenuButton tooltip={props.item.name}>
              <FileIcon itemName={props.item.name} />
              <RenamingArea id={props.item.id}>{props.item.name}</RenamingArea>
            </SidebarMenuButton>
          </WorkbenchPreview>
        ) : (
          <SidebarMenuButton tooltip={props.item.name} asChild>
            <a href="#">
              <FileIcon itemName={props.item.name} />
              <RenamingArea id={props.item.id}>{props.item.name}</RenamingArea>
            </a>
          </SidebarMenuButton>
        )}
        <NavDropDown item={props.item} />
      </SidebarMenuItem>
    );
  }

  const subItems = MOCKFOLDERS.filter((obj) => obj.parent_id == props.item.id);
  return (
    <SidebarMenuItem>
      <Collapsible className="group/collapsible" defaultOpen={true}>
        <CollapsibleTrigger
          asChild
          defaultChecked={props.isWorkbenchSection ?? true}
        >
          <SidebarMenuButton tooltip={props.item.name} className="truncate ">
            <ChevronRight className="toggle" />
            {props.item.type === "folder" ? <Folder /> : <BookOpen />}
            <RenamingArea id={props.item.id}>{props.item.name}</RenamingArea>
            <NavDropDown item={props.item} />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        {subItems.length ? (
          <CollapsibleContent>
            <SidebarMenuSub className="mr-0 pr-0.5">
              {subItems.map((subItem) => (
                <NavItem item={subItem} key={subItem.id} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        ) : null}
      </Collapsible>
    </SidebarMenuItem>
  );
}
