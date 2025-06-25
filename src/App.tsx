import "./index.css";
import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { Button } from "./components/ui/button";
import { useContext, useRef, useState } from "react";
import { GlobalContext } from "./context";
import { PdfViewer } from "./components/pdf-viewer";
import { PanelBottom, SidebarIcon } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import type { ImperativePanelHandle } from "react-resizable-panels";
import { EditorSection } from "./components/editor-section";

export default function App() {
  const { editorSettings } = useContext(GlobalContext)!;
  const layoutPreferences = editorSettings.layout.value;
  const [isSidebarFloating, setSidebarFloating] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleFloatingSidebar = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (!isSidebarFloating && event.clientX <= 15) {
      setSidebarFloating(true);
      setSidebarOpen(true);
    }
    if (isSidebarFloating && event.clientX >= 260) {
      setSidebarOpen(false);
      setTimeout(() => {
        setSidebarFloating(false);
      }, 100);
    }
  };

  const handleOnHoverIn = () => {
    if (!isSidebarOpen) {
      setSidebarFloating(true);
      setSidebarOpen(true);
    }
  };

  const handleOnHoverOut = () => {
    if (isSidebarOpen && isSidebarFloating) {
      setSidebarOpen(false);
      setTimeout(() => {
        setSidebarFloating(false);
      }, 100);
    }
  };

  const handleClickSidebarTrigger = () => {
    if (isSidebarFloating) {
      setSidebarFloating(false);
    } else setSidebarOpen(!isSidebarOpen);
  };

  const ref = useRef<ImperativePanelHandle>(null);

  const TogglePanel = () => {
    const panel = ref.current;
    if (panel && !panel.isCollapsed()) {
      panel.collapse();
    } else if (panel && panel.isCollapsed()) {
      panel.resize(35);
    }
  };

  return (
    <div className="[--header-height:calc(theme(spacing.16))]">
      <SidebarProvider
        className="flex flex-col"
        open={isSidebarOpen}
        onOpenChange={(value) => setSidebarOpen(value)}
      >
        <SiteHeader>
          {/* Sidebar Trigger */}
          <Button
            className="h-8 w-8"
            onMouseEnter={handleOnHoverIn}
            onMouseLeave={handleOnHoverOut}
            onClick={handleClickSidebarTrigger}
            variant="ghost"
            size="icon"
          >
            <SidebarIcon />
          </Button>

          {/* Drawer Trigger */}
          <Button
            className="h-8 w-8"
            variant="ghost"
            size="icon"
            onClick={TogglePanel}
          >
            <PanelBottom />
          </Button>
        </SiteHeader>
        <div className="flex h-[calc(100svh-var(--header-height)-3rem)]!">
          <AppSidebar variant={isSidebarFloating ? "floating" : "sidebar"} />
          <SidebarInset
            className="flex flex-row overflow-x-hidden"
            onMouseMove={toggleFloatingSidebar}
          >
            {layoutPreferences.modeName == "HalfSplit" ? (
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50} minSize={10}>
                  <EditorSection drawerRef={ref} drawerToggle={TogglePanel} />
                </ResizablePanel>

                <ResizableHandle />

                <ResizablePanel defaultSize={50} minSize={10}>
                  <PdfViewer layoutMode={layoutPreferences.modeName} />
                </ResizablePanel>
              </ResizablePanelGroup>
            ) : (
              <>
                <div className={`${layoutPreferences.editorStyle}`}>
                  <EditorSection drawerRef={ref} drawerToggle={TogglePanel} />
                </div>

                <div className={`${layoutPreferences.pdfStyle} h-full`}>
                  <PdfViewer layoutMode={layoutPreferences.modeName} />
                </div>
              </>
            )}
          </SidebarInset>
        </div>
        <CompileButton />
      </SidebarProvider>
    </div>
  );
}

function CompileButton() {
  return (
    <Button className="w-full rounded-none text-lg py-6">
      Compile
      <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span> + Enter
      </kbd>
    </Button>
  );
}
