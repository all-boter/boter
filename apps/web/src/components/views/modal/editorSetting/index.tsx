import { getGithubToken } from '@/services/userApi';
import { githubAppName, githubAuthUrl } from '@/common/constants';
import { Modal, ModalContent } from '@/components/basics/modal';
interface IModal {
  isOpen: boolean
  handleOpen?: () => void
  handleClose: () => void
  uid: string
}

export const EditorSetting = (props: IModal) => {
  const { uid } = props

  const onGetGithubOauth = async () => {
    if (uid) {
      // eslint-disable-next-line no-restricted-globals
      location.href = `${githubAuthUrl}&state=${uid}`
    }
  }

  const onInstallGithubApp = () => {
    // eslint-disable-next-line no-restricted-globals
    location.href = `https://github.com/apps/${githubAppName}/installations/new?state=${uid}`
  }

  const onRefreshGithubApp = async () => {
    const res = await getGithubToken(uid)
    console.log('%c=onRefreshGithubApp', 'color:red', res)
  }

  return <Modal {...props}>
    <ModalContent sx={{ width: 400 }}>
      {/* 
        <h2 id="unstyled-modal-title" className="modal-title">
          Text in a modal
        </h2>
        <p id="unstyled-modal-description" className="modal-description">
          Aliquid amet deserunt earum!
        </p>
      */}
      <button onClick={() => onGetGithubOauth()}>Connect Github</button>
      <button onClick={() => onRefreshGithubApp()}>Refresh Github App</button>
      <button onClick={() => onInstallGithubApp()}>Install Github App</button>
    </ModalContent>
  </Modal>
}
