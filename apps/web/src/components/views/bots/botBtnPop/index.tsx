import { Root, Trigger, Portal, Content, Arrow } from '@radix-ui/react-popover';
import { CloseBtn, TriggerBtn } from '@/components/basics/button/triggerBtn';
import { Box, styled } from '@mui/system';
import { mainTheme } from '@/components/basics/mainColor';
import { Bot, IRunBot, BotHandleEnum, runBot, stopBot } from '@/services/stgApi';
import { BotStatus, SUCCESS } from '@/common/constants';
import { CSSProperties, useContext } from 'react';
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

interface IBotBtnPop {
  bot: Bot
  type: 'Stop' | 'Restart' | 'Run'
  customStyle?: CSSProperties;
  callBack: (botId: string, type: BotHandleEnum, botStatus?: BotStatus) => void
}

export const BotBtnPop = ({ type, bot, customStyle, callBack }: IBotBtnPop) => {
  const { showToast } = useContext(ToastContext)!;

  const onOperat = async () => {
    if (bot.status === BotStatus.Running) {

      stopBotUtil(bot.id)
    } else if (bot.status === BotStatus.Stopped) {

      runBotUtil({
        botId: bot.id,
        runnerId: bot.params.runnerId,
        bot: null,
        isRestart: false
      }, BotStatus.Stopped)
    } else if (bot.status === BotStatus.Offline) {
      if (type === 'Restart') {

        restartBotUtil(bot)
      } else if (type === 'Stop') {

        stopBotUtil(bot.id)
      } else if (type === 'Run') {

        runBotUtil({
          botId: bot.id,
          runnerId: bot.params.runnerId,
          bot: null,
          isRestart: false
        })
      }
    }
  }

  const stopBotUtil = async (botId: string, type = BotHandleEnum.normal) => {
    const res = await stopBot(botId, type)
    if (res.code === SUCCESS) {
      callBack(botId, type)
      showToast(`Stop ${bot?.name} bot ok`, { type: ToastType.success, duration: 2000 })
    } else {
      callBack(botId, BotHandleEnum.forceStop)
    }
  }

  const restartBotUtil = async (bot: Bot) => {
    if (bot.status === BotStatus.Offline) {

      runBotUtil({
        botId: bot.id,
        runnerId: bot.params.runnerId,
        bot: null,
        isRestart: true
      })
    } else if (bot.status === BotStatus.Running) {

      const res = await stopBot(bot.id, BotHandleEnum.normal)
      if (res.code === SUCCESS) {
        await sleep(1000)
        runBotUtil({
          botId: bot.id,
          runnerId: bot.params.runnerId,
          bot: null,
          isRestart: true
        })
      } else {
        showToast(`stopBot ${bot?.name} bot error: ${res.msg}`, { type: ToastType.error, duration: 2000 })
      }
    } else {
      alert('error')
    }
  }

  const runBotUtil = async (runBotDto: IRunBot, botStatus = BotStatus.Running) => {
    const res = await runBot(runBotDto)
    if (res.code === SUCCESS) {
      showToast(`${bot?.name}: ${res.msg}`, { type: ToastType.success, duration: 2000 })
      await sleep(1000)
      callBack(bot.id, BotHandleEnum.normal, botStatus)
    } else {
      showToast(`${bot?.name} error: ${res.msg}`, { type: ToastType.error, duration: 2000 })
    }
  }

  return <Root>
    <Trigger asChild>
      <TriggerBtn customStyle={customStyle} color={mainTheme[103]} bg={mainTheme[106]} size={'small'}>
        {type}
      </TriggerBtn>
    </Trigger>
    <Portal>
      <StyledContent sideOffset={5}>
        <Box sx={{
          fontWeight: 700,
          fontSize: '14px',
          color: '#FFF'
        }}>
          Are you sure to &nbsp;{type}&nbsp;this strategy?
        </Box>
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

          <CloseBtn aria-label="Close" onClick={() => onOperat()} bg={mainTheme[102]} size='small'>
            Confirm
          </CloseBtn>
        </Box>

        <Arrow fill={mainTheme[106]} />
      </StyledContent>
    </Portal>
  </Root>
}