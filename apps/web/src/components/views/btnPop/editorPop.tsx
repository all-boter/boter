import { Root, Trigger, Portal, Arrow } from '@radix-ui/react-popover';
import { CloseBtn, TriggerBtn } from '@/components/basics/button/triggerBtn';
import { Box } from '@mui/system';
import { mainTheme } from '@/components/basics/mainColor';
import { IBotOperate, IJsonValue, SUCCESS } from '@/common/constants';
import { runTempBot } from '@/services/botApi';
import { useContext } from 'react';
import { ToastContext, ToastType } from '@/components/basics/toast/toastContext';
import { sleep } from '@/common';
import { useDispatch } from "react-redux";
import { AppDispatch } from '@/store';
import { editorSlice } from '@/store/editorSlice';
import { StyledPopoverContent } from '../bots/botBtnPop';
import { useTranslation } from 'react-i18next';

interface IEditorPop {
  stgId: string
  runnerId: string
  children: React.ReactNode
  type: IBotOperate
  schema: IJsonValue[],
}

export const EditorPop = ({ children, type, stgId, schema, runnerId }: IEditorPop) => {
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext)!;
  const dispatch: AppDispatch = useDispatch();

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
        showToast(t('runStgTips'), { type: ToastType.info, duration: 2000 })
        return
      }

      const res = await runTempBot({ stgId, runnerId, type, params })
      if (res.code === SUCCESS) {
        showToast(`Test Bot: ${res.msg}`, { type: ToastType.success, duration: 2000 })

        sleep(1000)

        dispatch(editorSlice.actions.setRunBotSuccess(true))
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
      <StyledPopoverContent sideOffset={5}>
        <Box sx={{
          fontWeight: 700,
          fontSize: '14px',
          color: '#FFF'
        }}>
          {t('stgBtnTips', { type: { type: t(type) } })}
        </Box>
        <Box sx={{
          display: 'flex',
          boxSizing: 'border-box',
          justifyContent: 'space-between',
          width: '100%',
          px: '20px',
          mt: '10px',
        }}>
          <CloseBtn padding='2px 10px' aria-label="Close" bg={mainTheme[100]} width='auto'>
            {t('cancel')}
          </CloseBtn>

          <CloseBtn padding='2px 10px' aria-label="Close" onClick={() => onOperate()} bg={mainTheme[102]} width='auto'>
            {t('confirm')}
          </CloseBtn>
        </Box>

        <Arrow fill={mainTheme[106]} />
      </StyledPopoverContent>
    </Portal>
  </Root>
}