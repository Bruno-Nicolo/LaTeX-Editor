import React, { createContext, useState, type ReactNode } from "react";

type layoutSettings = {
  modeName: string;
  editorStyle: string;
  pdfStyle: string;
};

type renamingMethods = {
  editedItemId: number;
  setEditedItemId: React.Dispatch<React.SetStateAction<number>>;
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

export const GlobalContext = createContext<renamingMethods | undefined>(
  undefined
);

export default function GlobalState(props: { children: ReactNode }) {
  const [editedItemId, setEditedItemId] = useState(-1);
  const [layout, setLayout] = useState(getLayoutStyle());
  const [fontFamily, setFontFamily] = useState(getFontFamily());
  const [fontSize, setfontSize] = useState(getFontSize());
  const [theme, setTheme] = useState(getTheme());
  const [language, setLanguage] = useState(getLanguage());

  return (
    <GlobalContext.Provider
      value={{
        editedItemId,
        setEditedItemId,
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
    editorStyle: `w-[90%]`,
    pdfStyle: `w-[90%] absolute left-[90%]`,
  };

  if (preference) return JSON.parse(preference);

  return defaultStyle;
}

function getFontFamily() {
  const preference = localStorage.getItem("FontFamily");
  const defaultValue = "Inter";

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
  const defaultValue = "material-light";

  return preference ?? defaultValue;
}

function getLanguage() {
  const preference = localStorage.getItem("Language");
  const defaultValue = "english";

  return preference ?? defaultValue;
}
