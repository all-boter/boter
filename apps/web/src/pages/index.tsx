import React from 'react';
import Box from '@mui/system/Box';
import { Logo } from '@/components/views/logo';
import { HomeBtns } from '@/components/views/homeBtns';
import { useTranslation } from 'react-i18next';
import { I18n } from '@/components/views/userMenu';

function App() {
  const { t } = useTranslation();

  return (
    <Box sx={{ bgcolor: '#111827', height: '100%' }}>
      <Box>
        <Box component={'nav'} className='y-center' sx={{ height: '68px', pl: 1, justifyContent: 'space-between', color: '#FFF' }}>
          <Logo />
          <Box sx={{mr: '20px'}}>
            <I18n />
          </Box>
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
          }}>
            {t('slogan1')}
          </Box>
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
          }}>
            {t('slogan2')}
          </Box>

          <Box sx={{ width: '70%', textAlign: 'center', fontSize: '22px', color: '#d1d5db' }}>
            {t('slogan3')}
          </Box>
          <Box sx={{ display: 'flex', mt: '60px' }}>
            <HomeBtns />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
