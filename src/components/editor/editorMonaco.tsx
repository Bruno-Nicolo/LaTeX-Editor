import { useContext, useRef } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import {
  boldCommand,
  compileCommand,
  italicCommand,
  underlineCommand,
} from "./latex-language-Monaco/monaco-commands";
import { GlobalContext } from "@/context";
import { defineTokenization } from "./latex-language-Monaco/tokenizer";
// import { BasicLight } from "./latex-language-Monaco/theme";
import { defineAutocompletionProvider } from "./latex-language-Monaco/autocompletion";
import { defineLinter } from "./latex-language-Monaco/linting";

export function MonacoEditor(props: { className?: string }) {
  const monacoRef = useRef<typeof import("monaco-editor") | null>(null);
  const editorRef = useContext(GlobalContext)?.editorView;

  const handleBeforeMount = (monaco: typeof import("monaco-editor")) => {
    monacoRef.current = monaco;

    // Registra il linguaggio "latex"
    monaco.languages.register({ id: "latex" });

    // Definisci la tokenizzazione (basata su simple-tex.grammar)
    defineTokenization(monaco);

    // Definisci il tema
    import("monaco-themes/themes/Monokai.json").then((data) => {
      monaco.editor.defineTheme("monokai", data);
    });
    // monaco.editor.defineTheme("BasicLight", BasicLight);

    // Autocompletion Provider
    defineAutocompletionProvider(monaco);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // Theme settings
    monaco.editor.setTheme("BasicLight");

    // Custom commands
    editor.addAction({
      ...boldCommand,
      // Cmd+B su macOS, Ctrl+B su Windows/Linux
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB],
    });
    editor.addAction({
      ...italicCommand,
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyI],
    });
    editor.addAction({
      ...underlineCommand,
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyU],
    });
    editor.addAction({
      ...compileCommand,
      keybindings: [
        // Compila o con Cmd+Enter o con Cmd+S
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      ],
    });

    const validateLaTeX = defineLinter(monaco);
    const currentModel = editor.getModel();
    if (currentModel) {
      validateLaTeX(currentModel); // Initial validation on load

      let debounceTimer: number;
      currentModel.onDidChangeContent(() => {
        clearTimeout(debounceTimer);
        debounceTimer = window.setTimeout(
          () => validateLaTeX(currentModel),
          500
        ); // Debounce validation
      });
    }

    editorRef!.current = editor;
  };

  return (
    <Editor
      className={props.className}
      defaultLanguage="latex"
      defaultValue={`% Esempio LaTeX
\\documentclass{article}
\\begin{document}
Ciao, questo è un testo in \\textbf{grassetto}.
\\end{document}
`}
      beforeMount={handleBeforeMount}
      onMount={handleEditorDidMount}
      options={{
        fontSize: 16,
        minimap: { enabled: false },
      }}
    />
  );
}
