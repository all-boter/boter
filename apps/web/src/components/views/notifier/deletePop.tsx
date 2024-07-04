import { Root, Trigger, Portal, Arrow } from '@radix-ui/react-popover';
import { CloseBtn } from '@/components/basics/button/triggerBtn';
import { Box } from '@mui/system';
import { mainTheme } from '@/components/basics/mainColor';
import { SUCCESS } from '@/common/constants';
import { StyledDeleteContent } from '../btnPop/deletePop';
import { Trash2 } from 'lucide-react';
import { useContext } from 'react';
import { ToastContext, ToastType } from '@/components/basics/toast/toastContext';
import { deleteNotifier } from '@/services/botApi';

interface IDeletePop {
  id: string
  callback: () => void
}

export const DeletePop = ({ id, callback }: IDeletePop) => {
  const { showToast } = useContext(ToastContext)!;

  const onDelete = async () => {
    const res = await deleteNotifier(id);
    if (res.code === SUCCESS) {
      showToast(`Delete notifier ${res.msg}`, { type: ToastType.success, duration: 2000 });
      callback()
    } else {
      showToast(res.msg, { type: ToastType.error });
    }
  }


  return <Root>
    <Trigger asChild>
      <Box component={Trash2} size={20} sx={{ cursor: 'pointer' }} />
    </Trigger>
    <Portal>
      <StyledDeleteContent sideOffset={5}>
        <Box sx={{
          fontWeight: 700,
          fontSize: '14px',
          color: '#FFF'
        }}>
          Are you sure to delete this channel?
        </Box>
        <Box sx={{
          display: 'flex',
          boxSizing: 'border-box',
          justifyContent: 'space-between',
          width: '100%',
          px: '20px',
          mt: '10px',
        }}>
          <CloseBtn padding='2px 10px' aria-label="Close" bg={mainTheme[100]} width='auto'>
            Cancel
          </CloseBtn>

          <CloseBtn padding='2px 10px' aria-label="Close" onClick={() => onDelete()} bg={mainTheme[102]} width='auto'>
            Confirm
          </CloseBtn>
        </Box>

        <Arrow fill={mainTheme[106]} />
      </StyledDeleteContent>
    </Portal>
  </Root>
}