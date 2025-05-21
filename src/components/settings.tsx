import { useState, type ReactNode } from "react";
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
            Customize you editing experience to your liking
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
  return (
    <Select defaultValue={"material-dark"}>
      <SelectTrigger size="sm" className="w-[150px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent id="ThemeSelector">
        <SelectGroup>
          <SelectLabel>Themes</SelectLabel>
          <SelectItem value="material-dark">Material Dark</SelectItem>
          <SelectItem value="material-light">Material Light</SelectItem>
          <SelectItem value="gruvbox-light">Gruvbox Light</SelectItem>
          <SelectItem value="gruvbox-dark">Gruvbox Dark</SelectItem>
          <SelectItem value="catppuccin">catppuccin</SelectItem>
          <SelectItem value="dracula">Dracula</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function LanguageSelector() {
  const languages = [
    "Spagnolo",
    "Italiano",
    "Inglese",
    "Hindi",
    "Arabo",
    "Bengalese",
    "Cinese Mandarino",
    "Portoghese",
    "Russo",
    "Giapponese",
  ].sort();

  return (
    <Select defaultValue={"Italiano"}>
      <SelectTrigger size="sm" className="w-[150px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent id="LanguageSelector">
        <SelectGroup>
          <SelectLabel>Themes</SelectLabel>
          {languages.map((lang, index) => {
            return (
              <SelectItem key={index} value={lang.replace(" ", "-")}>
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
  return (
    <Select defaultValue={"Inter"}>
      <SelectTrigger size="sm" className="w-[150px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent id="FontSelector">
        <SelectGroup>
          <SelectLabel>Fonts</SelectLabel>
          <SelectItem value="Inter">Inter</SelectItem>
          <SelectItem value="Consolas">Consolas</SelectItem>
          <SelectItem value="Roboto Mono">Roboto Mono</SelectItem>
          <SelectItem value="JetBrains Mono">JetBrains Mono</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function FontSizeSelector() {
  const fontSizes = [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96];

  return (
    <Select defaultValue={"14"}>
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
