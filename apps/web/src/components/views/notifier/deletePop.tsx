import { Root, Trigger, Portal, Arrow } from '@radix-ui/react-popover';
import { CloseBtn } from '@/components/basics/button/triggerBtn';
import { Box } from '@mui/system';
import { mainTheme } from '@/components/basics/mainColor';
import { SUCCESS } from '@/common/constants';
import { Trash2 } from 'lucide-react';
import { useContext } from 'react';
import { ToastContext, ToastType } from '@/components/basics/toast/toastContext';
import { deleteNotifier } from '@/services/botApi';
import { useTranslation } from 'react-i18next';
import { StyledPopoverContent } from '../bots/botBtnPop';

interface IDeletePop {
  id: string
  callback: () => void
}

export const DeletePop = ({ id, callback }: IDeletePop) => {
  const { t } = useTranslation();
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
      <StyledPopoverContent sideOffset={5}>
        <Box sx={{
          fontWeight: 700,
          fontSize: '14px',
          color: '#FFF'
        }}>
          {t('delNotiTips')}
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
            {t('cancel')}
          </CloseBtn>

          <CloseBtn padding='2px 10px' aria-label="Close" onClick={() => onDelete()} bg={mainTheme[102]} width='auto'>
            {t('confirm')}
          </CloseBtn>
        </Box>

        <Arrow fill={mainTheme[106]} />
      </StyledPopoverContent>
    </Portal>
  </Root>
}