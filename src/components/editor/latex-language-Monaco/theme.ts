import type { editor } from "monaco-editor";

// const themeSettings = "Blackboard";
// const importString = `monaco-themes/themes/${themeSettings}.json`;

// Light Themes
const DreamWeaver = await import("monaco-themes/themes/Dreamweaver.json"); // DEFAULT
const Xcode = await import("monaco-themes/themes/Xcode_default.json");
const GitHubLight = await import("monaco-themes/themes/GitHub Light.json");
const Kuroir = await import("monaco-themes/themes/Kuroir Theme.json");
const Zenburnesque = await import("monaco-themes/themes/Zenburnesque.json");
// Dark Themes
const Dracula = await import("monaco-themes/themes/Dracula.json");
const BrillanceBlack = await import(
  "monaco-themes/themes/Brilliance Black.json"
);
const GitHubDark = await import("monaco-themes/themes/GitHub Dark.json");
const Nord = await import("monaco-themes/themes/Nord.json");
const Sunburst = await import("monaco-themes/themes/Sunburst.json");

type theme = {
  name: string;
  style: editor.IStandaloneThemeData;
};

export const themesArray: theme[] = [
  {
    name: "DreamWeaver",
    style: { ...DreamWeaver },
  },
  {
    name: "Xcode",
    style: { ...Xcode },
  },
  {
    name: "GitHubLight",
    style: { ...GitHubLight },
  },
  {
    name: "Kuroir",
    style: { ...Kuroir },
  },
  {
    name: "Zenburnesque",
    style: { ...Zenburnesque },
  },
  {
    name: "Dracula",
    style: { ...Dracula },
  },
  {
    name: "BrillanceBlack",
    style: { ...BrillanceBlack },
  },
  {
    name: "GitHubDark",
    style: { ...GitHubDark },
  },
  {
    name: "Nord",
    style: { ...Nord },
  },
  {
    name: "Sunburst",
    style: { ...Sunburst },
  },
];
