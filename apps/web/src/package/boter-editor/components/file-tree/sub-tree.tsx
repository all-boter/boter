import React from "react";
import { sortDir, sortFile } from "../../utils/file-manager";
import { DirView } from "./dir-view";
import { FileView } from "./file-view";
import { CodeFile, Directory } from "../../utils/types";

interface SubTreeProps {
  /**Root directory*/
  directory: Directory;
  selectedFile: CodeFile | undefined;
  onSelect: (file: CodeFile) => void;
}

export const SubTree = ({ directory, selectedFile, onSelect }: SubTreeProps) => {

  return (
    <div>
      {
        directory.dirs
          .sort(sortDir)
          .map(dir => (
            <React.Fragment key={dir.id}>
              <DirView
                directory={dir}
                selectedFile={selectedFile}
                onSelect={onSelect} />
            </React.Fragment>
          ))
      }
      {
        directory.files
          .sort(sortFile)
          .map(file => (
            <React.Fragment key={file.id}>
              <FileView
                file={file}
                selectedFile={selectedFile}
                onClick={() => onSelect(file)} />
            </React.Fragment>
          ))
      }
    </div>
  )
}
