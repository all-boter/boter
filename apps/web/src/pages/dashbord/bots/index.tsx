import { Box } from "@mui/system"
import { Sidebar } from "../../../components/views/Sidebar"

export const Bots = () => {

  return <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', background: '#1e293b' }}>
    <Sidebar />

    <Box sx={{pl: '20px',pt: '20px'}}>
      Bots
    </Box>
  </Box>
}