import type { editor } from "monaco-editor";

export const BasicLight: editor.IStandaloneThemeData = {
  colors: {
    "editor.background": "#F8F9F9",
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
};
