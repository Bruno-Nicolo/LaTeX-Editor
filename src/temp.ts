export type file = {
  name: string;
  id: number;
  parent_id: number;
  type: "folder" | "file" | "project";
  workbench: boolean;
  isActive: boolean;
  isMain: boolean;
};

export const MOCKFOLDERS: file[] = [
  // --- Progetto "Active Project Name" (ID: 1) ---
  {
    name: "Active Project Name",
    id: 1,
    parent_id: 0,
    type: "project",
    workbench: false,
    isActive: true,
    isMain: false,
  },
  {
    name: "src",
    id: 2,
    parent_id: 1,
    type: "folder",
    workbench: false,
    isActive: true,
    isMain: false,
  },
  {
    name: "image.png",
    id: 12,
    parent_id: 2,
    type: "file",
    workbench: false,
    isActive: true,
    isMain: false,
  },
  {
    name: "index.tex",
    id: 3,
    parent_id: 2,
    type: "file",
    workbench: false,
    isActive: true,
    isMain: true, // Main .tex file for "Active Project Name"
  },
  {
    name: "introduction asdadsadsadadada.tex",
    id: 4,
    parent_id: 2,
    type: "file",
    workbench: false,
    isActive: true,
    isMain: false,
  },
  {
    name: "chapters", // Nuova cartella all'interno di src
    id: 13,
    parent_id: 2,
    type: "folder",
    workbench: false,
    isActive: true,
    isMain: false,
  },
  {
    name: "chapter1.tex", // Nuovo file all'interno di chapters
    id: 14,
    parent_id: 13,
    type: "file",
    workbench: false,
    isActive: true,
    isMain: false,
  },
  {
    name: "chapter2.tex", // Nuovo file all'interno di chapters
    id: 15,
    parent_id: 13,
    type: "file",
    workbench: false,
    isActive: true,
    isMain: false,
  },
  {
    name: "img",
    id: 5,
    parent_id: 1,
    type: "folder",
    workbench: false,
    isActive: true,
    isMain: false,
  },
  {
    name: "chart.jpg", // Nuovo file all'interno di img
    id: 18,
    parent_id: 5,
    type: "file",
    workbench: false,
    isActive: true,
    isMain: false,
  },
  {
    name: "icons", // Nuova cartella all'interno di img
    id: 19,
    parent_id: 5,
    type: "folder",
    workbench: false,
    isActive: true,
    isMain: false,
  },
  {
    name: "icon_home.png", // Nuovo file all'interno di icons
    id: 20,
    parent_id: 19,
    type: "file",
    workbench: false,
    isActive: true,
    isMain: false,
  },
  {
    name: "bibliography.bib",
    id: 6,
    parent_id: 1,
    type: "file",
    workbench: false,
    isActive: true,
    isMain: false,
  },

  // --- Progetto "Recent Project 2" (ID: 7) ---
  {
    name: "Recent Project 2",
    id: 7,
    parent_id: 0,
    type: "project",
    workbench: true,
    isActive: true,
    isMain: false,
  },
  {
    name: "documentation",
    id: 36,
    parent_id: 7,
    type: "folder",
    workbench: false,
    isActive: true,
    isMain: false,
  },
  {
    name: "user_guide.tex",
    id: 37,
    parent_id: 36,
    type: "file",
    workbench: false,
    isActive: true,
    isMain: true, // Main .tex file for "Recent Project 2"
  },
  {
    name: "project_overview.tex",
    id: 38,
    parent_id: 36,
    type: "file",
    workbench: false,
    isActive: true,
    isMain: false,
  },
  {
    name: "assets",
    id: 39,
    parent_id: 7,
    type: "folder",
    workbench: false,
    isActive: true,
    isMain: false,
  },
  {
    name: "logo.png",
    id: 40,
    parent_id: 39,
    type: "file",
    workbench: false,
    isActive: true,
    isMain: false,
  },
  {
    name: "background.jpg",
    id: 41,
    parent_id: 39,
    type: "file",
    workbench: false,
    isActive: true,
    isMain: false,
  },
  {
    name: "references.bib",
    id: 42,
    parent_id: 7,
    type: "file",
    workbench: false,
    isActive: true,
    isMain: false,
  },

  // --- Nuovo Progetto "Archived Project Alpha" (ID: 29) ---
  {
    name: "Archived Project Alpha",
    id: 29,
    parent_id: 0,
    type: "project",
    workbench: false,
    isActive: false, // Esempio di progetto non attivo
    isMain: false,
  },
  {
    name: "archive_docs",
    id: 43,
    parent_id: 29,
    type: "folder",
    workbench: false,
    isActive: false,
    isMain: false,
  },
  {
    name: "old_report.tex",
    id: 44,
    parent_id: 43,
    type: "file",
    workbench: false,
    isActive: false,
    isMain: true, // Main .tex file for "Archived Project Alpha"
  },
  {
    name: "figures",
    id: 45,
    parent_id: 29,
    type: "folder",
    workbench: false,
    isActive: false,
    isMain: false,
  },
  {
    name: "archived_diagram.png",
    id: 46,
    parent_id: 45,
    type: "file",
    workbench: false,
    isActive: false,
    isMain: false,
  },
  {
    name: "old_references.bib",
    id: 47,
    parent_id: 29,
    type: "file",
    workbench: false,
    isActive: false,
    isMain: false,
  },
];

export const ACTIVEPROJECTID = 1;

export function getFilePath(file: file) {
  const parentName = getRootName(file);

  const path =
    file.parent_id === 0
      ? `${file.name}`
      : `${parentName} / ... / ${file.name}`;
  return path;
}

function getRootName(file: file) {
  let currentFile = file;
  let parent = MOCKFOLDERS.find(
    (element) => element.id == currentFile.parent_id
  );

  while (parent) {
    currentFile = parent;
    parent = MOCKFOLDERS.find((element) => element.id == currentFile.parent_id);
  }

  return currentFile.name;
}
