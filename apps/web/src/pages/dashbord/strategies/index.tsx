import { useDispatch } from 'react-redux';
import { Box } from "@mui/system"
import { AppDispatch } from '../../../store';
import { authVerifyApi } from "../../../services/userApi";
import { SUCCESS } from "../../../common/constants";
import { appSlice } from '../../../store/appSlice';
import { useNavigate } from 'react-router-dom';
import ButtonOrgin from '../../../components/basics/buttonOrgin';
import Button from '../../../components/basics/button';
import { Input } from '../../../components/basics/input';
import { InputOrgin } from '../../../components/basics/inputOrgin';
import { Sidebar } from '../../../components/views/Sidebar';

export const Dashbord = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

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

  return <Box sx={{display: 'flex',flexDirection: 'row'}}>
    <Sidebar />
    <Box>
      dashbord
      <button onClick={onAuthVerify}>auth verify</button>

      <button onClick={onEditor}>editor</button>

      <ButtonOrgin />
      <Button />
      <Input />
      <InputOrgin />
    </Box>
  </Box>
}