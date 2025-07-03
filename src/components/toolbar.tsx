import {
  Bold,
  Heading,
  Image,
  Italic,
  List,
  ListOrdered,
  MoreHorizontal,
  RotateCcw,
  RotateCw,
  Type,
  Underline,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { useContext, type ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { GlobalContext } from "@/context";

import type { editor } from "monaco-editor";
import {
  addParagraph,
  addSection,
  addSubsection,
  addSubsubsection,
  applyBold,
  applyBulletList,
  applyItalic,
  applyNumberedList,
  applyUnderline,
  footnoteSizeFont,
  hugeFont,
  largeFont,
  normalFont,
  placeImageCenter,
  placeImageLeft,
  placeImageRight,
  redo,
  undo,
} from "./editor/monaco-utils";

export function Toolbar() {
  return (
    <div className="bg-card border rounded-md flex gap-4 py-1 px-4">
      <ToolbarGroup>
        <ToolbarButton icon modiferMethod={applyBold}>
          <Bold />
        </ToolbarButton>
        <ToolbarButton icon modiferMethod={applyItalic}>
          <Italic />
        </ToolbarButton>
        <ToolbarButton icon modiferMethod={applyUnderline}>
          <Underline />
        </ToolbarButton>
        <FontSizePopover>
          <ToolbarButton icon>
            <Type />
          </ToolbarButton>
        </FontSizePopover>
      </ToolbarGroup>

      <Separator orientation="vertical" />

      <ToolbarGroup>
        <ToolbarButton icon modiferMethod={applyBulletList}>
          <List />
        </ToolbarButton>
        <ToolbarButton icon modiferMethod={applyNumberedList}>
          <ListOrdered />
        </ToolbarButton>
        <HeadingsPopover>
          <ToolbarButton icon>
            <Heading />
          </ToolbarButton>
        </HeadingsPopover>
        <ImagePopover>
          <ToolbarButton icon>
            <Image />
          </ToolbarButton>
        </ImagePopover>
      </ToolbarGroup>

      <Separator orientation="vertical" />

      <ToolbarGroup>
        <ToolbarButton icon modiferMethod={undo}>
          <RotateCcw />
        </ToolbarButton>
        <ToolbarButton icon modiferMethod={redo}>
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

export function ToolbarButton(props: {
  children: ReactNode;
  icon?: boolean;
  modiferMethod?: (editorViewRef: editor.IStandaloneCodeEditor) => void;
}) {
  const editorViewRef = useContext(GlobalContext)?.editorView;

  return (
    <div
      onClick={() => {
        if (props.modiferMethod && editorViewRef)
          props.modiferMethod(editorViewRef.current!);
      }}
      className={`inline-flex items-center justify-${
        props.icon ? "center" : "left"
      } gap-2 whitespace-nowrap rounded-md text-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer 
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
      <PopoverContent className="max-w-52" side="bottom" align="center">
        <ToolbarButton modiferMethod={addSection}>Section</ToolbarButton>
        <ToolbarButton modiferMethod={addSubsection}>Subsection</ToolbarButton>
        <ToolbarButton modiferMethod={addSubsubsection}>
          Subsubsection
        </ToolbarButton>
        <ToolbarButton modiferMethod={addParagraph}>Paragraph</ToolbarButton>
      </PopoverContent>
    </Popover>
  );
}

function ImagePopover(props: { children: ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger>{props.children}</PopoverTrigger>
      <PopoverContent className="max-w-48" side="bottom" align="center">
        <ToolbarButton modiferMethod={placeImageCenter}>
          Align Center
        </ToolbarButton>
        <ToolbarButton modiferMethod={placeImageLeft}>Align Left</ToolbarButton>
        <ToolbarButton modiferMethod={placeImageRight}>
          Align Right
        </ToolbarButton>
      </PopoverContent>
    </Popover>
  );
}

function FontSizePopover(props: { children: ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger>{props.children}</PopoverTrigger>
      <PopoverContent className="max-w-48" side="bottom" align="center">
        <ToolbarButton modiferMethod={footnoteSizeFont}>
          Footnote Size
        </ToolbarButton>
        <ToolbarButton modiferMethod={normalFont}>Normal</ToolbarButton>
        <ToolbarButton modiferMethod={largeFont}>Large</ToolbarButton>
        <ToolbarButton modiferMethod={hugeFont}>Huge</ToolbarButton>
      </PopoverContent>
    </Popover>
  );
}
