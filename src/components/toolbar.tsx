import {
  Bold,
  Italic,
  List,
  ListOrdered,
  MoreHorizontal,
  RotateCcw,
  RotateCw,
  Underline,
} from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import type { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function Toolbar() {
  return (
    <div className="bg-card border rounded-md flex gap-4 py-1 px-4">
      <ToolbarGroup>
        <ToolbarButton>
          <Bold />
        </ToolbarButton>
        <ToolbarButton>
          <Italic />
        </ToolbarButton>
        <ToolbarButton>
          <Underline />
        </ToolbarButton>
      </ToolbarGroup>

      <Separator orientation="vertical" />

      <ToolbarGroup>
        <ToolbarButton>
          <List />
        </ToolbarButton>
        <ToolbarButton>
          <ListOrdered />
        </ToolbarButton>
      </ToolbarGroup>

      <Separator orientation="vertical" />

      <ToolbarGroup>
        <FontSelector />
        <FontSizeSelector />
      </ToolbarGroup>

      <Separator orientation="vertical" />

      <ToolbarGroup>
        <ToolbarButton>
          <RotateCcw />
        </ToolbarButton>
        <ToolbarButton>
          <RotateCw />
        </ToolbarButton>
      </ToolbarGroup>

      <Separator orientation="vertical" />

      <ToolbarGroup>
        <ToolbarButton>
          <MoreHorizontal />
        </ToolbarButton>
      </ToolbarGroup>
    </div>
  );
}

function ToolbarButton(props: { children: ReactNode }) {
  return (
    <Button variant={"ghost"} className="w-8 h-8">
      {props.children}
    </Button>
  );
}

function ToolbarGroup(props: { children: ReactNode }) {
  return <div className="flex gap-1">{props.children}</div>;
}

function FontSelector() {
  return (
    <Select defaultValue={"Inter"}>
      <SelectTrigger size="sm" className="w-[150px]">
        {/* TODO: set the default font value */}
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fonts</SelectLabel>
          <SelectItem value="Inter">Inter</SelectItem>
          <SelectItem value="Consolas">Consolas</SelectItem>
          <SelectItem value="Roboto Mono">Roboto Mono</SelectItem>
          <SelectItem value="JetBrains Mono">JetBrains Mono</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function FontSizeSelector() {
  const fontSizes = [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96];

  return (
    <Select defaultValue={"14"}>
      <SelectTrigger className="w-[70px]" size="sm">
        {/* TODO: set the default font value */}
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Size</SelectLabel>
          {fontSizes.map((size) => (
            <SelectItem value={`${size}`} key={size}>
              {size}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
