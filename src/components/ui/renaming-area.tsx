import { GlobalContext } from "@/context";
import { ACTIVEPROJECTID } from "@/temp";
import React, {
  useContext,
  useEffect,
  type FormEvent,
  type MouseEvent,
} from "react";

export function RenamingArea(props: { id: number; children: string }) {
  const { editedItemId, setEditedItemId } = useContext(GlobalContext)!;
  const [newName, setName] = React.useState(props.children);

  useEffect(() => {
    const input = document.getElementById("renamedItem");

    setTimeout(() => {
      input?.focus();
    }, 200);

    input?.addEventListener("focusout", (event) => {
      event.preventDefault();
      // Salva le modifiche
      setEditedItemId(-1);
    });
  }, [editedItemId, setEditedItemId]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Salva le modifiche
    setEditedItemId(-1);
  };

  const handleDoubleClick = (event: MouseEvent) => {
    if (props.id === ACTIVEPROJECTID) {
      event.preventDefault();
      setEditedItemId(props.id);
    }
  };

  if (editedItemId === props.id) {
    return (
      <span>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            type="text"
            id="renamedItem"
            className={`w-full outline-none ${
              props.id === ACTIVEPROJECTID && "font-semibold"
            }`}
            value={newName}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input type="submit" className="hidden" />
        </form>
      </span>
    );
  }
  return (
    <span
      className={`truncate ${props.id === ACTIVEPROJECTID && "font-semibold"}`}
      onDoubleClick={handleDoubleClick}
    >
      {newName}
    </span>
  );
}
