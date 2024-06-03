import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from "@mui/system"
import { useNavigate } from 'react-router-dom';
import { CreateStg } from '@/components/views/modal/createStg';
import { Sidebar } from '@/components/views/Sidebar';
import { appSlice, fetchStrategies } from '@/store/appSlice';
import { AppDispatch } from '@/store';
import { SUCCESS } from '@/common/constants';
import { authVerifyApi } from '@/services/userApi';
import { StgList } from '@/components/views/stgList';
import { createRunner } from '@/services/stgApi';

import { Button } from '@/components/basics/button';
import { Input } from '@/components/basics/input';
import ButtonOrgin from '@/components/basics/button/btnOrgin';

export const Dashbord = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenCreateStg, openCreateStg] = useState(false);

  const authVerifyUtil = async () => {
    const res = await authVerifyApi()
    if (res.code === SUCCESS) {
      dispatch(appSlice.actions.addUser(res.data))
    } else {
      console.error(res.msg)
    }
  }

  const onAuthVerify = () => {
    authVerifyUtil()
  }

  const onEditor = () => {
    navigate('/editor/github');
  }

  const onCreateStg = () => {
    openCreateStg(true)
  }

  const handleClose = () => {
    openCreateStg(false)
    dispatch(fetchStrategies());
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

  return <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', width: '100%', background: '#1e293b' }}>
    <Sidebar />

    <Box sx={{ width: '85%', mx: '20px', mt: '20px' }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ fontWeight: '700', fontSize: '20px' }}>
          <Box component={'span'} sx={{ mr: '10px', color: '#FFF' }}>
            My strategies
          </Box>

          <Button onClick={() => onCreateStg()}>Create strategy</Button>
        </Box>

        <Box sx={{ mt: '18px' }}>
          <button onClick={onAuthVerify}>auth verify</button>

          <button onClick={onEditor}>editor</button>

          <button onClick={onCreateRunner}>create runner</button>

          <ButtonOrgin>hello</ButtonOrgin>
          <Input />
        </Box>
      </Box>

      <StgList />
    </Box>

    <CreateStg isOpen={isOpenCreateStg} handleClose={() => handleClose()} />
  </Box>
}