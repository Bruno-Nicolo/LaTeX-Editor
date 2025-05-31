import { EditorState, Prec } from "@codemirror/state";
import {
  EditorView,
  keymap,
  highlightSpecialChars,
  drawSelection,
  highlightActiveLine,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
  lineNumbers,
  highlightActiveLineGutter,
} from "@codemirror/view";
import {
  defaultHighlightStyle,
  syntaxHighlighting,
  indentOnInput,
  bracketMatching,
  foldGutter,
  foldKeymap,
  StreamLanguage,
} from "@codemirror/language";
import { stex } from "@codemirror/legacy-modes/mode/stex";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { searchKeymap } from "@codemirror/search";
import {
  completionKeymap,
  closeBrackets,
  closeBracketsKeymap,
  autocompletion,
} from "@codemirror/autocomplete";
import { lintKeymap } from "@codemirror/lint";
import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "@/context";
import { applyBold, applyItalic, applyUnderline } from "./editor-utils";

// import { gruvboxDark } from "cm6-theme-gruvbox-dark";

function CodeMirrorEditor(props: {
  className?: string;
  initialDoc: string;
  onChange?: (doc: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useContext(GlobalContext)?.editorView;

  // FIX
  // const editorThemeName = useContext(GlobalContext)!.editorSettings.theme.value;
  // const editorTheme = getTheme(editorThemeName);
  // console.log(editorTheme);

  useEffect(() => {
    if (editorRef.current) {
      const view = new EditorView({
        doc: props.initialDoc,
        parent: editorRef.current,
        extensions: [
          // A line number gutter
          lineNumbers(),
          // A gutter with code folding markers
          foldGutter(),
          // Replace non-printable characters with placeholders
          highlightSpecialChars(),
          // The undo history
          history(),
          // Replace native cursor/selection with our own
          drawSelection(),
          // Show a drop cursor when dragging over the editor
          dropCursor(),
          // Allow multiple cursors/selections
          EditorState.allowMultipleSelections.of(true),
          // Re-indent lines when typing specific input
          indentOnInput(),
          // Highlight syntax with a default style
          syntaxHighlighting(defaultHighlightStyle),
          // Highlight matching brackets near cursor
          bracketMatching(),
          // Automatically close brackets
          closeBrackets(),
          // Load the autocompletion system
          autocompletion(),
          // Allow alt-drag to select rectangular regions
          rectangularSelection(),
          // Change the cursor to 4a crosshair when holding alt
          crosshairCursor(),
          // Style the current line specially
          highlightActiveLine(),
          // Style the gutter for current line specially
          highlightActiveLineGutter(),

          keymap.of([
            ...defaultKeymap, // A large set of basic bindings
            ...historyKeymap, // Redo/undo keys
            ...searchKeymap, // Search-related keys
            ...closeBracketsKeymap, // Closed-brackets aware backspace
            ...foldKeymap, // Code folding bindings
            ...completionKeymap, // Autocompletion keys
            ...lintKeymap, // Keys related to the linter system
          ]),

          // =======================================================================================

          // THEME
          // gruvboxDark,
          // SYNTAX
          StreamLanguage.define(stex),
          // LINTING

          // AUTOCOMPLETE

          // CUSTOM KEYMAPS
          Prec.highest(
            keymap.of([
              {
                key: "Ctrl-b",
                mac: "Cmd-b",
                run: bold,
              },
              {
                key: "Ctrl-i",
                mac: "Cmd-i",
                run: italic,
              },
              {
                key: "Ctrl-u",
                mac: "Cmd-u",
                run: underline,
              },
              {
                key: "Ctrl-Enter",
                mac: "Cmd-Enter",
                run: compile,
              },
            ])
          ),

          // =======================================================================================
        ],
      });

      editorViewRef!.current = view;

      // Al momento dello smontaggio del componente
      return () => {
        view.destroy();
      };
    }
  }, [props.initialDoc, props.onChange, editorViewRef]);

  return (
    <div
      ref={editorRef}
      className={`${props.className} bg-background h-full overflow-y-auto`}
    ></div>
  );
}

export default CodeMirrorEditor;

function bold(editorViewRef: EditorView) {
  if (editorViewRef) {
    applyBold(editorViewRef);
    return true;
  }
  return false;
}

function italic(editorViewRef: EditorView) {
  if (editorViewRef) {
    applyItalic(editorViewRef);
    return true;
  }
  return false;
}

function underline(editorViewRef: EditorView) {
  if (editorViewRef) {
    applyUnderline(editorViewRef);
    return true;
  }
  return false;
}

function compile(editorViewRef: EditorView) {
  if (editorViewRef) {
    // compileMethod
    console.log("Compila!");
    return true;
  }
  return false;
}

// FIX
// function getTheme(themeName: string) {
//   console.log(`cm6-theme-${themeName}`);
//   import(`cm6-theme-${themeName}`).then((theme) => {
//     return theme;
//   });
// }
