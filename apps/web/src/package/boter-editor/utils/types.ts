interface CommonProps {
  /**file id*/ 
  id: string;
  /**file type*/ 
  type: Type;
  name: string;
  /**Parent directory, undefined if it is the root directory*/
  parentId: string | undefined;
  /**File depth*/
  depth: number;
}

export interface Directory extends CommonProps {
  files: CodeFile[];
  dirs: Directory[];
}

export interface CodesJson {
  files: CodeFile[];
  dirs: Directory[];
}

export interface CodeFile extends CommonProps {
  /**document content*/
  content: string;
  code_id: string
}

export enum Type {
  FILE,
  DIRECTORY,
  /**Virtual file (used to display when the file is not successfully obtained)*/
  DUMMY,
}