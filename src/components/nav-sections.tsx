import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { NavContextMenu } from "./nav-context-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

import {
  Bookmark,
  FilePlus,
  FolderPlus,
  Upload,
  BookOpen,
  ChevronRight,
  File,
  Folder,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { CreationDialog } from "./nav-dialogs";

// PROBLEMA: quando salvo file/cartelle nella workbench come faccio a capire a che
// progetto appartengono? bibliography.bib appartiene al progetto 1 o a progetto 2?
const MOCKFOLDERS = [
  {
    name: "Active Project Name",
    id: 1,
    parent_id: 0,
    type: "project",
    workbench: false,
    isActive: true,
  },
  {
    name: "src",
    id: 2,
    parent_id: 1,
    type: "folder",
    workbench: false,
    isActive: true,
  },
  {
    name: "index.tex",
    id: 3,
    parent_id: 2,
    type: "file",
    workbench: false,
    isActive: true,
  },
  {
    name: "introduction asdadsadsadadada.tex",
    id: 4,
    parent_id: 2,
    type: "file",
    workbench: true,
    isActive: true,
  },
  {
    name: "img",
    id: 5,
    parent_id: 1,
    type: "folder",
    workbench: false,
    isActive: true,
  },
  {
    name: "bibliography.bib",
    id: 6,
    parent_id: 1,
    type: "file",
    workbench: true,
    isActive: true,
  },
  {
    name: "Recent Project 2",
    id: 7,
    parent_id: 0,
    type: "project",
    workbench: true,
    isActive: true,
  },
  {
    name: "Sono dell'altro progetto",
    id: 8,
    parent_id: 6,
    type: "folder",
    workbench: false,
    isActive: true,
  },
];

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
          <SidebarGroupContent className="overflow-y-auto">
            <FileTree data={pinnedResources} />
          </SidebarGroupContent>
        </SidebarGroup>
      </>
    );
}

export function MainNav() {
  // DA RIMUOVERE!!
  const ACTIVEPROJECTID = 1;

  const activeResources = MOCKFOLDERS.filter(
    (item) => item.parent_id == ACTIVEPROJECTID
  );

  return (
    <SidebarGroup className="max-h-full">
      {/* Group heading */}
      <SidebarGroupLabel className="gap-2">
        <span className="flex-grow">Files</span>
        <CreationDialog type="file">
          <FilePlus className="cursor-pointer" />
        </CreationDialog>
        <CreationDialog type="folder">
          <FolderPlus className="cursor-pointer" />
        </CreationDialog>
        <Upload className="cursor-pointer" />
      </SidebarGroupLabel>
      {/* Content */}
      <SidebarGroupContent className="overflow-y-auto">
        <FileTree data={activeResources} />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function FileTree(props: {
  data: {
    name: string;
    id: number;
    parent_id: number;
    type: "folder" | "file" | "project" | string;
    workbench: boolean;
    isActive: boolean;
  }[];
}) {
  return (
    <SidebarMenu>
      {props.data.map((item) => (
        <NavItem item={item} key={item.id} />
      ))}
    </SidebarMenu>
  );
}

export function NavItem(props: {
  item: {
    name: string;
    id: number;
    parent_id: number;
    type: "folder" | "file" | "project" | string;
    workbench: boolean;
    isActive: boolean;
  };
}) {
  if (props.item.type != "folder") {
    return (
      <SidebarMenuItem>
        <NavContextMenu item={props.item}>
          <SidebarMenuButton className="truncate" tooltip={props.item.name}>
            {/* Different Icons for Images, Bib, Tex, ecc. ? */}
            {props.item.type == "file" ? <File /> : <BookOpen />}
            <span>{props.item.name}</span>
          </SidebarMenuButton>
        </NavContextMenu>
      </SidebarMenuItem>
    );
  }

  const subItems = MOCKFOLDERS.filter((obj) => obj.parent_id == props.item.id);
  return (
    <SidebarMenuItem>
      <Collapsible className="group/collapsible" defaultOpen={true}>
        <NavContextMenu item={props.item}>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={props.item.name} className="truncate ">
              <ChevronRight className="toggle" />
              <Folder />
              <span>{props.item.name}</span>
            </SidebarMenuButton>
          </CollapsibleTrigger>
        </NavContextMenu>
        {subItems.length ? (
          <CollapsibleContent>
            <SidebarMenuSub>
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
