export function defineAutocompletionProvider(
  monaco: typeof import("monaco-editor")
) {
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
              (textBeforeCursor.length - textBeforeCursor.lastIndexOf("\\\\")), // from backslash
            endColumn: position.column,
          };
        } else if (docClassMatch && typeof docClassMatch.index === "number") {
          // inside { of documentclass
          suggestionRange = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: docClassMatch.index + "\\\\documentclass{".length + 1,
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
}
