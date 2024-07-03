import { Root, Trigger, Portal, Content, Arrow } from '@radix-ui/react-popover';
import { CloseBtn, TriggerBtn } from '@/components/basics/button/triggerBtn';
import { Box, styled } from '@mui/system';
import { mainTheme } from '@/components/basics/mainColor';
import { IBotOperate, SUCCESS } from '@/common/constants';
import { runTempBot } from '@/services/botApi';
import { useContext } from 'react';
import { ToastContext, ToastType } from '@/components/basics/toast/toastContext';
import { sleep } from '@/common';
import { IJsonValue } from '@/services/stgApi';

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
  schema: IJsonValue[],
}

export const EditorPop = ({ children, type, stgId, schema, runnerId }: IEditorPop) => {
  const { showToast } = useContext(ToastContext)!;

  const onOperate = async () => {
    if (type === 'restart') {

      runBotUtil(2)
      await sleep(2000)
      runBotUtil(1)
    } else if (type === 'stop') {

      runBotUtil(2)
    } else if (type === 'run') {

      runBotUtil(1)
    }
  }

  const runBotUtil = async (type: 1 | 2) => {
    try {
      const params = schema.reduce((acc: any, item: any) => {
        acc[item.id] = item.value;
        return acc;
      }, {});

      if (!runnerId) {
        showToast('Please select a runner in the settings', { type: ToastType.info, duration: 2000 })
        return
      }

      const res = await runTempBot({ stgId, runnerId, type, params })
      if (res.code === SUCCESS) {
        showToast(`Test Bot: ${res.msg}`, { type: ToastType.success, duration: 2000 })
      } else {
        showToast(`Test Bot Error: ${res.msg}`, { type: ToastType.error, duration: 2000 })
      }
    } catch (error) {
      showToast(`Error: ${error}`, { type: ToastType.error, duration: 2000 })
    }
  }

  return <Root>
    <Trigger asChild>
      <TriggerBtn padding='0px 0px' color={mainTheme[103]} bg={mainTheme[108]} width='auto'>
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
          <CloseBtn padding='10px 10px' aria-label="Close" bg={mainTheme[100]} width='auto'>
            Cancel
          </CloseBtn>

          <CloseBtn padding='2px 10px' aria-label="Close" onClick={() => onOperate()} bg={mainTheme[102]} width='auto'>
            Confirm
          </CloseBtn>
        </Box>

        <Arrow fill={mainTheme[106]} />
      </StyledContent>
    </Portal>
  </Root>
}