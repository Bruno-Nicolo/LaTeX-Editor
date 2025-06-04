export function defineLinter(monaco: typeof import("monaco-editor")) {
  return (currentModel: import("monaco-editor").editor.ITextModel) => {
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
}
