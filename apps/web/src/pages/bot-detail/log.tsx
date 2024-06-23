import { Box } from "@mui/system"

interface Props{
  botId: string
}

export const BotLog = ({botId}:Props)=>{

  return <Box sx={{
    flexGrow: 1,
    background: '#111827'
  }}>
    { botId }
  </Box>
}