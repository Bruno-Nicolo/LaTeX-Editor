import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CloudUpload, FilePlus, FolderPlus, Upload } from "lucide-react";

export function CreationDialog(props: { type: "folder" | "file" }) {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        {props.type === "file" ? <FilePlus /> : <FolderPlus />}
      </DialogTrigger>
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

export function UploadFileDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Upload className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        {/* Drop area */}
        <div id="fileInput">
          <CloudUpload />
          <DialogTitle>Upload a File</DialogTitle>
          <DialogDescription>
            Click to browse, or drag & drop a file here
          </DialogDescription>
        </div>
        <input type="file" name="fileInput" className="hidden" />

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
