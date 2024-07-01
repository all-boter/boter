import { Root, Trigger, Portal, Content, Arrow } from '@radix-ui/react-popover';
import { CloseBtn, TriggerBtn } from '@/components/basics/button/triggerBtn';
import { Box, styled } from '@mui/system';
import { mainTheme } from '@/components/basics/mainColor';
import { IBotOperate, SUCCESS } from '@/common/constants';
import { runTempBot } from '@/services/botApi';
import { useContext } from 'react';
import { ToastContext, ToastType } from '@/components/basics/toast/toastContext';
import { sleep } from '@/common';

const StyledContent = styled(Content)(`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 90px;
   border-radius: 6px;
    background: ${mainTheme[106]};
    padding: 0 10px;
`)

interface IEditorPop {
  stgId: string
  runnerId: string
  children: React.ReactNode
  type: IBotOperate
}

export const EditorPop = ({ children, type, stgId, runnerId }: IEditorPop) => {
  const { showToast } = useContext(ToastContext)!;

  const onOperate = async () => {
    if (type === 'restart') {

      await sleep(1500)
      runBotUtil(1)
    } else if (type === 'stop') {

      runBotUtil(2)
    } else if (type === 'run') {

      runBotUtil(1)
    }
  }

  const runBotUtil = async (type: 1 | 2) => {
    if (!runnerId) {
      showToast('Please select a runner in the settings', { type: ToastType.info, duration: 2000 })
      return
    }

    const res = await runTempBot(stgId, runnerId, type)
    if (res.code === SUCCESS) {
      showToast(`Ok:`, { type: ToastType.success, duration: 2000 })
    } else {
      showToast(`Error: ${res.msg}`, { type: ToastType.error, duration: 2000 })
    }
  }

  return <Root>
    <Trigger asChild>
      <TriggerBtn color={mainTheme[103]} bg={mainTheme[108]} size={'small'}>
        {children}
      </TriggerBtn>
    </Trigger>
    <Portal>
      <StyledContent sideOffset={5}>
        <Box sx={{
          fontWeight: 700,
          fontSize: '14px',
          color: '#FFF'
        }}> Are you sure to {type} this strategy?  </Box>
        <Box sx={{
          display: 'flex',
          boxSizing: 'border-box',
          justifyContent: 'space-between',
          width: '100%',
          px: '20px',
          mt: '10px',
        }}>
          <CloseBtn aria-label="Close" bg={mainTheme[100]} size='small'>
            Cancel
          </CloseBtn>

          <CloseBtn aria-label="Close" onClick={() => onOperate()} bg={mainTheme[102]} size='small'>
            Confirm
          </CloseBtn>
        </Box>

        <Arrow fill={mainTheme[106]} />
      </StyledContent>
    </Portal>
  </Root>
}