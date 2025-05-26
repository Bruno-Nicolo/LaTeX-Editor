import "./index.css";
import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { Button } from "./components/ui/button";
import { useContext } from "react";
import { GlobalContext } from "./context";
import { PdfViewer } from "./components/pdf-viewer";
import { MonacoEditor } from "./components/editorMonaco";
// import { MonacoEditor } from "./components/editorMonaco";

export default function App() {
  const { editorSettings } = useContext(GlobalContext)!;
  const layoutPreferences = editorSettings.layout.value;

  // const [code, setCode] = useState("Start Writing...");

  return (
    <div className="[--header-height:calc(theme(spacing.16))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex h-[calc(100svh-var(--header-height)-3rem)]!">
          <AppSidebar />
          <SidebarInset className="flex flex-row overflow-x-hidden">
            {/* Editor & Preview */}
            {/* <CodeMirrorEditor
              initialDoc={code}
              onChange={(value) => setCode(value)}
              className={layoutPreferences.editorStyle}
            /> */}
            <MonacoEditor />
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
