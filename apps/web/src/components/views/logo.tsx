import Box from '@mui/system/Box';
import logo from "../../assets/logo.svg"

export const Logo = () => {
  return <Box className='y-center' sx={{ pr: '2px', color: '#f3f4f6', fontSize: '24px' }}>
    <Box component={'img'} src={logo} sx={{ width: 28, height: 28,pr:'6px' }} />
    Boter
  </Box>
}