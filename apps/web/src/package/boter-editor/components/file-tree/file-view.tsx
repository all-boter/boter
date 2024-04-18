import { CodeFile, Directory } from "../../utils/types";
import { FileIcon } from ".";
// import './style.css'

export const FileView = ({ file, icon, selectedFile, onClick }: {
  /**Current directory*/
  file: CodeFile | Directory;
  icon?: string;
  /**selected file*/
  selectedFile: CodeFile | undefined;
  onClick: () => void;
}) => {
  const isSelected = (selectedFile && selectedFile.id === file.id) as boolean;
  const depth = file.depth;

  return (
    <div
      className={`botere-file ${isSelected ? "botere-file-selected" : ""}`}
      style={{ paddingLeft: `${depth * 16}px` }}
      onClick={onClick}
    >
      <FileIcon
        name={icon}
        extension={file.name.split('.').pop() || ""}
      />
      <span style={{ marginLeft: 1,whiteSpace: 'pre' }}>{file.name}</span>
    </div>
  );
};
