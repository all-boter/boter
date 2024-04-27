import { Octokit } from 'octokit'
import { Repository } from './userApi'
import { nanoid } from 'nanoid'
import { IDirectory, IModule } from '@/package/boter-editor/boter-db'
import { FAIL, SUCCESS } from '@/common/constants'
import { mockTreeContainCode_penx } from '@/common/mock/mock-penx-101-tree-contain-code'

interface SharedParams {
  owner: string
  repo: string
  headers: {
    'X-GitHub-Api-Version': string
  }
}

interface ResposInfo {
  source_id: string
  authorId: string
  title: string
}

export interface GitHubTree {
  path: string;
  mode: string;
  type: 'blob' | 'tree';
  sha: string;
  size: number;
  url: string;
  name: string;
  content: string;
  // Not returned by github, designed for the file system
  shortid: string;
  directory_shortid: string | null
}

interface GitHubBlob {
  sha: string;
  node_id: string;
  size: number;
  url: string;
  content: string;
  encoding: string;
}

export interface GithubRepository {
  source_id: string
  authorId: string
  title: string
  entry: string
  template: string
  updated_at: string
  directories: IDirectory[]
  modules: IModule[]
}

export class GithubService {
  private app: Octokit
  private params: SharedParams
  private resposInfo: ResposInfo

  constructor(token: string, repository: Repository) {
    this.app = new Octokit({ auth: token })



    this.params = {
      owner: repository.owner.login,
      repo: repository.name,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }

    this.resposInfo = {
      source_id: repository.id.toString(),
      authorId: repository.owner.id.toString(),
      title: repository.name
    }
  }

  static async init(
    token: string,
    repository: Repository
  ) {
    const server = new GithubService(token, repository)

    return server
  }

  async pull() {
    try {
      const res = await this.app.request(
        'GET /repos/{owner}/{repo}/contents/{path}',
        {
          owner: this.params.owner,
          repo: this.params.repo,
          ref: 'main',
          path: '',
          headers: this.params.headers
        },
      )

      return { data: res, code: SUCCESS }
    } catch (error) {
      return { data: null, code: FAIL }
    }
  }

  private async getFileBlob(file_sha: string, mode: string): Promise<GitHubBlob | null> {
    try {
      const { data } = await this.app.request(
        'GET /repos/{owner}/{repo}/git/blobs/{file_sha}',
        {
          owner: this.params.owner,
          repo: this.params.repo,
          file_sha,
          mode,
          headers: this.params.headers
        },
      )

      return data as unknown as GitHubBlob
    } catch (error) {
      return null
    }
  }

  async getPagesTreeMock(): Promise<{ data: any, code: number }> {
    try {
      const pagesTree = await this.app.request(
        'GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1',
        {
          owner: this.params.owner,
          repo: this.params.repo,
          tree_sha: 'main',
          headers: this.params.headers
        },
      )

      const tree: GitHubTree[] = pagesTree.data.tree
      for (const treeItem of tree) {
        if (treeItem.type === 'blob') {
          const gitHubFile = await this.getFileBlob(treeItem.sha, treeItem.mode)
          if (gitHubFile) {
            treeItem.content = atob(gitHubFile?.content)
          }
        } else {
          treeItem.content = ""
        }

        treeItem.name = treeItem.path
      }

      console.log('%c=tree:', 'color:red', tree)

      return { data: tree, code: FAIL }
    } catch (error) {
      return { data: null, code: FAIL }
    }
  }

  async getPagesTree(): Promise<{ data: GithubRepository, code: number }> {
    try {
      /*
      const pagesTree = await this.app.request(
        'GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1',
        {
          owner: this.params.owner,
          repo: this.params.repo,
          tree_sha: 'main',
          headers: this.params.headers
        },
      )

      const tree: GitHubTree[] = pagesTree.data.tree
      */

      // TODO: MOCK test
      // const tree = mockTreeContainCode as GitHubTree[]
      const tree = mockTreeContainCode_penx as GitHubTree[]
      // end

      const regex = /\//;
      const folderMap = new Map<string, string>()

      tree.forEach(item => {
        const isInRootDir = regex.test(item.path)
        const shortId = nanoid(5)
        item.shortid = shortId
        if (item.type === 'tree') {
          item.directory_shortid = !isInRootDir ? null : ''
          if (!isInRootDir) {
            folderMap.set(item.path, shortId)
            console.log('%c=treeItem.path====>0-1', 'color:yellow', item.path)
          } else {
            folderMap.set(item.path, shortId)
            console.log('%c=treeItem.path====>0-2', 'color:pink', item.path)
          }
        } else {
          item.directory_shortid = !isInRootDir ? null : ''
        }
      })

      console.log('%c=folderMap', 'color:grey', folderMap)

      const directories: IDirectory[] = [];
      const modules: IModule[] = [];
      const date = new Date().toISOString()
      const source_id = this.resposInfo.source_id

      for (const treeItem of tree) {
        let directory_shortid: string | null = ''
        let title = ''

        if (treeItem.directory_shortid !== null) {
          const pathArr = treeItem.path.split('/')
          const removedPathArr = pathArr.pop();
          const parentPath = pathArr.join('/')
          directory_shortid = folderMap.get(parentPath) || 'error'
          console.log('%c=treeItem.path====>1', 'color:red', treeItem.path, { directory_shortid,removedPathArr,parentPath })
          title = removedPathArr as string
        } else {
          console.log('%c=treeItem.path====>2', 'color:green', treeItem.path, '--', treeItem.directory_shortid)
          title = treeItem.path
          directory_shortid = null
        }

        if (treeItem.type === 'blob') {
          // PROD
          // const gitHubFile = await this.getFileBlob(treeItem.sha, treeItem.mode)

          modules.push({
            // code: gitHubFile ? atob(gitHubFile?.content) : '',
            // TODO: mock test
            code: treeItem.content || '',
            // end
            id: treeItem.sha,
            is_binary: false,
            title,
            fullPath: treeItem.path,

            source_id,
            shortid: treeItem.shortid,
            directory_shortid: directory_shortid,

            inserted_at: '',
            updated_at: date
          });
        } else {
          directories.push({
            id: treeItem.sha,
            title,
            fullPath: treeItem.path,

            source_id,
            shortid: treeItem.shortid,
            // directory_shortid: treeItem.directory_shortid,
            directory_shortid: directory_shortid,

            inserted_at: '',
            updated_at: date
          });
        }
      }

      console.log('%c=tree:', 'color:red', tree)

      return {
        data: {
          source_id,
          authorId: this.resposInfo.authorId,
          title: this.resposInfo.title,
          entry: '',
          template: '',
          updated_at: date,
          directories,
          modules,
        }, code: SUCCESS
      }
    } catch (error) {
      return { data: null as unknown as any, code: FAIL }
    }
  }
}