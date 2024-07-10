import { useContext, useEffect } from "react"
import { AppDispatch, useAppSelector, userState } from "@/store"
import { fetchAuthUser } from "@/store/appSlice"
import { Box, styled } from "@mui/system"
import { useDispatch } from "react-redux"
import { Root, Trigger, Portal, Content, Close } from '@radix-ui/react-popover';
import { mainTheme } from "../basics/mainColor"
import { logoutApi } from "@/services/userApi"
import { SUCCESS } from "@/common/constants"
import { ToastContext, ToastType } from "../basics/toast/toastContext"
import { useNavigate } from "react-router-dom"
import { Languages } from "lucide-react"

const MenuItem = styled(Close)(`
  width: 100%;
  height: 40px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  border: 0px;
  background: ${mainTheme.darkBule};
  color: #FFF;
  outline: none;

  &:hover {
    background-color: #374151cc;
  }
`)

export const UserMenu = () => {
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext)!;
  const user = useAppSelector(userState)
  const dispatch: AppDispatch = useDispatch();

  const onMenu = async (type: number) => {
    if (type === 1) {
      const res = await logoutApi()
      if (res.code === SUCCESS) {
        showToast(`Logout ${res.msg}`, { type: ToastType.success, duration: 2000 })
        localStorage.removeItem('botUser');
        navigate('/');
      } else {
        showToast(`Error: ${res.msg}`, { type: ToastType.error, duration: 2000 })
      }
    } else if (type === 2) {
      console.log('%c=lang', 'color:red',)
    } else if (type === 3) {
      console.log('%c=lang', 'color:red',)
    }
  }

  useEffect(() => {
    if (!user.id) {
      dispatch(fetchAuthUser());
    }
  }, [user.id])

  return <Box sx={{ display: 'flex', alignItems: 'center', height: '60px', color: '#FFF', }}>
    <Root>
      <Trigger asChild>
        <Box component={Languages} size={20} sx={{ mr: '8px', cursor: 'pointer' }} />
      </Trigger>
      <Portal>
        <Box
          component={Content}
          sideOffset={6}
          sx={{
            outline: 'none',
            background: mainTheme.darkBule,
            border: '1px solid #343e4f',
            borderRadius: '6px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',width: '80px', height: '80px', color: '#FFF' }}>
            <MenuItem aria-label="Close" onClick={() => onMenu(2)}>
              English
            </MenuItem>
            <MenuItem aria-label="Close" onClick={() => onMenu(3)}>
              中文
            </MenuItem>
          </Box>
        </Box>
      </Portal>
    </Root>

    {user.username}
    <Root>
      <Trigger asChild>
        <Box
          component='img'
          src={user.avatar}
          alt="icon"
          sx={{
            cursor: 'pointer',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            ml: '6px'
          }}
        />
      </Trigger>
      <Portal>
        <Box
          component={Content}
          sideOffset={3}
          sx={{
            outline: 'none',
            background: mainTheme.darkBule,
            border: '1px solid #343e4f',
            borderRadius: '6px',
          }}
        >
          <Box sx={{ width: '80px', height: '40px', color: '#FFF', display: 'flex', alignItems: 'center' }}>
            <MenuItem aria-label="Close" onClick={() => onMenu(1)}>
              Logout
            </MenuItem>
          </Box>
        </Box>
      </Portal>
    </Root>
  </Box>
}
