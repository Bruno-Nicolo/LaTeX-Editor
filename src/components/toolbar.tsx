import {
  Bold,
  Heading,
  Image,
  Italic,
  List,
  ListOrdered,
  MoreHorizontal,
  Quote,
  RotateCcw,
  RotateCw,
  Sigma,
  Table,
  Underline,
} from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import type { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function Toolbar() {
  return (
    <div className="bg-card border rounded-md flex gap-4 py-1 px-4">
      <ToolbarGroup>
        <ToolbarButton icon>
          <Bold />
        </ToolbarButton>
        <ToolbarButton icon>
          <Italic />
        </ToolbarButton>
        <ToolbarButton icon>
          <Underline />
        </ToolbarButton>
      </ToolbarGroup>

      <Separator orientation="vertical" />

      <ToolbarGroup>
        <ToolbarButton icon>
          <List />
        </ToolbarButton>
        <ToolbarButton icon>
          <ListOrdered />
        </ToolbarButton>
        <HeadingsPopover>
          <ToolbarButton icon>
            <Heading />
          </ToolbarButton>
        </HeadingsPopover>
      </ToolbarGroup>

      <Separator orientation="vertical" />

      <ToolbarGroup>
        <ImagePopover>
          <ToolbarButton icon>
            <Image />
          </ToolbarButton>
        </ImagePopover>
        <ToolbarButton icon>
          <Sigma />
        </ToolbarButton>
        <ToolbarButton icon>
          <Table />
        </ToolbarButton>
        <ToolbarButton icon>
          <Quote />
        </ToolbarButton>
      </ToolbarGroup>

      <Separator orientation="vertical" />

      <ToolbarGroup>
        <ToolbarButton icon>
          <RotateCcw />
        </ToolbarButton>
        <ToolbarButton icon>
          <RotateCw />
        </ToolbarButton>
      </ToolbarGroup>

      <Separator orientation="vertical" />

      <ToolbarGroup>
        <ToolbarButton icon>
          <MoreHorizontal />
        </ToolbarButton>
      </ToolbarGroup>
    </div>
  );
}

export function ToolbarButton(props: { children: ReactNode; icon?: boolean }) {
  return (
    <div
      className={`inline-flex items-center justify-${
        props.icon ? "center" : "left"
      } gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer 
      ${
        props.icon ? "h-8 w-8" : "w-full p-2"
      } hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50
      `}
    >
      {props.children}
    </div>
  );
}

function ToolbarGroup(props: { children: ReactNode }) {
  return <div className="flex gap-1">{props.children}</div>;
}

function HeadingsPopover(props: { children: ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger>{props.children}</PopoverTrigger>
      <PopoverContent className="max-w-60">
        <Button className="text-2xl w-full" variant={"ghost"}>
          Heading 1
        </Button>
        <Button className="text-xl w-full" variant={"ghost"}>
          Heading 2
        </Button>
        <Button className="text-lg w-full" variant={"ghost"}>
          Heading 3
        </Button>
        <Button className="text-md w-full" variant={"ghost"}>
          Heading 4
        </Button>
      </PopoverContent>
    </Popover>
  );
}

function ImagePopover(props: { children: ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger>{props.children}</PopoverTrigger>
      <PopoverContent className="max-w-48">
        <ToolbarButton>Center</ToolbarButton>
        <ToolbarButton>Left</ToolbarButton>
        <ToolbarButton>Right</ToolbarButton>
        <ToolbarButton>Text-Wrap</ToolbarButton>
      </PopoverContent>
    </Popover>
  );
}
