import { Bot } from "@/services/stgApi"
import { Box } from "@mui/system"

interface Props {
  bot: Bot
}

export const Sidebar = ({bot}:Props)=>{

  return <Box sx={{
    display: 'block',
    minWidth: '360px',
    width: '360px',
    overflowY: 'auto',
    borderRight: '2px solid',
    borderColor: '#242424',
    paddingTop: '3px',
    backgroundColor: 'grey',
    color: 'white',
  }}>
    {bot?.name}
  </Box>
}