import { Bot, StopBotEnum } from "@/services/stgApi"
import { Box, styled } from "@mui/system"
import { BotBtnPop } from "./botBtnPop"
import { Button } from "@/components/basics/button"
import { muiGreen } from "@/components/basics/muiColor"
import { ConfirmStop } from "../modal/confirmStop"
import { useState } from "react"
import { BotStatus } from "@/common/constants"
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

  const onEditerCode = (bot: Bot) => {
    console.log('onEditerCode', bot)
    navigate(`/editor/server/${bot.id}`);
  }

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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: '20px' }}>
            <Box sx={{ width: '32px', height: '32px', background: '#4b5563', borderRadius: '50%' }}></Box>

            <Box sx={{ pl: '6px' }}>
              <Box sx={{ fontSize: '18px', fontWeight: 700, color: '#f3f4f6' }}>{item.name}</Box>
              <Box component={'span'} sx={{ color: '#9ca3af' }}>
                {item.status}
              </Box>
            </Box>

            <StyledButton onClick={() => onEditerCode(item)} color={'#fff1f1'} bg={muiGreen.seaFoam} size={'small'}>Strategy code</StyledButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ color: '#f3f4f6' }}>interval: {item.params.interval}</Box>
            {item.status === BotStatus.Running && <Box>
              <BotBtnPop bot={item} callBack={btnPopCallback} />
            </Box>}
          </Box>
        </Box>
      ))
    }

    <ConfirmStop botId={selectBotId} isOpen={confirmStopOpen} handleClose={() => handleClose()} />
  </Box>
}