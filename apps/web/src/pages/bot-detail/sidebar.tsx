import { Box } from "@mui/system"

export const Sidebar = ()=>{

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
    Sidebar
  </Box>
}