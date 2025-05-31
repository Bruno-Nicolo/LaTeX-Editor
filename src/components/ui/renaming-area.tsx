import { GlobalContext } from "@/context";
import React, { useContext, useEffect } from "react";

export function RenamingArea(props: {
  id: number;
  children: string;
  className?: string;
}) {
  const { editedItemId, setEditedItemId } = useContext(GlobalContext)!;
  const [newName, setName] = React.useState(props.children);
  const ACTIVEPROJID = 12;

  useEffect(() => {
    if (editedItemId === props.id) {
      const input = document.getElementsByName("renameFileInput")[0];

      if (input != undefined) {
        input.focus();
      }
    }
  }, [editedItemId, props.id]);

  if (editedItemId === props.id) {
    return (
      <form action="/foo" method="post">
        <input
          name="renameFileInput"
          defaultValue={newName}
          onClick={(e) => e.stopPropagation()}
          onChange={(element) => setName(element.target.value)}
          type="text"
          className={`w-full outline-none ${props.className}`}
        />

        <input
          type="submit"
          className="hidden"
          onSubmit={() => setEditedItemId(-1)}
        />
      </form>
    );
  }

  return (
    <span
      onDoubleClick={() => {
        if (props.id == ACTIVEPROJID) {
          setEditedItemId(props.id);
        }
      }}
      className={`truncate ${props.className}`}
    >
      {newName}
    </span>
  );
}
