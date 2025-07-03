import React, {
  createContext,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import type { editor } from "monaco-editor";

type layoutSettings = {
  modeName: string;
  editorStyle: string;
  pdfStyle: string;
};

type contextType = {
  editedItemId: number;
  setEditedItemId: React.Dispatch<React.SetStateAction<number>>;
  editorView: RefObject<editor.IStandaloneCodeEditor | null>;
  editorDialog: RefObject<editor.IStandaloneCodeEditor | null>;
  editorSettings: {
    layout: {
      value: layoutSettings;
      update: React.Dispatch<React.SetStateAction<layoutSettings>>;
    };
    fontFamily: {
      value: string;
      update: React.Dispatch<React.SetStateAction<string>>;
    };
    fontSize: {
      value: number;
      update: React.Dispatch<React.SetStateAction<number>>;
    };
    theme: {
      value: string;
      update: React.Dispatch<React.SetStateAction<string>>;
    };
    language: {
      value: string;
      update: React.Dispatch<React.SetStateAction<string>>;
    };
  };
};

export const GlobalContext = createContext<contextType | undefined>(undefined);

export default function GlobalState(props: { children: ReactNode }) {
  const [editedItemId, setEditedItemId] = useState(-1);
  const [layout, setLayout] = useState(getLayoutStyle());
  const [fontFamily, setFontFamily] = useState(getFontFamily());
  const [fontSize, setfontSize] = useState(getFontSize());
  const [theme, setTheme] = useState(getTheme());
  const [language, setLanguage] = useState(getLanguage());

  const editorViewRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const editorDialogRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        editedItemId: editedItemId,
        setEditedItemId: setEditedItemId,
        editorView: editorViewRef,
        editorDialog: editorDialogRef,
        editorSettings: {
          layout: {
            value: layout,
            update: setLayout,
          },
          fontFamily: {
            value: fontFamily,
            update: setFontFamily,
          },
          fontSize: {
            value: fontSize,
            update: setfontSize,
          },
          theme: {
            value: theme,
            update: setTheme,
          },
          language: {
            value: language,
            update: setLanguage,
          },
        },
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

function getLayoutStyle() {
  const preference = localStorage.getItem("Layout");
  const defaultStyle = {
    modeName: "DynamicSplit",
    editorStyle: `w-[80%]`,
    pdfStyle: `w-[80%] absolute left-[80%]`,
  };

  if (preference) return JSON.parse(preference);

  return defaultStyle;
}

function getFontFamily() {
  const preference = localStorage.getItem("FontFamily");
  const defaultValue = "mono";

  return preference ?? defaultValue;
}

function getFontSize() {
  const preference = localStorage.getItem("FontSize");
  const defaultValue = 14;

  if (preference) return parseInt(preference);

  return defaultValue;
}

function getTheme() {
  const preference = localStorage.getItem("Theme");
  const defaultValue = "DreamWeaver";

  return preference ?? defaultValue;
}

function getLanguage() {
  const preference = localStorage.getItem("Language");
  const defaultValue = "english";

  return preference ?? defaultValue;
}
