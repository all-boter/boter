import Box from '@mui/system/Box';
import { mainTheme } from '../basics/muiColor';

export const Logo = () => {
  return <Box className='y-center' sx={{ pr: '2px', color: mainTheme.white, fontSize: '24px' }}>
    <Box component={'img'} src={'/logo.svg'} sx={{ width: 28, height: 28,pr:'6px' }} />
    Boter
  </Box>
}