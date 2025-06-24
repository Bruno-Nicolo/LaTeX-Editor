import "./index.css";
import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { Button } from "./components/ui/button";
import { useContext, useState } from "react";
import { GlobalContext } from "./context";
import { PdfViewer } from "./components/pdf-viewer";
import { MonacoEditor } from "./components/editor/editorMonaco";
import { ChevronDown, SidebarIcon } from "lucide-react";

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
        </SiteHeader>
        <div className="flex h-[calc(100svh-var(--header-height)-3rem)]!">
          <AppSidebar variant={isSidebarFloating ? "floating" : "sidebar"} />
          <SidebarInset
            className="flex flex-row overflow-x-hidden"
            onMouseMove={toggleFloatingSidebar}
          >
            {/* Editor */}
            <div className={`${layoutPreferences.editorStyle}`}>
              <div className="h-[65%]">
                <MonacoEditor />
              </div>
              {/* Utility Menu */}
              <div className="bg-secondary h-[35%] w-full">
                <div className="h-8 bg-secondary-foreground flex items-center text-secondary p-4">
                  <ChevronDown />
                </div>
              </div>
            </div>
            {/* PDF Viewer */}
            <PdfViewer
              style={layoutPreferences.pdfStyle}
              layoutMode={layoutPreferences.modeName}
            />
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
