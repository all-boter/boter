import { Root, Trigger, Portal, Arrow } from '@radix-ui/react-popover';
import { CloseBtn, TriggerBtn } from '@/components/basics/button/triggerBtn';
import { Box } from '@mui/system';
import { mainTheme } from '@/components/basics/mainColor';
import { IStrategy, deleteStg } from '@/services/stgApi';
import { AppDispatch } from "@/store";
import { SUCCESS } from '@/common/constants';
import { useDispatch } from 'react-redux';
import { fetchStrategies } from '@/store/appSlice';
import { useTranslation } from 'react-i18next';
import { StyledPopoverContent } from '../bots/botBtnPop';

interface IDeletePop {
  stg: IStrategy
  // callback: () => void
}

export const DeletePop = (props: IDeletePop) => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const onDelete = async () => {
    const { stg } = props
    const res = await deleteStg(stg.id)
    if (res.code === SUCCESS) {
      dispatch(fetchStrategies());
    } else {
      alert(res.msg)
    }
  }

  return <Root>
    <Trigger asChild>
      <TriggerBtn padding='6px 8px' color={mainTheme[103]} bg={mainTheme[108]} width={'80px'}>
        {t('del')}
      </TriggerBtn>
    </Trigger>
    <Portal>
      <StyledPopoverContent sideOffset={5}>
        <Box sx={{
          fontWeight: 700,
          fontSize: '14px',
          color: '#FFF'
        }}>
          {t('delTips')}
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