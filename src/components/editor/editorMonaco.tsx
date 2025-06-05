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
import { themesArray } from "./latex-language-Monaco/theme";
import { defineAutocompletionProvider } from "./latex-language-Monaco/autocompletion";
import { defineLinter } from "./latex-language-Monaco/linting";

export function MonacoEditor(props: { className?: string }) {
  const monacoRef = useRef<typeof import("monaco-editor") | null>(null);
  const editorRef = useContext(GlobalContext)?.editorView;
  // Style Settings
  const editorStyleSettings = useContext(GlobalContext)?.editorSettings;
  const theme = editorStyleSettings?.theme.value;
  const fontSize = editorStyleSettings?.fontSize.value;
  const fontFamily = editorStyleSettings?.fontFamily.value;

  const defaultText = `% Esempio LaTeX
\\documentclass{article}
\\begin{document}
1234560 => $$\\alpha \\Rightarrow$$
Ciao, questo è un testo in \\textbf{grassetto}.
\\end{document}
`;

  const handleBeforeMount = (monaco: typeof import("monaco-editor")) => {
    monacoRef.current = monaco;

    // Registra il linguaggio "latex"
    monaco.languages.register({ id: "latex" });

    // Definisci la tokenizzazione (basata su simple-tex.grammar)
    defineTokenization(monaco);

    // Definisci i temi
    themesArray.forEach((theme) => {
      monaco.editor.defineTheme(theme.name, theme.style);
    });

    // Autocompletion Provider
    defineAutocompletionProvider(monaco);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
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
      defaultValue={defaultText}
      beforeMount={handleBeforeMount}
      onMount={handleEditorDidMount}
      theme={theme}
      options={{
        fontSize: fontSize,
        fontFamily: `var(--font-${fontFamily})`,
        minimap: { enabled: false },
      }}
    />
  );
}
