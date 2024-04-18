import { useState } from "react";
import { isChildSelected } from ".";
import { FileView } from "./file-view";
import { SubTree } from "./sub-tree";
import { Directory,CodeFile } from "../../utils/types";

export const DirView = ({ directory, selectedFile, onSelect }: {
  /**Current directory*/
  directory: Directory;
  /**selected file*/
  selectedFile: CodeFile | undefined;
  onSelect: (file: CodeFile) => void;
}) => {
  let defaultOpen = false;
  if (selectedFile)
    defaultOpen = isChildSelected(directory, selectedFile)
  const [open, setOpen] = useState(defaultOpen);

  return (
    <>
      <FileView
        file={directory}
        icon={open ? "openDirectory" : "closedDirectory"}
        selectedFile={selectedFile}
        onClick={() => setOpen(!open)} />
      {
        open ? (
          <SubTree
            directory={directory}
            selectedFile={selectedFile}
            onSelect={onSelect} />
        ) : null
      }
    </>
  )
}