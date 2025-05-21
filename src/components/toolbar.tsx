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

function ToolbarButton(props: { children: ReactNode; icon?: boolean }) {
  return (
    <div
      className={`p-2 inline-flex items-center justify-${
        props.icon ? "center" : "left"
      } rounded-md text-md font-medium cursor-pointer hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 ${
        props.icon ? "h-8 w-8" : "w-full"
      }`}
    >
      {props.children}
    </div>

    // <Button variant={"ghost"} className="w-8 h-8">
    //   {props.children}
    // </Button>
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
