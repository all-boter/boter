import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from "@mui/system"
import { CreateStg } from '@/components/views/modal/createStg';
import { Sidebar } from '@/components/views/Sidebar';
import { fetchStrategies } from '@/store/appSlice';
import { AppDispatch, socketConnectStatusState, useAppSelector } from '@/store';
import { StgList } from '@/components/views/stgList';
import { Button } from '@/components/basics/button';
import { mainTheme } from '@/components/basics/mainColor';
import { DrawerProvider } from '@/components/basics/drawer/drawerContext';

export const Dashbord = () => {
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


  return <div className="page-box">
    <Sidebar />

    <Box sx={{
      width: '85%',
      mx: '20px',
      mt: '20px',
      flexGrow: 1
    }}>
      <Box sx={{ width: '100%', mb: '20px' }}>
        <Box sx={{ fontWeight: '700', fontSize: '20px' }}>
          <Box component={'span'} sx={{ mr: '10px', color: mainTheme.white }}>
            My strategies
          </Box>

          <Button onClick={() => onCreateStg()} padding='6px 8px'>Create strategy</Button>

          <Box sx={{
            color: socketConnectStatus?.type === 8 ? 'green' : 'red'
          }}>Network: {socketConnectStatus?.msg}</Box>
        </Box>
      </Box>

      <DrawerProvider>
        <StgList />
      </DrawerProvider>
    </Box>

    <CreateStg isOpen={isOpenCreateStg} handleClose={() => handleClose()} />
  </div>
}
