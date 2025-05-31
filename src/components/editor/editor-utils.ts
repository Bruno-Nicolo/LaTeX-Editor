import { type EditorView } from "@codemirror/view";
import { undo, redo } from "@codemirror/commands";

export function applyBold(editorViewRef: EditorView) {
  const state = editorViewRef.state;

  const changes = state.changeByRange((range) => {
    const selectedText = state.sliceDoc(range.from, range.to);
    const modifiedText = `\\textbf{${selectedText}}`;
    return {
      changes: [{ from: range.from, to: range.to, insert: modifiedText }],
      range,
    };
  });

  editorViewRef.dispatch(changes);
}

export function applyItalic(editorViewRef: EditorView) {
  if (!editorViewRef) {
    console.warn("EditorView is not available.");
    return;
  }
  const state = editorViewRef.state;

  const changes = state.changeByRange((range) => {
    const selectedText = state.sliceDoc(range.from, range.to);
    const modifiedText = `\\textit{${selectedText}}`;
    return {
      changes: [{ from: range.from, to: range.to, insert: modifiedText }],
      range,
    };
  });

  editorViewRef.dispatch(changes);
}

export function applyUnderline(editorViewRef: EditorView) {
  const state = editorViewRef.state;

  const changes = state.changeByRange((range) => {
    const selectedText = state.sliceDoc(range.from, range.to);
    const modifiedText = `\\underline{${selectedText}}`;
    return {
      changes: [{ from: range.from, to: range.to, insert: modifiedText }],
      range,
    };
  });

  editorViewRef.dispatch(changes);
}

export function addOrderedLists(editorViewRef: EditorView) {
  const state = editorViewRef.state;

  const changes = state.changeByRange((range) => {
    const modifiedText = `\\begin{enumerate}
  \\item 
  \\item 
\\end{enumerate}`;
    return {
      changes: [{ from: range.from, to: range.to, insert: modifiedText }],
      range,
    };
  });

  editorViewRef.dispatch(changes);
}

export function addUnorderedLists(editorViewRef: EditorView) {
  const state = editorViewRef.state;

  const changes = state.changeByRange((range) => {
    const modifiedText = `\\begin{itemize}
  \\item 
  \\item 
\\end{itemize}`;
    return {
      changes: [{ from: range.from, to: range.to, insert: modifiedText }],
      range,
    };
  });

  editorViewRef.dispatch(changes);
}

export function insertImageCenter(editorViewRef: EditorView) {
  const state = editorViewRef.state;

  const changes = state.changeByRange((range) => {
    const modifiedText = `
\\begin{figure}[h]
  \\centering
  \\includegraphics[width=0.5\\textwidth]{image.jpg}
  \\caption{Image Description}
  \\label{fig:imageRef}
\\end{figure}`;
    return {
      changes: [{ from: range.from, to: range.to, insert: modifiedText }],
      range,
    };
  });

  editorViewRef.dispatch(changes);
}

export function insertImageLeft(editorViewRef: EditorView) {
  const state = editorViewRef.state;

  const changes = state.changeByRange((range) => {
    const modifiedText = `
\\begin{figure}[h]
  \\flushleft
  \\includegraphics[width=0.4\\textwidth]{immage.jpg}
  \\caption{Image on the left}
  \\label{fig:imageRef}
\\end{figure}`;
    return {
      changes: [{ from: range.from, to: range.to, insert: modifiedText }],
      range,
    };
  });

  editorViewRef.dispatch(changes);
}

export function insertImageRight(editorViewRef: EditorView) {
  const state = editorViewRef.state;

  const changes = state.changeByRange((range) => {
    const modifiedText = `
\\begin{figure}[h]
  \\flushright
  \\includegraphics[width=0.4\\textwidth]{image.jpg}
  \\caption{Image on the right}
  \\label{fig:imageRef}
\\end{figure}`;
    return {
      changes: [{ from: range.from, to: range.to, insert: modifiedText }],
      range,
    };
  });

  editorViewRef.dispatch(changes);
}

export function addEquation(editorViewRef: EditorView) {
  const state = editorViewRef.state;

  const changes = state.changeByRange((range) => {
    const modifiedText = `\\begin{equation}
  
\\end{equation}`;
    return {
      changes: [{ from: range.from, to: range.to, insert: modifiedText }],
      range,
    };
  });

  editorViewRef.dispatch(changes);
}

export function addCitation(editorViewRef: EditorView) {
  const state = editorViewRef.state;

  const changes = state.changeByRange((range) => {
    const selectedText = state.sliceDoc(range.from, range.to);
    const modifiedText = `\\cite{${selectedText}}`;
    return {
      changes: [{ from: range.from, to: range.to, insert: modifiedText }],
      range,
    };
  });

  editorViewRef.dispatch(changes);
}

export function undoHistory(editorViewRef: EditorView) {
  undo(editorViewRef);
}

export function redoHistory(editorViewRef: EditorView) {
  redo(editorViewRef);
}
