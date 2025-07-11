import { useContext, useState, type ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { GlobalContext } from "@/context";
import { themesArray } from "./editor/latex-language-Monaco/theme";

export function SettingsMenu(props: { children: ReactNode }) {
  const [darkModeValue, setDarkModeValue] = useState(getDarkModeValue());
  const updateDarkModeValue = (value: boolean) => {
    const mode = value ? "dark" : "light";
    localStorage.setItem("darkMode", mode);
    document.querySelector("body")!.setAttribute("class", mode);

    setDarkModeValue(value);
  };

  return (
    <Sheet>
      <SheetTrigger>{props.children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-lg">
            Change your editor settings
          </SheetTitle>
          <SheetDescription>
            Customize your editing experience to your liking
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 flex flex-col gap-4">
          <SettingsGroup>
            <Label htmlFor="dark-mode">Dark Mode:</Label>
            <Switch
              id="dark-mode"
              defaultChecked={darkModeValue}
              onCheckedChange={updateDarkModeValue}
            />
          </SettingsGroup>

          <SettingsGroup>
            <Label htmlFor="LayoutSelector">Layout:</Label>
            <LayoutSelector />
          </SettingsGroup>

          <SettingsGroup>
            <Label htmlFor="FontSelector">Font Family:</Label>
            <FontSelector />
          </SettingsGroup>

          <SettingsGroup>
            <Label htmlFor="FontSizeSelector">Font Size:</Label>
            <FontSizeSelector />
          </SettingsGroup>

          <SettingsGroup>
            <Label htmlFor="ThemeSelector">Editor Theme:</Label>
            <ThemeSelector />
          </SettingsGroup>

          <SettingsGroup>
            <Label htmlFor="LanguageSelector">Spell Check:</Label>
            <LanguageSelector />
          </SettingsGroup>

          <br />

          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SettingsGroup(props: { children: ReactNode }) {
  return (
    <div className="flex items-center place-content-between">
      {props.children}
    </div>
  );
}

function ThemeSelector() {
  const { editorSettings } = useContext(GlobalContext)!;
  const theme = editorSettings.theme;
  const themeArraySorted = themesArray.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <Select
      defaultValue={theme.value}
      onValueChange={(value) => {
        localStorage.setItem("Theme", value);
        theme.update(value);
      }}
    >
      <SelectTrigger size="sm" className="w-[150px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent id="ThemeSelector">
        <SelectGroup>
          <SelectLabel>Themes</SelectLabel>
          {themeArraySorted.map((theme) => {
            return (
              <SelectItem key={theme.name} value={theme.name}>
                {theme.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function LanguageSelector() {
  const availableLanguages = [
    "Spanish",
    "Italian",
    "English",
    "Hindi",
    "Arabic",
    "Bengali",
    "Mandarin Chinese",
    "Portuguese",
    "Russian",
    "Japanese",
  ].sort();

  const { editorSettings } = useContext(GlobalContext)!;
  const language = editorSettings.language;

  return (
    <Select
      defaultValue={language.value}
      onValueChange={(value) => {
        localStorage.setItem("Language", value);
        language.update(value);
      }}
    >
      <SelectTrigger size="sm" className="w-[150px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent id="LanguageSelector">
        <SelectGroup>
          <SelectLabel>Themes</SelectLabel>
          {availableLanguages.map((lang, index) => {
            return (
              <SelectItem
                key={index}
                value={lang.toLocaleLowerCase().replace(" ", "-")}
              >
                {lang}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function FontSelector() {
  const { editorSettings } = useContext(GlobalContext)!;
  const font = editorSettings.fontFamily;

  return (
    <Select
      defaultValue={font.value}
      onValueChange={(value) => {
        localStorage.setItem("FontFamily", value);
        font.update(value);
      }}
    >
      <SelectTrigger size="sm" className="w-[150px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent id="FontSelector">
        <SelectGroup>
          <SelectLabel>Fonts</SelectLabel>
          <SelectItem value="mono">Monospace</SelectItem>
          <SelectItem value="serif">Serif</SelectItem>
          <SelectItem value="sans">Sans-Serif</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function LayoutSelector() {
  const { editorSettings } = useContext(GlobalContext)!;
  const layout = editorSettings.layout.value;

  return (
    <Select
      defaultValue={layout.modeName}
      onValueChange={(value) => {
        const settings = getLayoutSettingsFromName(value);
        localStorage.setItem("Layout", JSON.stringify(settings));
        editorSettings.layout.update(settings);
      }}
    >
      <SelectTrigger className="w-[150px]" size="sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent id="LayoutSelector">
        <SelectGroup>
          <SelectLabel>Size</SelectLabel>
          <SelectItem value="HalfSplit">Half Split</SelectItem>
          <SelectItem value="DynamicSplit">Dynamic Split</SelectItem>
          <SelectItem value="Overlap">Overlap</SelectItem>
          <SelectItem value="EditorOnly">Editor Only</SelectItem>
          <SelectItem value="PDFOnly">Pdf Only</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function FontSizeSelector() {
  const fontSizes = [12, 14, 16, 18, 20, 24];

  const { editorSettings } = useContext(GlobalContext)!;
  const font = editorSettings.fontSize;

  return (
    <Select
      defaultValue={font.value.toString()}
      onValueChange={(value) => {
        localStorage.setItem("FontSize", value);
        font.update(parseInt(value));
      }}
    >
      <SelectTrigger className="w-[150px]" size="sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent id="FontSizeSelector">
        <SelectGroup>
          <SelectLabel>Size</SelectLabel>
          {fontSizes.map((size) => (
            <SelectItem value={`${size}`} key={size}>
              {size}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function getDarkModeValue() {
  let value = localStorage.getItem("darkMode");

  if (!value) {
    localStorage.setItem("darkMode", "light");
    value = "light";
  }

  return value == "dark";
}

function getLayoutSettingsFromName(name: string) {
  if (name == "HalfSplit") {
    return {
      modeName: name,
      editorStyle: "w-[50%]",
      pdfStyle: "w-[50%]",
    };
  } else if (name == "DynamicSplit") {
    return {
      modeName: name,
      editorStyle: `w-[80%]`,
      pdfStyle: `w-[80%] absolute left-[80%]`,
    };
  } else if (name == "EditorOnly") {
    return {
      modeName: name,
      editorStyle: "w-full",
      pdfStyle: "w-0",
    };
  } else if (name == "Overlap") {
    return {
      modeName: name,
      editorStyle: `w-[80%] z-[10]`,
      pdfStyle: `w-[80%] absolute right-0`,
    };
  } else {
    return {
      modeName: name,
      editorStyle: "w-0",
      pdfStyle: "w-full",
    };
  }
}
