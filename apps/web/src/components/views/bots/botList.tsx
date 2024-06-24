import { Bot, StopBotEnum, stopBot } from "@/services/stgApi"
import { Box, styled } from "@mui/system"
import { BotBtnPop } from "./botBtnPop"
import { useState } from "react"
import { BotStatus, SUCCESS } from "@/common/constants"
import { Modal, ModalContent } from "@/components/basics/modal"
import { mainTheme, muiGreen } from "@/components/basics/mainColor"
import { Button } from "@/components/basics/button"
import { useNavigate } from "react-router-dom"

interface IBotList {
  bots: Bot[]
  refreshList: (botStatus: BotStatus) => void
}

const StyledButton = styled(Button)(`margin-left: 6px;`)

export const BotList = ({ bots, refreshList }: IBotList) => {
  const [confirmStopOpen, setConfirmStopOpen] = useState(false);
  const [selectBotId, setSelectBotId] = useState<string>('');
  const navigate = useNavigate();

  const btnPopCallback = (type: StopBotEnum, botId: string) => {
    if (type === StopBotEnum.forceStop) {
      botId && setConfirmStopOpen(true)
      setSelectBotId(botId)
    } else {
      refreshList(BotStatus.Running)
    }
  }

  const handleClose = () => {
    setConfirmStopOpen(false)
    refreshList(BotStatus.Running)
  }

  const onForceStop = async () => {
    const res = await stopBot(selectBotId, StopBotEnum.forceStop)
    if (res.code === SUCCESS) {
      handleClose()
    } else {
      alert(res.msg)
    }
  }

  const onDetail = (bot: Bot) => {
    console.log('%c=onDetail', 'color:red', bot)
    navigate(`/bot/${bot.id}`);
  }

  const onStg = (strategyId: string) => {
    navigate(`/editor/server/${strategyId}`);
  }

  return <Box sx={{
    display: 'grid',
    width: '100%',
    gridGap: '20px',
    gridTemplateColumns: {
      mobile: 'repeat(1, minmax(0px, 1fr))',
      tablet: 'repeat(1, minmax(0px, 1fr))',
      md: 'repeat(2, minmax(0px, 1fr))',
      desktop: 'repeat(3, minmax(0px, 1fr))',
      xl: 'repeat(4, minmax(0px, 1fr))'
    },
  }}>
    {
      bots && bots.map((item) => (
        <Box key={item.id} sx={{
          height: '100px',
          borderRadius: '4px',
          p: '20px',
          background: '#334155'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '20px' }}>

            <Box sx={{ pl: '6px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ fontSize: '20px', fontWeight: 700, color: mainTheme.white }}>{item.name}</Box>
                <Box onClick={() => onStg(item.strategyId)} sx={{
                  fontSize: '12px',
                  ml: '10px',
                  cursor: 'pointer',
                  color: mainTheme[103],
                  '&:hover': {
                    color: mainTheme.golden
                  }
                }}>
                  Strategy: {item.stgName}
                </Box>
              </Box>

              <Box component={'span'} sx={{
                color: item.status === BotStatus.Offline ? 'red' :
                  item.status === BotStatus.Running ? 'green' :
                    '#9ca3af',
              }}>
                {item.status}
              </Box>
            </Box>

            <StyledButton onClick={() => onDetail(item)} color={'#fff1f1'} bg={muiGreen.seaFoam} size={'small'}>detail</StyledButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ color: mainTheme.white }}>interval: {item.params.interval}</Box>
            <Box>
              {item.status === BotStatus.Offline || item.status === BotStatus.Stopped  ? <BotBtnPop type='Restart' bot={item} callBack={btnPopCallback} /> : null}
              {item.status === BotStatus.Offline ? <BotBtnPop customStyle={{ marginLeft: '10px' }} type='Stop' bot={item} callBack={btnPopCallback} /> : null}
              {item.status === BotStatus.Running ? <BotBtnPop type='Stop' bot={item} callBack={btnPopCallback} /> : null}
            </Box>
          </Box>
        </Box>
      ))
    }

    <Modal isOpen={confirmStopOpen} handleClose={() => handleClose()}>
      <ModalContent sx={{ width: 400 }}>
        <button onClick={() => onForceStop()}>Force Stop Bot</button>
      </ModalContent>
    </Modal>
  </Box>
}