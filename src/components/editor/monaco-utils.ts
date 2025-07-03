import type { editor } from "monaco-editor";

export function applyBold(editor: editor.IStandaloneCodeEditor) {
  const selection = editor.getSelection();
  const model = editor.getModel();

  if (!selection || !model) {
    return;
  }

  const selectedText = model.getValueInRange(selection);
  const newText = `\\textbf{${selectedText}}`;

  // Modifica il testo selezionato
  editor.executeEdits("bold-command", [
    {
      range: selection,
      text: newText,
      forceMoveMarkers: true,
    },
  ]);
}

export function applyItalic(editor: editor.IStandaloneCodeEditor) {
  const selection = editor.getSelection();
  const model = editor.getModel();

  if (!selection || !model) {
    return;
  }

  const selectedText = model.getValueInRange(selection);
  const newText = `\\textit{${selectedText}}`;

  // Modifica il testo selezionato
  editor.executeEdits("italic-command", [
    {
      range: selection,
      text: newText,
      forceMoveMarkers: true,
    },
  ]);
}

export function applyUnderline(editor: editor.IStandaloneCodeEditor) {
  const selection = editor.getSelection();
  const model = editor.getModel();

  if (!selection || !model) {
    return;
  }

  const selectedText = model.getValueInRange(selection);
  const newText = `\\underline{${selectedText}}`;

  // Modifica il testo selezionato
  editor.executeEdits("underline-command", [
    {
      range: selection,
      text: newText,
      forceMoveMarkers: true,
    },
  ]);
}

export function applyBulletList(editor: editor.IStandaloneCodeEditor) {
  const selection = editor.getSelection();
  const model = editor.getModel();

  if (!selection || !model) {
    return;
  }

  const newText = `
\\begin{itemize}
  \\item 
  \\item 
\\end{itemize}`;

  // Modifica il testo selezionato
  editor.executeEdits("ulist-command", [
    {
      range: selection,
      text: newText,
      forceMoveMarkers: true,
    },
  ]);
}

export function applyNumberedList(editor: editor.IStandaloneCodeEditor) {
  const selection = editor.getSelection();
  const model = editor.getModel();

  if (!selection || !model) {
    return;
  }

  const newText = `
\\begin{enumerate}
  \\item 
  \\item 
\\end{enumerate}`;

  // Modifica il testo selezionato
  editor.executeEdits("nlist-command", [
    {
      range: selection,
      text: newText,
      forceMoveMarkers: true,
    },
  ]);
}

export function applyEquation(editor: editor.IStandaloneCodeEditor) {
  const selection = editor.getSelection();
  const model = editor.getModel();

  if (!selection || !model) {
    return;
  }

  const newText = `
\\begin{equation}

\\end{equation}`;

  // Modifica il testo selezionato
  editor.executeEdits("equation-command", [
    {
      range: selection,
      text: newText,
      forceMoveMarkers: true,
    },
  ]);
}

export function applyCite(editor: editor.IStandaloneCodeEditor) {
  const selection = editor.getSelection();
  const model = editor.getModel();

  if (!selection || !model) {
    return;
  }

  const newText = `\\cite{}`;

  // Modifica il testo selezionato
  editor.executeEdits("citation-command", [
    {
      range: selection,
      text: newText,
      forceMoveMarkers: true,
    },
  ]);
}

export function undo(editor: editor.IStandaloneCodeEditor) {
  const model = editor.getModel();

  if (!model) {
    return;
  }

  editor.trigger(null, "undo", null);
}

export function redo(editor: editor.IStandaloneCodeEditor) {
  const model = editor.getModel();

  if (!model) {
    return;
  }

  editor.trigger(null, "redo", null);
}

export function placeImageCenter(editor: editor.IStandaloneCodeEditor) {
  const selection = editor.getSelection();
  const model = editor.getModel();

  if (!selection || !model) {
    return;
  }

  const newText = `
\\begin{figure}[h]
  \\centering
  \\includegraphics[width=0.5\\textwidth]{image.jpg}
  \\caption{Image Description}
  \\label{fig:imageRef}
\\end{figure}`;

  // Modifica il testo selezionato
  editor.executeEdits("cImage-command", [
    {
      range: selection,
      text: newText,
      forceMoveMarkers: true,
    },
  ]);
}

export function placeImageLeft(editor: editor.IStandaloneCodeEditor) {
  const selection = editor.getSelection();
  const model = editor.getModel();

  if (!selection || !model) {
    return;
  }

  const newText = `
\\begin{figure}[h]
  \\flushleft
  \\includegraphics[width=0.4\\textwidth]{immage.jpg}
  \\caption{Image on the left}
  \\label{fig:imageRef}
\\end{figure}`;

  // Modifica il testo selezionato
  editor.executeEdits("lImage-command", [
    {
      range: selection,
      text: newText,
      forceMoveMarkers: true,
    },
  ]);
}

export function placeImageRight(editor: editor.IStandaloneCodeEditor) {
  const selection = editor.getSelection();
  const model = editor.getModel();

  if (!selection || !model) {
    return;
  }

  const newText = `
\\begin{figure}[h]
  \\flushright
  \\includegraphics[width=0.4\\textwidth]{image.jpg}
  \\caption{Image on the right}
  \\label{fig:imageRef}
\\end{figure}`;

  // Modifica il testo selezionato
  editor.executeEdits("rImage-command", [
    {
      range: selection,
      text: newText,
      forceMoveMarkers: true,
    },
  ]);
}

export function footnoteSizeFont(editor: editor.IStandaloneCodeEditor) {
  const selection = editor.getSelection();
  const model = editor.getModel();

  if (!selection || !model) {
    return;
  }

  const selectedText = model.getValueInRange(selection);
  const newText = `\\footnotesize{${selectedText}}`;

  // Modifica il testo selezionato
  editor.executeEdits("footnotesize-font-command", [
    {
      range: selection,
      text: newText,
      forceMoveMarkers: true,
    },
  ]);
}

export function normalFont(editor: editor.IStandaloneCodeEditor) {
  const selection = editor.getSelection();
  const model = editor.getModel();

  if (!selection || !model) {
    return;
  }

  const selectedText = model.getValueInRange(selection);
  const newText = `\\normal{${selectedText}}`;

  // Modifica il testo selezionato
  editor.executeEdits("normal-font-command", [
    {
      range: selection,
      text: newText,
      forceMoveMarkers: true,
    },
  ]);
}
export function largeFont(editor: editor.IStandaloneCodeEditor) {
  const selection = editor.getSelection();
  const model = editor.getModel();

  if (!selection || !model) {
    return;
  }

  const selectedText = model.getValueInRange(selection);
  const newText = `\\large{${selectedText}}`;

  // Modifica il testo selezionato
  editor.executeEdits("large-font-command", [
    {
      range: selection,
      text: newText,
      forceMoveMarkers: true,
    },
  ]);
}

export function hugeFont(editor: editor.IStandaloneCodeEditor) {
  const selection = editor.getSelection();
  const model = editor.getModel();

  if (!selection || !model) {
    return;
  }

  const selectedText = model.getValueInRange(selection);
  const newText = `\\huge{${selectedText}}`;

  // Modifica il testo selezionato
  editor.executeEdits("huge-font-command", [
    {
      range: selection,
      text: newText,
      forceMoveMarkers: true,
    },
  ]);
}
export function addSection(editor: editor.IStandaloneCodeEditor) {
  const selection = editor.getSelection();
  const model = editor.getModel();

  if (!selection || !model) {
    return;
  }

  const selectedText = model.getValueInRange(selection);
  const newText = `\\section{${selectedText}}`;

  // Modifica il testo selezionato
  editor.executeEdits("section-command", [
    {
      range: selection,
      text: newText,
      forceMoveMarkers: true,
    },
  ]);
}
export function addSubsection(editor: editor.IStandaloneCodeEditor) {
  const selection = editor.getSelection();
  const model = editor.getModel();

  if (!selection || !model) {
    return;
  }

  const selectedText = model.getValueInRange(selection);
  const newText = `\\subsection{${selectedText}}`;

  // Modifica il testo selezionato
  editor.executeEdits("subsection-command", [
    {
      range: selection,
      text: newText,
      forceMoveMarkers: true,
    },
  ]);
}
export function addSubsubsection(editor: editor.IStandaloneCodeEditor) {
  const selection = editor.getSelection();
  const model = editor.getModel();

  if (!selection || !model) {
    return;
  }

  const selectedText = model.getValueInRange(selection);
  const newText = `\\subsubsection{${selectedText}}`;

  // Modifica il testo selezionato
  editor.executeEdits("subsubsection-command", [
    {
      range: selection,
      text: newText,
      forceMoveMarkers: true,
    },
  ]);
}
export function addParagraph(editor: editor.IStandaloneCodeEditor) {
  const selection = editor.getSelection();
  const model = editor.getModel();

  if (!selection || !model) {
    return;
  }

  const selectedText = model.getValueInRange(selection);
  const newText = `\\paragraph{${selectedText}}`;

  // Modifica il testo selezionato
  editor.executeEdits("paragraph-command", [
    {
      range: selection,
      text: newText,
      forceMoveMarkers: true,
    },
  ]);
}
