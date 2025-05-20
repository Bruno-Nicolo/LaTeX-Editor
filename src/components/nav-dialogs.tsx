import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function CreationDialog(props: {
  children: ReactNode;
  type: "folder" | "file";
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new {props.type}</DialogTitle>
          <DialogDescription>
            This {props.type} will be created in the root folder of the current
            project
          </DialogDescription>
        </DialogHeader>
        <Input
          type="text"
          defaultValue={props.type == "file" ? "name.tex" : ""}
        />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
