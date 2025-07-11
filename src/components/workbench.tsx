import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, type ReactNode } from "react";
import { MonacoEditor } from "./editor/editorMonaco";
import { Separator } from "./ui/separator";

import { getFilePath, MOCKFOLDERS, type file } from "@/temp";
import {
  Bookmark,
  BookOpen,
  ChevronRight,
  Crown,
  File,
  Folder,
  Frown,
  Image,
  LibraryBig,
  Pin,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "./ui/sidebar";
import { RenamingArea } from "./ui/renaming-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

export function Workbench() {
  const pinnedProjects = MOCKFOLDERS.filter((item) => item.workbench == true);

  return (
    <>
      <Separator />
      <SidebarGroup className="max-h-80">
        <SidebarGroupLabel className="p-2 gap-2">
          <Bookmark />
          Workbench
        </SidebarGroupLabel>
        <SidebarGroupContent className="p-2 overflow-y-auto overflow-x-hidden">
          <SidebarMenu>
            {pinnedProjects ? (
              <WorkbenchTree data={pinnedProjects} />
            ) : (
              <p>
                No project yet <Frown />
              </p>
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}

function WorkbenchTree(props: { data: file[] }) {
  return props.data.map((item) => {
    if (item.type !== "file") {
      return (
        <SidebarMenuItem key={item.id}>
          <WorkbenchCollapsibleItem data={item} />
        </SidebarMenuItem>
      );
    }
    return (
      <SidebarMenuItem key={item.id}>
        <WorkbenchItem data={item} />
      </SidebarMenuItem>
    );
  });
}

function FileIcon(props: { data: file }) {
  if (props.data.type !== "file") {
    return props.data.type === "folder" ? <Folder /> : <BookOpen />;
  }

  return props.data.name.includes(".bib") ? (
    <LibraryBig />
  ) : props.data.name.includes(".png") || props.data.name.includes(".jpg") ? (
    <Image />
  ) : props.data.isMain ? (
    <Crown className="stroke-amber-400 fill-amber-100" />
  ) : (
    <File />
  );
}

function WorkbenchCollapsibleItem(props: { data: file }) {
  const subItems = MOCKFOLDERS.filter(
    (item) => item.parent_id == props.data.id
  );

  return (
    <Collapsible className="group/collapsible" defaultOpen={false}>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton className="truncate ">
          <ChevronRight className="toggle" />
          <FileIcon data={props.data} />
          <RenamingArea id={props.data.id}>{props.data.name}</RenamingArea>
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {subItems.length ? (
          <SidebarMenuSub className="mr-0 pr-0.5">
            <WorkbenchTree data={subItems} />
          </SidebarMenuSub>
        ) : null}
      </CollapsibleContent>
    </Collapsible>
  );
}

function WorkbenchItem(props: { data: file }) {
  const [visibleAction, setActionVisible] = useState(false);
  return (
    <>
      <WorkbenchDialog
        item={props.data}
        onMouseEnter={() => setActionVisible(true)}
        onMouseLeave={() => setActionVisible(false)}
      >
        <SidebarMenuButton tooltip={props.data.name}>
          <FileIcon data={props.data} />
          <RenamingArea id={props.data.id}>{props.data.name}</RenamingArea>
        </SidebarMenuButton>
      </WorkbenchDialog>
      <SidebarMenuAction
        className={`${!visibleAction && "hidden"} hover:flex `}
      >
        <Pin />
      </SidebarMenuAction>
    </>
  );
}

function WorkbenchDialog(props: {
  children: ReactNode;
  item: file;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger
        className="truncate w-full"
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        {props.children}
      </DialogTrigger>
      <DialogContent className="min-w-[70%] h-[80%] flex flex-col">
        <DialogHeader className="truncate ">
          <DialogTitle className="truncate mr-8 pb-2">
            <span>{getFilePath(props.item)}</span>
          </DialogTitle>
        </DialogHeader>
        <Separator className="mb-2" />
        {/* Mostra l'editor solo con file LaTeX */}
        {props.item.name.includes(".tex") ||
        props.item.name.includes(".bib") ? (
          <MonacoEditor readonly={true} />
        ) : (
          <p>Embed photo</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
