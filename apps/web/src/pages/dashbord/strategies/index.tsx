import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from "@mui/system"
import { useNavigate } from 'react-router-dom';
import { CreateStg } from '@/components/views/modal/createStg';
import { Button } from '@/components/basics/button';
import { Sidebar } from '@/components/views/Sidebar';
import { InputOrgin } from '@/components/basics/inputOrgin';
import { Input } from '@/components/basics/input';
import ButtonOrgin from '@/components/basics/buttonOrgin';
import { appSlice } from '@/store/appSlice';
import { AppDispatch } from '@/store';
import { SUCCESS } from '@/common/constants';
import { authVerifyApi } from '@/services/userApi';

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
    navigate('/editor');
  }

  const onCreateStg =()=>{
    console.log('%c=onCreateStg','color:red')
    openCreateStg(true)
  }

  return <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', background: '#1e293b' }}>
    <Sidebar />

    <Box sx={{ pl: '20px', pt: '20px' }}>
      <Box sx={{fontWeight: '700',fontSize: '20px'}}>
        <Box component={'span'} sx={{ mr: '10px'}}>
          My strategies
        </Box>

        <Button onClick={()=>onCreateStg()}>Create strategy</Button>
      </Box>

      <Box sx={{ mt: '18px' }}>
        <button onClick={onAuthVerify}>auth verify</button>

        <button onClick={onEditor}>editor</button>

        <ButtonOrgin />
        <Input />
        <InputOrgin />
      </Box>
    </Box>

    <CreateStg isOpen={isOpenCreateStg} handleClose={() => openCreateStg(false)} />
  </Box>
}