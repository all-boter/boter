import React from 'react';
import Box from '@mui/system/Box';
import logo from "../assets/logo.svg"
import { HomeBtns } from '../components/views/homeBtns';

function App() {

  return (
    <Box sx={{ bgcolor: '#111827', height: '100%' }}>
      <Box>
        <Box component={'nav'} sx={{ display: 'flex', alignItems: 'center', height: '68px', pl: 1, color: '#f3f4f6', fontSize: 24 }}>
          <Box component={'img'} src={logo} sx={{ width: 28, height: 28, pr: '2px' }} />
          Boter
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '70vh' }}>
          <Box sx={{
            fontSize: {
              mobile: '48px',
              desktop: '100px'
            },
            mt: '40px',
            backgroundImage: 'linear-gradient(to right, #22c55e, #3b82f6)',
            color: 'transparent',
            backgroundClip: 'text',
            fontWeight: 900
          }
          }>Discover / build</Box>
          <Box sx={{
            fontSize: {
              mobile: '48px',
              desktop: '100px'
            },
            mb: '40px',
            backgroundImage: 'linear-gradient(to right, #3b82f6, #a855f7)',
            color: 'transparent',
            backgroundClip: 'text',
            fontWeight: 900
          }}>Interesting Bots</Box>

          <Box sx={{ width: '60%', textAlign: 'center', fontSize: '20px', color: '#d1d5db' }}>Boter is a Bot as a service platform, Your can discover some interesting bot, or build your own bot with our tools</Box>

          <Box sx={{ display: 'flex', mt: '60px' }}>
            <HomeBtns />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
