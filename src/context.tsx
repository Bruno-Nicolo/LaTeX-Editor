import React, { createContext, useState, type ReactNode } from "react";

type renamingMethods = {
  editedItemId: number;
  setEditedItemId: React.Dispatch<React.SetStateAction<number>>;
};

export const GlobalContext = createContext<renamingMethods | undefined>(
  undefined
);

export default function GlobalState(props: { children: ReactNode }) {
  const [editedItemId, setEditedItemId] = useState(-1);

  return (
    <GlobalContext.Provider value={{ editedItemId, setEditedItemId }}>
      {props.children}
    </GlobalContext.Provider>
  );
}
