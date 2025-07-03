import "./index.css";
import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { Button } from "./components/ui/button";
import { useContext, useRef, useState, type Ref } from "react";
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
import { Toaster } from "sonner";

export default function App() {
  const { editorSettings } = useContext(GlobalContext)!;
  const layoutPreferences = editorSettings.layout.value;
  const [isSidebarFloating, setSidebarFloating] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const sidebarRef = useRef<ImperativePanelHandle>(null);

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

  const handleClickSidebarTrigger = () => {
    if (isSidebarFloating) {
      setSidebarFloating(false);
    } else setSidebarOpen(!isSidebarOpen);
    if (isSidebarOpen) {
      sidebarRef.current?.collapse();
    } else sidebarRef.current?.resize(20);
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
        sidebarRef={sidebarRef}
      >
        <SiteHeader>
          {/* Sidebar Trigger */}
          <Button
            className="h-8 w-8"
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
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel
              collapsible
              defaultSize={20}
              minSize={15}
              maxSize={35}
              ref={sidebarRef}
              collapsedSize={0}
            >
              <AppSidebar
                variant={isSidebarFloating ? "floating" : "sidebar"}
              />
            </ResizablePanel>

            <ResizableHandle />
            <ResizablePanel defaultSize={80} minSize={10}>
              <SidebarInset
                className="flex flex-row overflow-x-hidden h-full"
                onMouseMove={toggleFloatingSidebar}
              >
                <AppMain
                  modeName={layoutPreferences.modeName}
                  drawerRef={ref}
                  toggleDrawer={TogglePanel}
                />
              </SidebarInset>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <CompileButton />
      </SidebarProvider>
      <Toaster richColors />
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

function AppMain(props: {
  modeName: string;
  drawerRef: Ref<ImperativePanelHandle>;
  toggleDrawer: () => void;
}) {
  const { editorSettings } = useContext(GlobalContext)!;
  const layoutPreferences = editorSettings.layout.value;

  if (props.modeName == "HalfSplit")
    return (
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50} minSize={10}>
          <EditorSection
            drawerRef={props.drawerRef}
            drawerToggle={props.toggleDrawer}
          />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={50} minSize={10}>
          <PdfViewer layoutMode={props.modeName} />
        </ResizablePanel>
      </ResizablePanelGroup>
    );

  return (
    <>
      <div className={`${layoutPreferences.editorStyle}`}>
        <EditorSection
          drawerRef={props.drawerRef}
          drawerToggle={props.toggleDrawer}
        />
      </div>

      <div className={`${layoutPreferences.pdfStyle} h-full`}>
        <PdfViewer layoutMode={props.modeName} />
      </div>
    </>
  );
}
