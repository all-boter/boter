import { useEffect, useState } from 'react';
import store, { useAppSelector, userState } from '../../../../store';
import { SUCCESS } from "../../../../common/constants"
import { IGithubInstallation, Repository, getRepos, getGithubInsByuid } from '../../../../services/userApi';
import { GitHubTree, GithubService } from '../../../../services/githubService';
import { Settings } from 'lucide-react'
import { EditorSetting } from '../../../../components/views/modal/editorSetting';
import { penx_mock } from '../../../../common/mock/mockTree';
import { mockRespos1 } from '../../../../common/mock/mock-respos';
import { appActions } from '../../../../store/appSlice';
import { Select } from '@/components/basics/select';

export const Github = () => {
  const user = useAppSelector(userState)
  const [installations, setInstallations] = useState<IGithubInstallation[]>([])
  const [repos, setRepos] = useState<Repository[]>([])
  const [repository, selectRepository] = useState<Repository | null>(null);
  const [githubToken, setGithubToken] = useState<string>('')

  const [settingOpen, setSettingOpen] = useState(false);

  /*
  const onPagesTree = async () => {
    if (githubToken && repository) {
      // const githubServer = await GithubService.init(githubToken, repository)
      // const res = await githubServer.getPagesTree()
      const res = await downloadZip({
        token:githubToken,
        repo: repository.name,
        owner: repository.owner.login
      })
      if (res.code === SUCCESS) {
        console.log('%c=onPagesTree-res', 'color:red', res.data)
      }
    } else if (!githubToken) {
      alert('token error')
    } else if (!repository) {
      alert('select repos')
    }
  }
  */

  const onOnPull = async () => {
    if (githubToken && repository) {
      const githubServer = await GithubService.init(githubToken, repository)
      const res = await githubServer.getPagesTree()
      if (res.code === SUCCESS) {
        store.dispatch(appActions.addGithubRepository(res.data))
      } else {
        console.error('onOnPull err')
      }
    } else if (!githubToken) {
      alert('token error')
    } else if (!repository) {
      alert('select repos')
    }
  }

  const onSetting = () => {
    console.log('onSetting-test')
    // const GithubService.init()
    setSettingOpen(true)
  }

  const onGetRepos = async (installationId: number) => {
    if (installationId) {
      const res = await getRepos(installationId)
      if (res.code === SUCCESS) {
        setRepos(res.data.repos)
        setGithubToken(res.data.token)
      }
    } else {
      console.error('onGetRepos-error,installationId cannot be verified')
    }
  }

  useEffect(() => {
    getGithubInsByuid().then((res) => {
      if (res.code === SUCCESS) {
        setInstallations(res.data)
        const installationId = res.data[0]?.installationId
        onGetRepos(installationId)
        // TODO: mock
        // setRepos(mockRespos1.repos)
        // setGithubToken(mockRespos1.token)
        // end
      }
    })
  }, [user.id])

  const onChangeSelect = (_e: any, val: Repository) => {
    selectRepository(val)
  }

  const onCompileForEditor = () => {
    console.log('onCompileForEditor', penx_mock, {})
  }

  return <div>
    {/* <button onClick={() => onGetRepos(installations[0]?.installationId)}>Get Repos</button> */}
    {/* <button onClick={() => onPagesTree()}>pages Tree</button> */}
    <button onClick={() => onOnPull()}>On Pull</button>

    <button onClick={() => onCompileForEditor()}>Compile For Editor</button>

    <Settings size={20} onClick={() => onSetting()} style={{ cursor: 'pointer' }} />

    <Select onChange={onChangeSelect} options={repos} value={repository} label='name' id='id' />

    <EditorSetting uid={user.id} isOpen={settingOpen} handleClose={() => setSettingOpen(false)} />
  </div>
}