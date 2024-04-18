import React from 'react'
import { getIcon } from '../icon';
import { SubTree } from './sub-tree';
import { CodeFile, Directory } from '../..//utils/types';
// import './style.css'

interface FileTreeProps {
  /**Root directory*/
  rootDir: Directory;
  selectedFile: CodeFile | undefined;
  onSelect: (file: CodeFile) => void;
}

export const FileTree = ({ rootDir, selectedFile, onSelect }: FileTreeProps) => {
  return <SubTree directory={rootDir} selectedFile={selectedFile} onSelect={onSelect} />
}

export const isChildSelected = (directory: Directory, selectedFile: CodeFile) => {
  let res: boolean = false;

  function isChild(dir: Directory, file: CodeFile) {
    if (selectedFile.parentId === dir.id) {
      res = true;
      return;
    }
    if (selectedFile.parentId === '0') {
      res = false;
      return;
    }
    dir.dirs.forEach((item) => {
      isChild(item, file);
    })
  }

  isChild(directory, selectedFile);
  return res;
}

export const FileIcon = ({ extension, name }: { name?: string, extension?: string }) => {
  let icon = getIcon(extension || "", name || "");
  return (
    <span className='botere-file-icon'>
      {icon}
    </span>
  )
}
