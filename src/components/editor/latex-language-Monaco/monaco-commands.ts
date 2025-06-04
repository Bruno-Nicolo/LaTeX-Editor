import { applyBold, applyItalic, applyUnderline } from "../monaco-utils";

export const boldCommand = {
  id: "latex-bold", // ID univoco dell'azione
  label: "Apply Bold", // Etichetta visualizzata nel menu dei comandi
  precondition: undefined,
  keybindingContext: undefined,
  contextMenuGroupId: "navigation", // Gruppo del menu contestuale
  contextMenuOrder: 1.5,

  run: applyBold,
};

export const italicCommand = {
  id: "latex-italic", // ID univoco dell'azione
  label: "Apply Italic", // Etichetta visualizzata nel menu dei comandi
  precondition: undefined,
  keybindingContext: undefined,
  contextMenuGroupId: "navigation", // Gruppo del menu contestuale
  contextMenuOrder: 1.5,

  run: applyItalic,
};

export const underlineCommand = {
  id: "latex-underline", // ID univoco dell'azione
  label: "Apply Underline", // Etichetta visualizzata nel menu dei comandi
  precondition: undefined,
  keybindingContext: undefined,
  contextMenuGroupId: "navigation", // Gruppo del menu contestuale
  contextMenuOrder: 1.5,

  run: applyUnderline,
};

export const compileCommand = {
  id: "compile-pdf", // ID univoco dell'azione
  label: "Compile", // Etichetta visualizzata nel menu dei comandi
  precondition: undefined,
  keybindingContext: undefined,
  contextMenuGroupId: "navigation", // Gruppo del menu contestuale
  contextMenuOrder: 1.5,

  run: () => {
    console.log("COMPILA!");
  },
};
