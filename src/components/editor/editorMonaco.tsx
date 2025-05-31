import { useRef } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";

export function MonacoEditor(props: { className: string }) {
  const monacoRef = useRef<typeof import("monaco-editor") | null>(null);

  const handleEditorWillMount = (monaco: typeof import("monaco-editor")) => {
    monacoRef.current = monaco;

    // Registra il linguaggio "latex"
    monaco.languages.register({ id: "latex" });

    // Definisci la tokenizzazione con Monarch basata su simple-tex.grammar
    monaco.languages.setMonarchTokensProvider("latex", {
      defaultToken: "", // Default to no specific token type if not matched
      tokenizer: {
        root: [
          // line_comment: "%" /[^\n]*/
          [/%.*$/, "comment"],

          // control_sequence: "\" /([a-zA-Z@]+|[^a-zA-Z@\s])/?
          [/\\[a-zA-Z@]+[*]?/, "keyword"], // Matches \command, \command*
          [/\\[^a-zA-Z@\s]/, "keyword"], // Matches single char special commands like \\, \[, \{, etc.

          // SimpleGroup: "{" statement* "}"
          [/{/, { token: "delimiter.bracket", next: "@bracketContents" }],
          // Closing '}' is handled by @bracketContents to pop the state

          // Numbers (from original, can be useful)
          [/\d+/, "number"],

          // text: /[^{}\\%]+/+
          // Matches sequences of characters that are not braces, percent signs, or backslashes.
          // This should come after more specific rules.
          [/[^{}\\%]+/, ""],

          // Whitespace (from original, though grammar implies skipping)
          [/\s+/, ""],
        ],
        bracketContents: [
          // Inside a group (bracket), we can have all the same tokens as root
          [/%.*$/, "comment"],
          [/\\[a-zA-Z@]+[*]?/, "keyword"],
          [/\\[^a-zA-Z@\s]/, "keyword"],
          [/{/, { token: "delimiter.bracket", next: "@bracketContents" }], // Nested groups
          [/}/, { token: "delimiter.bracket", next: "@pop" }], // Closing brace of the current group
          [/\d+/, "number"],
          [/[^{}\\%]+/, ""],
          [/\s+/, ""],
        ],
      },
    });

    // Definisci un tema personalizzato
    monaco.editor.defineTheme("latexTheme", {
      colors: {
        "editor.background": "#ffffff",
        "editor.foreground": "#1e1e1e",
      },
      base: "vs",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "0000FF", fontStyle: "bold" },
        { token: "comment", foreground: "008000", fontStyle: "italic" },
        { token: "number", foreground: "098658" },
        { token: "delimiter.bracket", foreground: "000000" },
      ],
    });

    // Autocompletion Provider
    monaco.languages.registerCompletionItemProvider("latex", {
      triggerCharacters: ["\\", "{", " "], // Added space to trigger for environments/classes after {
      provideCompletionItems: (model, position) => {
        const wordInfo = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: wordInfo.startColumn,
          endColumn: wordInfo.endColumn,
        };

        const commonCommands: Array<
          import("monaco-editor").languages.CompletionItem & {
            context?: string;
          }
        > = [
          {
            label: "\\documentclass",
            detail: "Document Setup",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "documentclass{$1}",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: "\\usepackage",
            detail: "Package Inclusion",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "usepackage{$1}",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: "\\begin",
            detail: "Begin Environment",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: "begin{$1}\n\t$0\n\\end{$1}",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: "\\end",
            detail: "End Environment",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "end{$1}",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: "\\section",
            detail: "Sectioning",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "section{$1}",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: "\\subsection",
            detail: "Sectioning",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "subsection{$1}",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: "\\textit",
            detail: "Text Formatting",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "textit{$1}",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: "\\textbf",
            detail: "Text Formatting",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "textbf{$1}",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: "\\texttt",
            detail: "Text Formatting",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "texttt{$1}",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: "\\label",
            detail: "Referencing",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "label{$1}",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: "\\ref",
            detail: "Referencing",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "ref{$1}",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: "\\cite",
            detail: "Bibliography",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "cite{$1}",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
          },
          {
            label: "\\alpha",
            detail: "Math Symbol",
            kind: monaco.languages.CompletionItemKind.Constant,
            insertText: "alpha",
            range,
          },
          {
            label: "\\beta",
            detail: "Math Symbol",
            kind: monaco.languages.CompletionItemKind.Constant,
            insertText: "beta",
            range,
          },
          {
            label: "\\gamma",
            detail: "Math Symbol",
            kind: monaco.languages.CompletionItemKind.Constant,
            insertText: "gamma",
            range,
          },
          // Context-specific items
          {
            label: "article",
            context: "documentclass",
            kind: monaco.languages.CompletionItemKind.EnumMember,
            insertText: "article",
            detail: "Document class",
            range,
          },
          {
            label: "report",
            context: "documentclass",
            kind: monaco.languages.CompletionItemKind.EnumMember,
            insertText: "report",
            detail: "Document class",
            range,
          },
          {
            label: "book",
            context: "documentclass",
            kind: monaco.languages.CompletionItemKind.EnumMember,
            insertText: "book",
            detail: "Document class",
            range,
          },
          {
            label: "itemize",
            context: "environment",
            kind: monaco.languages.CompletionItemKind.EnumMember,
            insertText: "itemize",
            detail: "List Environment",
            range,
          },
          {
            label: "enumerate",
            context: "environment",
            kind: monaco.languages.CompletionItemKind.EnumMember,
            insertText: "enumerate",
            detail: "List Environment",
            range,
          },
          {
            label: "description",
            context: "environment",
            kind: monaco.languages.CompletionItemKind.EnumMember,
            insertText: "description",
            detail: "List Environment",
            range,
          },
          {
            label: "figure",
            context: "environment",
            kind: monaco.languages.CompletionItemKind.EnumMember,
            insertText: "figure",
            detail: "Floating Environment",
            range,
          },
          {
            label: "table",
            context: "environment",
            kind: monaco.languages.CompletionItemKind.EnumMember,
            insertText: "table",
            detail: "Floating Environment",
            range,
          },
          {
            label: "equation",
            context: "environment",
            kind: monaco.languages.CompletionItemKind.EnumMember,
            insertText: "equation",
            detail: "Math Environment",
            range,
          },
        ];

        const textBeforeCursor = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        let currentSuggestions: import("monaco-editor").languages.CompletionItem[] =
          [];

        const docClassMatch = textBeforeCursor.match(
          /\\documentclass{\s*([a-zA-Z]*)$/
        );
        const beginEnvMatch = textBeforeCursor.match(/\\begin{\s*([a-zA-Z]*)$/);
        const backslashMatch = textBeforeCursor.match(/\\([a-zA-Z]*)$/);

        // Helper to safely get string from label
        const getLabelString = (
          label: string | import("monaco-editor").languages.CompletionItemLabel
        ): string => {
          if (typeof label === "string") {
            return label;
          }
          return label.label; // Assuming it's an object with a label property
        };

        if (docClassMatch) {
          const typed = docClassMatch[1] || "";
          currentSuggestions = commonCommands.filter(
            (cmd) =>
              cmd.context === "documentclass" &&
              getLabelString(cmd.label).startsWith(typed)
          );
        } else if (beginEnvMatch) {
          const typed = beginEnvMatch[1] || "";
          currentSuggestions = commonCommands.filter(
            (cmd) =>
              cmd.context === "environment" &&
              getLabelString(cmd.label).startsWith(typed)
          );
        } else if (backslashMatch) {
          const typedWithSlash = wordInfo.word.substring(
            0,
            position.column - wordInfo.startColumn
          ); // text from start of word to cursor
          currentSuggestions = commonCommands.filter(
            (cmd) =>
              getLabelString(cmd.label).startsWith(typedWithSlash) &&
              cmd.context !== "documentclass" &&
              cmd.context !== "environment"
          );
        } else if (wordInfo.word.startsWith("\\\\")) {
          // User might be typing a command
          currentSuggestions = commonCommands.filter(
            (cmd) =>
              getLabelString(cmd.label).startsWith(wordInfo.word) &&
              cmd.context !== "documentclass" &&
              cmd.context !== "environment"
          );
        }

        // Adjust range for each suggestion if it's different from the default wordInfo range
        // This is important if the trigger character itself should be replaced or part of the suggestion
        const adjustedSuggestions = currentSuggestions.map((s) => {
          let suggestionRange = range;
          if (backslashMatch && getLabelString(s.label).startsWith("\\\\")) {
            // if triggered by \ and it's a command
            suggestionRange = {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn:
                position.column -
                (textBeforeCursor.length -
                  textBeforeCursor.lastIndexOf("\\\\")), // from backslash
              endColumn: position.column,
            };
          } else if (docClassMatch && typeof docClassMatch.index === "number") {
            // inside { of documentclass
            suggestionRange = {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn:
                docClassMatch.index + "\\\\documentclass{".length + 1,
              endColumn: position.column,
            };
          } else if (beginEnvMatch && typeof beginEnvMatch.index === "number") {
            // inside { of begin
            suggestionRange = {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: beginEnvMatch.index + "\\\\begin{".length + 1,
              endColumn: position.column,
            };
          }
          return { ...s, range: suggestionRange };
        });

        return { suggestions: adjustedSuggestions };
      },
    });
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monaco.editor.setTheme("latexTheme");

    const validateLaTeX = (
      currentModel: import("monaco-editor").editor.ITextModel
    ) => {
      const value = currentModel.getValue();
      const markers: import("monaco-editor").editor.IMarkerData[] = [];
      const lines = value.split("\\n");
      // Store environment name, line number, and precise column info for \begin{...}
      const envStack: {
        name: string;
        line: number;
        startColumn: number;
        endColumn: number;
      }[] = [];

      // Regex to find \begin{environment} and \end{environment}
      const beginRegex = /\\begin{([^}]+)}/g;
      const endRegex = /\\end{([^}]+)}/g;

      lines.forEach((lineText, i) => {
        let match;

        // Find all \begin occurrences on the current line
        beginRegex.lastIndex = 0; // Reset regex state for global flag
        while ((match = beginRegex.exec(lineText)) !== null) {
          envStack.push({
            name: match[1],
            line: i + 1,
            startColumn: match.index + 1, // 1-based column
            endColumn: match.index + match[0].length + 1, // 1-based column
          });
        }

        // Find all \end occurrences on the current line
        endRegex.lastIndex = 0; // Reset regex state for global flag
        while ((match = endRegex.exec(lineText)) !== null) {
          const envName = match[1];
          const currentEndStartColumn = match.index + 1;
          const currentEndEndColumn = match.index + match[0].length + 1;

          if (envStack.length === 0) {
            markers.push({
              message: `Unmatched \\end{${envName}}`,
              severity: monaco.MarkerSeverity.Error,
              startLineNumber: i + 1,
              startColumn: currentEndStartColumn,
              endLineNumber: i + 1,
              endColumn: currentEndEndColumn,
            });
          } else {
            const lastEnv = envStack[envStack.length - 1];
            if (lastEnv.name === envName) {
              envStack.pop(); // Correctly matched, pop from stack
            } else {
              // Mismatched environment
              markers.push({
                message: `Mismatched environment: Expected \\end{${lastEnv.name}}, got \\end{${envName}}`,
                severity: monaco.MarkerSeverity.Error,
                startLineNumber: i + 1,
                startColumn: currentEndStartColumn,
                endLineNumber: i + 1,
                endColumn: currentEndEndColumn,
              });
              // Optionally, mark the corresponding \begin as problematic too
              markers.push({
                message: `This \\begin{${lastEnv.name}} on line ${
                  lastEnv.line
                } is mismatched with \\end{${envName}} on line ${i + 1}`,
                severity: monaco.MarkerSeverity.Warning, // Use Warning for the opening part
                startLineNumber: lastEnv.line,
                startColumn: lastEnv.startColumn,
                endLineNumber: lastEnv.line,
                endColumn: lastEnv.endColumn,
              });
            }
          }
        }
      });

      // Any environments left in the stack are unclosed
      envStack.forEach((env) => {
        markers.push({
          message: `Unclosed environment: \\begin{${env.name}}`,
          severity: monaco.MarkerSeverity.Error,
          startLineNumber: env.line,
          startColumn: env.startColumn, // Use stored precise start column
          endLineNumber: env.line,
          endColumn: env.endColumn, // Use stored precise end column
        });
      });

      monaco.editor.setModelMarkers(currentModel, "latex-linter", markers);
    };

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
  };

  return (
    <Editor
      className={props.className}
      width="80%"
      defaultLanguage="latex"
      defaultValue={`% Esempio LaTeX
\\documentclass{article}
\\begin{document}
Ciao, questo è un testo in \\textbf{grassetto}.
\\end{document}
`}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
      options={{
        fontSize: 16,
        minimap: { enabled: false },
      }}
    />
  );
}
