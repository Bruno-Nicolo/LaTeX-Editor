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
import { useState, type DragEvent } from "react";

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
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState("#");

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    document.getElementById("dropArea")!.style.backgroundColor = "";
    const file = event.dataTransfer!.files[0];
    showImagePreview(file);
  };

  const showImagePreview = (file: File) => {
    // Mostra l'anteprima solo se è un tipo di file immagine
    if (file.type.startsWith("image/")) {
      setFileName(file.name);
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        // Quando il lettore ha finito di leggere il file
        setFilePath(event.target!.result!.toString());
      };

      reader.onerror = (error) => {
        console.error("Errore while reading file:", error);
        setFilePath("#");
      };

      reader.readAsDataURL(file);
    }
  };

  const onDragEnter = (event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const onDragOver = (event: DragEvent) => {
    event.stopPropagation();
    document.getElementById("dropArea")!.style.backgroundColor =
      "var(--secondary)";
    event.preventDefault();
  };

  const openFileExplorer = () => {
    document.getElementById("fileInput")!.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Upload className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        {/* Drop area */}
        <div
          id="dropArea"
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDrop={handleDrop}
        >
          {fileName == "" ? (
            <>
              <CloudUpload />
              <DialogTitle>Upload a File</DialogTitle>
              <DialogDescription>
                Click to{" "}
                <span
                  className="font-bold underline cursor-pointer"
                  onClick={openFileExplorer}
                >
                  browse
                </span>
                , or drag & drop a file here
              </DialogDescription>
            </>
          ) : (
            <>
              <DialogTitle className="max-w-lg truncate">
                {fileName}
              </DialogTitle>
              <img id="image-preview" src={filePath} alt="Preview" />
            </>
          )}
        </div>

        {/* hidden input */}
        <input
          type="file"
          name="fileInput"
          id="fileInput"
          className="hidden"
          accept="image/*"
          onChange={(event) => {
            event.preventDefault();

            const file = event.target!.files![0];
            showImagePreview(file);
          }}
        />

        <DialogFooter>
          {fileName !== "" && (
            // Reset Button
            <Button
              variant={"outline"}
              onClick={() => {
                setFilePath("#");
                setFileName("");
              }}
            >
              Clear
            </Button>
          )}
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
