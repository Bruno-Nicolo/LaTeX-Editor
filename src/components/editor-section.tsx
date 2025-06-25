import type { ImperativePanelHandle } from "react-resizable-panels";
import { MonacoEditor } from "./editor/editorMonaco";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import UtilityDrawer from "./utility-drawer";
import type { Ref } from "react";

export function EditorSection(props: {
  drawerRef: Ref<ImperativePanelHandle>;
  drawerToggle: () => void;
}) {
  return (
    <ResizablePanelGroup direction="vertical">
      {/* Editor */}
      <ResizablePanel defaultSize={65}>
        <MonacoEditor />
      </ResizablePanel>

      <ResizableHandle />

      {/* Utility Menu */}
      <ResizablePanel
        collapsible
        minSize={12}
        collapsedSize={0}
        ref={props.drawerRef}
        defaultSize={35}
      >
        <UtilityDrawer onClick={props.drawerToggle} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
