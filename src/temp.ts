export type file = {
  name: string;
  id: number;
  parent_id: number;
  type: "folder" | "file" | "project";
  workbench: boolean;
  isActive: boolean;
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
  },
  {
    name: "src",
    id: 2,
    parent_id: 1,
    type: "folder",
    workbench: false,
    isActive: true,
  },
  {
    name: "image.png",
    id: 12,
    parent_id: 2,
    type: "file",
    workbench: false,
    isActive: true,
  },
  {
    name: "index.tex",
    id: 3,
    parent_id: 2,
    type: "file",
    workbench: false,
    isActive: true,
  },
  {
    name: "introduction asdadsadsadadada.tex",
    id: 4,
    parent_id: 2,
    type: "file",
    workbench: false,
    isActive: true,
  },
  {
    name: "chapters", // Nuova cartella all'interno di src
    id: 13,
    parent_id: 2,
    type: "folder",
    workbench: false,
    isActive: true,
  },
  {
    name: "chapter1.tex", // Nuovo file all'interno di chapters
    id: 14,
    parent_id: 13,
    type: "file",
    workbench: false,
    isActive: true,
  },
  {
    name: "chapter2.tex", // Nuovo file all'interno di chapters
    id: 15,
    parent_id: 13,
    type: "file",
    workbench: false,
    isActive: true,
  },
  {
    name: "config.json", // Nuovo file all'interno di src
    id: 16,
    parent_id: 2,
    type: "file",
    workbench: false,
    isActive: true,
  },
  {
    name: "img",
    id: 5,
    parent_id: 1,
    type: "folder",
    workbench: false,
    isActive: true,
  },
  {
    name: "diagram.svg", // Nuovo file all'interno di img
    id: 17,
    parent_id: 5,
    type: "file",
    workbench: false,
    isActive: true,
  },
  {
    name: "chart.jpg", // Nuovo file all'interno di img
    id: 18,
    parent_id: 5,
    type: "file",
    workbench: false,
    isActive: true,
  },
  {
    name: "icons", // Nuova cartella all'interno di img
    id: 19,
    parent_id: 5,
    type: "folder",
    workbench: false,
    isActive: true,
  },
  {
    name: "icon_home.png", // Nuovo file all'interno di icons
    id: 20,
    parent_id: 19,
    type: "file",
    workbench: false,
    isActive: true,
  },
  {
    name: "bibliography.bib",
    id: 6,
    parent_id: 1,
    type: "file",
    workbench: false,
    isActive: true,
  },
  {
    name: "docs", // Nuova cartella per la documentazione
    id: 21,
    parent_id: 1,
    type: "folder",
    workbench: false,
    isActive: true,
  },
  {
    name: "README.md", // Nuovo file all'interno di docs
    id: 22,
    parent_id: 21,
    type: "file",
    workbench: false,
    isActive: true,
  },
  {
    name: "notes.txt", // Nuovo file all'interno di docs
    id: 23,
    parent_id: 21,
    type: "file",
    workbench: false,
    isActive: true,
  },

  // --- Progetto "Recent Project 2" (ID: 7) ---
  {
    name: "Recent Project 2",
    id: 7,
    parent_id: 0,
    type: "project",
    workbench: true,
    isActive: true,
  },
  {
    name: "Sono dell'altro progetto",
    id: 8,
    parent_id: 7,
    type: "folder",
    workbench: false,
    isActive: true,
  },
  {
    name: "Sono dell'altro progetto",
    id: 9,
    parent_id: 7,
    type: "folder",
    workbench: false,
    isActive: true,
  },
  {
    name: "data", // Nuova cartella per i dati
    id: 24,
    parent_id: 7,
    type: "folder",
    workbench: false,
    isActive: true,
  },
  {
    name: "dataset.csv", // Nuovo file all'interno di data
    id: 25,
    parent_id: 24,
    type: "file",
    workbench: false,
    isActive: true,
  },
  {
    name: "scripts", // Nuova cartella per gli script
    id: 26,
    parent_id: 7,
    type: "folder",
    workbench: false,
    isActive: true,
  },
  {
    name: "process.py", // Nuovo file all'interno di scripts
    id: 27,
    parent_id: 26,
    type: "file",
    workbench: false,
    isActive: true,
  },
  {
    name: "report.pdf", // Nuovo file di report
    id: 28,
    parent_id: 7,
    type: "file",
    workbench: false,
    isActive: true,
  },

  // --- Altri elementi sparsi che erano già presenti ---
  {
    name: "Sono dell'altro progetto",
    id: 10,
    parent_id: 5, // Questo era sotto 'img' del primo progetto
    type: "folder",
    workbench: false,
    isActive: true,
  },
  {
    name: "Sono dell'altro progetto",
    id: 11,
    parent_id: 1, // Questo era sotto il primo progetto
    type: "folder",
    workbench: false,
    isActive: true,
  },

  // --- Nuovo Progetto "Archived Project Alpha" (ID: 29) ---
  {
    name: "Archived Project Alpha",
    id: 29,
    parent_id: 0,
    type: "project",
    workbench: false,
    isActive: false, // Esempio di progetto non attivo
  },
  {
    name: "old_files",
    id: 30,
    parent_id: 29,
    type: "folder",
    workbench: false,
    isActive: false,
  },
  {
    name: "legacy_document.doc",
    id: 31,
    parent_id: 30,
    type: "file",
    workbench: false,
    isActive: false,
  },

  // --- Nuovo Progetto "Template Project" (ID: 32) ---
  {
    name: "Template Project",
    id: 32,
    parent_id: 0,
    type: "project",
    workbench: false,
    isActive: true,
  },
  {
    name: "template_src",
    id: 33,
    parent_id: 32,
    type: "folder",
    workbench: false,
    isActive: true,
  },
  {
    name: "main.js",
    id: 34,
    parent_id: 33,
    type: "file",
    workbench: false,
    isActive: true,
  },
  {
    name: "styles.css",
    id: 35,
    parent_id: 33,
    type: "file",
    workbench: false,
    isActive: true,
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
