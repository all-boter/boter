import { Directory, CodeFile, CodesJson } from "./types";

export function sortDir(l: Directory, r: Directory) {
  return l.name.localeCompare(r.name);
}

export function sortFile(l: CodeFile, r: CodeFile) {
  return l.name.localeCompare(r.name);
}

export function parseCodesToFilePath(jsonData: CodesJson, parentPath = '', output: Record<string, { code: string }> = {}): Record<string, { code: string }> {
  jsonData.files.forEach((file) => {
    const filePath = parentPath + '/' + file.name;
    output[filePath] = { code: file.content };
  });

  jsonData.dirs.forEach((directory) => {
    const directoryPath = parentPath + '/' + directory.name;
    output = parseCodesToFilePath(directory, directoryPath, output);
  });

  return output;
}