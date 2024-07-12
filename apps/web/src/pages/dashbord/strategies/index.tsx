import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, styled } from "@mui/system"
import { CreateStg } from '@/components/views/modal/createStg';
import { fetchStrategies } from '@/store/appSlice';
import { AppDispatch, socketConnectStatusState, useAppSelector } from '@/store';
import { StgList } from '@/components/views/stgList';
import { Button } from '@/components/basics/button';
import { mainTheme } from '@/components/basics/mainColor';
import { DrawerProvider } from '@/components/basics/drawer/drawerContext';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/views/layout';

const styledButton = styled(Button)(`
  margin-right: 8px;
`)

export const Dashbord = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const [isOpenCreateStg, openCreateStg] = useState(false);
  const socketConnectStatus = useAppSelector(socketConnectStatusState)

  const onCreateStg = () => {
    openCreateStg(true)
  }

  const handleClose = () => {
    openCreateStg(false)
    dispatch(fetchStrategies());
  }

  return <Layout>
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      width: '100%',
      mb: '10px',
      fontWeight: '600',
      fontSize: '20px'
    }}>
      <Box component={'span'} sx={{ 
        minWidth: '80px',
        mr: '10px', 
        color: mainTheme.white }}>
        {t('myStg')}
      </Box>

      <Box component={styledButton} onClick={() => onCreateStg()} padding='6px 8px'>
        {t('createStg')}
      </Box>

      <Box sx={{
        flex: '1 1 auto',
        color: socketConnectStatus?.type === 8 ? 'green' : 'red'
      }}>
        Network: {socketConnectStatus?.msg}
      </Box>
    </Box>

    <DrawerProvider>
      <StgList />
    </DrawerProvider>

    <CreateStg isOpen={isOpenCreateStg} handleClose={() => handleClose()} />
  </Layout>
}
