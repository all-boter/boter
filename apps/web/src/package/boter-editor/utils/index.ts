import { CodeFile, Directory, Type } from "./types";
export * from "./types"

export function findFileByName(rootDir: Directory, filename: string): CodeFile | undefined {
  let targetFile: CodeFile | undefined = undefined;

  function findFile(rootDir: Directory, filename: string) {
    rootDir.files.forEach((file) => {
      if (file.name === filename) {
        targetFile = file;
        return;
      }
    });
    rootDir.dirs.forEach((dir) => {
      findFile(dir, filename);
    })
  }

  findFile(rootDir, filename);
  return targetFile;
}

export function buildFileTree(data: any): Directory {
  // directory array
  const dirs = [...data.directories];
  // file array
  const files = [...data.modules];
  const cache = new Map<string, Directory | CodeFile>();
  // The root directory to be built
  let rootDir: Directory = {
    id: '0',
    name: 'root',
    parentId: undefined,
    type: Type.DIRECTORY,
    depth: 0,
    dirs: [],
    files: [],
  };

  // Save <id, directory object> into map
  dirs.forEach((item) => {
    let dir: Directory = {
      id: item.shortid,
      name: item.title,
      parentId: item.directory_shortid === null ? '0' : item.directory_shortid,
      type: Type.DIRECTORY,
      depth: 0,
      dirs: [],
      files: [],
    };

    cache.set(dir.id, dir);
  });
  // Save <id, file object> into map
  files.forEach((item) => {
    let file: CodeFile = {
      id: item.shortid,
      code_id: item.id,
      name: item.title,
      parentId: item.directory_shortid === null ? '0' : item.directory_shortid,
      type: Type.FILE,
      depth: 0,
      content: item.code
    };
    cache.set(file.id, file);
  });

  // Start traversing the build file tree
  cache.forEach((value, key) => {
    // '0' means the file or directory is located in the root directory
    if (value.parentId === '0') {
      if (value.type === Type.DIRECTORY)
        rootDir.dirs.push(value as Directory)
      else
        rootDir.files.push(value as CodeFile)
    } else {
      const parentDir = cache.get(value.parentId as string) as Directory;
      if (value.type === Type.DIRECTORY)
        parentDir.dirs.push(value as Directory)
      else
        parentDir.files.push(value as CodeFile)
    }
  })

  getDepth(rootDir, 0);

  return rootDir;
}

/**
 * Get file depth
 */
function getDepth(rootDir: Directory, curDepth: number) {
  rootDir.files.forEach((file) => {
    file.depth = curDepth + 1;
  });
  rootDir.dirs.forEach((dir) => {
    dir.depth = curDepth + 1;
    getDepth(dir, curDepth + 1);
  })
}

export function isEmptyObject(obj: any) {
  return Object.getOwnPropertyNames(obj).length !== 0;
}