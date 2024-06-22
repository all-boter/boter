import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from "@mui/system"
import { CreateStg } from '@/components/views/modal/createStg';
import { Sidebar } from '@/components/views/Sidebar';
import { fetchStrategies } from '@/store/appSlice';
import { AppDispatch, socketConnectStatusState, useAppSelector } from '@/store';
import { StgList } from '@/components/views/stgList';
import { Button } from '@/components/basics/button';
import { mainTheme } from '@/components/basics/muiColor';
import { SocketConnector } from '@/common/socketConnector';

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

  const handleConnection = () => {
    const socket = SocketConnector.getInstance()
    if (socket) {
      socket.emitQuerySocket()
    }
  }

  const handleConnection2 = () => {
    const socket = SocketConnector.getInstance()
    if (socket) {
      // socket.emitBotRunStatus()
      socket.emitTimeoutBotRunStatus()
    }
  }

  // TODO: Just for testing
  /**
  const onAuthVerify = async() => {
    const res = await authVerifyApi()
    if (res.code === SUCCESS) {
      dispatch(appSlice.actions.addUser(res.data))
    } else {
      console.error(res.msg)
    }
  }
  const onCreateRunner = async () => {
    const res = await createRunner({
      name: 'test',
      token: 'test',
      machineHash: '123.00.7',
      machineIp: '123.00.7'
    })
    if (res.code === SUCCESS) {
      console.log('%c=onCreateRunner', 'color:red', res)
    } else {
      console.error(res.msg)
    }
  }
  */

  return <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', width: '100%', background: '#1e293b' }}>
    <Sidebar />

    <Box sx={{ width: '85%', mx: '20px', mt: '20px' }}>
      <Box sx={{ width: '100%', mb: '20px' }}>
        <Box sx={{ fontWeight: '700', fontSize: '20px' }}>
          <Box component={'span'} sx={{ mr: '10px', color: mainTheme.white }}>
            My strategies
          </Box>
          <button onClick={() => handleConnection()}>query-socket</button>
          <button onClick={() => handleConnection2()}>test</button>
          <Button onClick={() => onCreateStg()}>Create strategy</Button>

          <Box sx={{
            color: socketConnectStatus?.type === 8 ? 'green' : 'red'
          }}>Network: {socketConnectStatus?.msg}</Box>
        </Box>

        {/* <Box sx={{ mt: '18px' }}>
          <button onClick={onAuthVerify}>auth verify</button>
          <button onClick={onCreateRunner}>create runner</button>
        </Box> */}
      </Box>

      <StgList />
    </Box>

    <CreateStg isOpen={isOpenCreateStg} handleClose={() => handleClose()} />
  </Box>
}
