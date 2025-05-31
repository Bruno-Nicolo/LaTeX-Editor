export type file = {
  name: string;
  id: number;
  parent_id: number;
  type: "folder" | "file" | "project";
  workbench: boolean;
  isActive: boolean;
};

// PROBLEMA: quando salvo file/cartelle nella workbench come faccio a capire a che
// progetto appartengono? bibliography.bib appartiene al progetto 1 o a progetto 2?
export const MOCKFOLDERS: file[] = [
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
    workbench: true,
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
    workbench: true,
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
    name: "bibliography.bib",
    id: 6,
    parent_id: 1,
    type: "file",
    workbench: true,
    isActive: true,
  },
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
    name: "Sono dell'altro progetto",
    id: 10,
    parent_id: 5,
    type: "folder",
    workbench: false,
    isActive: true,
  },
  {
    name: "Sono dell'altro progetto",
    id: 11,
    parent_id: 1,
    type: "folder",
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
