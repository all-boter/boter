import { Root, Trigger, Portal, Content, Arrow } from '@radix-ui/react-popover';
import { CloseBtn, TriggerBtn } from '@/components/basics/button/triggerBtn';
import { Box, styled } from '@mui/system';
import { mainTheme } from '@/components/basics/mainColor';
import { Bot, StopBotEnum, stopBot } from '@/services/stgApi';
import { BotStatus, SUCCESS } from '@/common/constants';
import { CSSProperties } from 'react';

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
  type: 'Stop' | 'Restart' | 'Start'
  customStyle?: CSSProperties;
  callBack: (type: StopBotEnum, botId: string) => void
}

export const BotBtnPop = ({ type, bot, customStyle, callBack }: IBotBtnPop) => {
  const onOperat = async () => {
    if (bot.status === BotStatus.Running) {

      stopBotUtil(bot.id)
    } else if (bot.status === BotStatus.Stopped) {

      console.log('on start',)
      startBotUtil(bot.id)
    } else if (bot.status === BotStatus.Offline) {
      if (type === 'Restart' || type === 'Start') {

        console.log('on restart', bot.status)
        restartBotUtil(bot.id)
      } else if (type === 'Stop') {

        console.log('on Stop', bot.status)
        stopBotUtil(bot.id)
      }
    }
  }

  const stopBotUtil = async (botId: string, type = StopBotEnum.normalStop) => {
    const res = await stopBot(bot.id, type)
    if (res.code === SUCCESS) {
      callBack(type, bot.id)
    } else {
      callBack(StopBotEnum.forceStop, bot.id)
    }
  }

  const restartBotUtil = async (botId: string) => {
    // const res = await stopBot(bot.id)
    // if (res.code === SUCCESS) {

    // } else {

    // }
  }

  const startBotUtil = async (botId: string) => {
    // const res = await stopBot(bot.id)
    // if (res.code === SUCCESS) {

    // } else {

    // }
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