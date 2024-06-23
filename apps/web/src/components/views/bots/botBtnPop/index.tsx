import { Root, Trigger, Portal, Content, Arrow } from '@radix-ui/react-popover';
import { CloseBtn, TriggerBtn } from '@/components/basics/button/triggerBtn';
import { Box, styled } from '@mui/system';
import { mainColor } from '@/components/basics/mainColor';
import { Bot, StopBotEnum, stopBot } from '@/services/stgApi';
import { BotStatus, SUCCESS } from '@/common/constants';

const StyledContent = styled(Content)(`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 90px;
   border-radius: 6px;
    background: ${mainColor[106]};
    padding: 0 10px;
`)

interface IBotBtnPop {
  bot: Bot
  callBack: (type: StopBotEnum, botId: string) => void
}

export const BotBtnPop = ({ bot, callBack }: IBotBtnPop) => {
  const onOperat = async () => {
    if (bot.status === BotStatus.Running) {
      const res = await stopBot(bot.id, StopBotEnum.normalStop)
      if (res.code === SUCCESS) {
        callBack(StopBotEnum.normalStop, bot.id)
      } else {
        callBack(StopBotEnum.forceStop, bot.id)
      }
    } else if (bot.status === BotStatus.Stopped) {
      console.log('on start',)
    }
  }

  const text = bot.status === BotStatus.Running ? 'Stop' : bot.status === BotStatus.Stopped ? 'Restart' : null

  return <Root>
    <Trigger asChild>
      <TriggerBtn color={mainColor[103]} bg={mainColor[106]} size={'small'}>
        {text}
      </TriggerBtn>
    </Trigger>
    <Portal>
      <StyledContent sideOffset={5}>
        <Box sx={{
          fontWeight: 700,
          fontSize: '14px',
          color: '#FFF'
        }}>
          Are you sure to &nbsp; {text} &nbsp;this strategy?
        </Box>
        <Box sx={{
          display: 'flex',
          boxSizing: 'border-box',
          justifyContent: 'space-between',
          width: '100%',
          px: '20px',
          mt: '10px',
        }}>
          <CloseBtn aria-label="Close" bg={mainColor[100]} size='small'>
            Cancel
          </CloseBtn>

          <CloseBtn aria-label="Close" onClick={() => onOperat()} bg={mainColor[102]} size='small'>
            Confirm
          </CloseBtn>
        </Box>

        <Arrow fill={mainColor[106]} />
      </StyledContent>
    </Portal>
  </Root>
}