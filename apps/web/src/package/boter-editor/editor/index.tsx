import { useCallback, useEffect, useMemo, useState } from "react";
import Editor from "../editor/editor";
import { CodeFile, Directory, Type, buildFileTree, findFileByName, isEmptyObject } from "../utils";
import { Sidebar } from "../components/sidebar";
import { FileTree } from "../components/file-tree";
import { IDirectory, IModule, boterCodeDb } from "../boter-db";
import { addRepository, getDirectoriesById, getModuleById, getRepositoriesBySourceId, getRepositoryBySourceId } from "../boter-db/db-util";
import { CURRENT_SANDBOX_ID, DataSource, fetchSandboxesData, mock_source_id } from "../../../services/editorApi";
import { mock_24d8ff } from "../../../common/mock/codesandbox.io-mock2";
import { parseCodesToFilePath } from "../utils/file-manager";
import { Github } from "../components/sidebar/github";
import CodeRenderer from "boter-renderer"
import { SUCCESS, bundlerUrl } from "../../../common/constants";
import { githubReposState, useAppSelector } from "../../../store";
import "../components/file-tree/style.css";
import "../components/sidebar/style.css";
import { GithubRepository } from "../../../services/githubService";
import { EditorSource } from "@/pages/editor";
import { getCodeByStgId } from "@/services/stgApi";
import { EditorMenubar } from "./menubar";
import { Box } from "@mui/system";

const dummyDir: Directory = {
  id: "1",
  name: "loading...",
  type: 2,
  parentId: undefined,
  depth: 0,
  dirs: [],
  files: []
};

const getDataFromPersistence = async (sourceId: string): Promise<Directory | undefined> => {
  const repository = await getRepositoryBySourceId(sourceId)
  if (repository) {
    const directories = await boterCodeDb.directories.where('source_id').equals(sourceId).toArray();
    const modules = await boterCodeDb.modules.where('source_id').equals(sourceId).toArray();
    const rootDir = buildFileTree({
      ...repository,
      directories,
      modules
    });

    return rootDir
  } else {
    console.error('getDataFromPersistence null')

    return undefined
  }
}

const buildDirectoryUtil = async (directories: IDirectory[]) => {
  for (const directory of directories) {
    const persistDirectories = await getDirectoriesById(directory.id)
    if (persistDirectories) {
      // TODO: feature buildDirectoryUtil-update
    } else {
      // buildDirectoryUtil-add
      await boterCodeDb.directories.add({
        id: directory.id,
        title: directory.title,
        shortid: directory.shortid,
        source_id: directory.source_id,
        directory_shortid: directory.directory_shortid,
        inserted_at: directory.inserted_at,
        updated_at: directory.updated_at,
      });
    }
  }
}

const buildModuleUtil = async (modules: IModule[]) => {
  for (const module of modules) {
    const persistModules = await getModuleById(module.id)
    if (persistModules) {
      // feature: buildModuleUtil-update
      // console.log('%c=buildModuleUtil-update','color:green')
      await boterCodeDb.modules.update(module.id, {
        code: module.code,
        is_binary: module.is_binary,
        title: module.title,
        shortid: module.shortid,
        source_id: module.source_id,
        directory_shortid: module.directory_shortid,
        inserted_at: module.inserted_at,
        updated_at: module.updated_at,
      });
    } else {
      // buildModuleUtil-add
      // console.log('%c=buildModuleUtil-add','color:green',)
      await boterCodeDb.modules.add({
        code: module.code,
        id: module.id,
        is_binary: module.is_binary,
        title: module.title,
        shortid: module.shortid,
        source_id: module.source_id,
        directory_shortid: module.directory_shortid,
        inserted_at: module.inserted_at,
        updated_at: module.updated_at,
      });
    }
  }
}

interface IBoterEditor {
  editerType: EditorSource,
  codeId?: string
}

export const BoterEditor = ({ editerType, codeId }: IBoterEditor) => {
  const [rootDir, setRootDir] = useState(dummyDir);
  const [selectedFile, setSelectedFile] = useState<CodeFile | undefined>(undefined)
  const githubRepos = useAppSelector(githubReposState)

  const initCallback = useCallback((rootDir: Directory) => {
    if (!selectedFile) {
      setSelectedFile(findFileByName(rootDir, "index.tsx"));
    }

    setRootDir(rootDir);
  }, []);

  const buildFileUtil = useCallback(async (source_id: string, data: GithubRepository) => {
    const repositories = await getRepositoriesBySourceId(source_id)
    if (repositories.length) {
      buildDirectoryUtil(data.directories as any[])
      buildModuleUtil(data.modules as any)
    } else {
      addRepository({
        source_id: data.source_id,
        authorId: data.authorId,
        title: data.title,
        entry: data.entry,
        template: data.template,
        updated_at: data.updated_at
      })
    }

    const rootDir = buildFileTree(data);
    initCallback(rootDir);
  }, []);

  useEffect(() => {
    console.log('editor source_id test 1:', { githubRepos })
    if (githubRepos) {
      buildFileUtil(githubRepos.source_id, githubRepos)
    }
  }, [githubRepos])

  const onSelectFile = (file: CodeFile) => {
    console.log('%c=onSelect', 'color:yellow', file)
    setSelectedFile(file)
  };

  const onEditorChange = async (codeFile: CodeFile) => {
    console.log('%c=onEditorChange', 'color:red', { codeFile, selectedFile })
    if (codeFile?.code_id) {
      // const res = await boterCodeDb.modules.where('id').equals(codeFile.code_id)
      // await boterCodeDb.modules.update(id:codeFile.code_id, );
      await boterCodeDb.modules.update(codeFile.code_id, { code: codeFile.content });
    } else {
      console.error('onChange error')
    }
  }

  const codes = useMemo<any>(() => {

    return parseCodesToFilePath({
      dirs: rootDir.dirs, files: rootDir.files,
    })
  }, [rootDir])

  const fetchCodeByStg = async (stgId: string) => {
    const res = await getCodeByStgId(stgId)
    if (res.code === SUCCESS) {
      const data = res.data

      setSelectedFile({
        content: data.strategyCode,
        code_id: data.id,
        id: data.strategyId,
        type: Type.FILE,
        name: 'strategy',
        parentId: undefined,
        depth: 1,
      })

      buildModuleUtil([{
        code: data.strategyCode,
        id: data.id,
        is_binary: false,
        title: 'strategy',
        shortid: "",
        source_id: data.strategyId,
        directory_shortid: null,
        inserted_at: data.updatedAt as unknown as string,
        updated_at: data.createdAt as unknown as string
      }])
    } else {
      alert('fetchCodeByStg error')
    }
  }

  useEffect(() => {
    /* mock
    let source_id = mock_source_id
    const fetchData = async () => {
      try {
        const rootDir = await getDataFromPersistence(source_id);

        console.log('editor source_id:', { source_id, rootDir })

        if (rootDir && rootDir.files.length) {
          initCallback(rootDir);
        } else {
          // TODO: mock dev
          let dataSource = mock_24d8ff
          if (!dataSource) {
            dataSource = await fetchSandboxesData(CURRENT_SANDBOX_ID)
          }

          const mockSource_id = dataSource.source_id
          buildFileUtil(mockSource_id, dataSource)
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    */

    if (editerType === EditorSource.server && codeId) {
      fetchCodeByStg(codeId)
    }

    console.log('%c=useEffect init', 'color: blue', {
      codeId,
      codes,
    })
  }, [])

  console.log('%c=boter-editer-render', 'color:red', {
    // bundlerUrl,
    rootDir,
    selectedFile
  })

  return <Box sx={{
    height: '100vh',
    width: '100vw',
    background: 'grey'
  }}
  >
    <EditorMenubar id={codeId as string} />
    <Box sx={{
      display: 'flex',
      height: 'calc(100vh - 40px)',
      width: '100%',
    }}>
      <Sidebar>
        <Github />

        <FileTree
          rootDir={rootDir}
          selectedFile={selectedFile}
          onSelect={onSelectFile}
        />
      </Sidebar>

      <Editor codeFile={selectedFile as CodeFile} defaultValue={'hello'} language={'jsLang'} onChange={onEditorChange} />
      {isEmptyObject(codes) && <CodeRenderer files={codes} bundlerURL={bundlerUrl} />}
    </Box>
  </Box>
}
