import { Root, Trigger, Portal, Content, Arrow } from '@radix-ui/react-popover';
import { CloseBtn, TriggerBtn } from '@/components/basics/button/triggerBtn';
import { Box, styled } from '@mui/system';
import { mainTheme } from '@/components/basics/mainColor';
import { IStrategy, deleteStg } from '@/services/stgApi';
import { AppDispatch } from "@/store";
import { SUCCESS } from '@/common/constants';
import { useDispatch } from 'react-redux';
import { fetchStrategies } from '@/store/appSlice';

const StyledContent = styled(Content)(`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 90px;
   border-radius: 6px;
    background: ${mainTheme[106]};
    padding: 0 10px;
`)

interface IDeletePop {
  stg: IStrategy
  // callback: () => void
}

export const DeletePop = (props: IDeletePop) => {
  const dispatch: AppDispatch = useDispatch();

  const onDelete = async () => {
    const { stg } = props
    console.log('onDelete', props.stg)
    const res = await deleteStg(stg.id)
    if (res.code === SUCCESS) {
      dispatch(fetchStrategies());
    } else {
      alert(res.msg)
    }
  }

  return <Root>
    <Trigger asChild>
      <TriggerBtn color={mainTheme[103]} bg={mainTheme[108]} size={'small'}>
        Delete
      </TriggerBtn>
    </Trigger>
    <Portal>
      <StyledContent sideOffset={5}>
        <Box sx={{
          fontWeight: 700,
          fontSize: '14px',
          color: '#FFF'
        }}>
          Are you sure to delete this strategy?
        </Box>
        <Box sx={{
          display: 'flex',
          boxSizing: 'border-box',
          justifyContent: 'space-between',
          width: '100%',
          px: '20px',
          mt: '10px',
        }}>
          <CloseBtn aria-label="Close" bg={mainTheme[100]} size='small'>
            Cancel
          </CloseBtn>

          <CloseBtn aria-label="Close" onClick={() => onDelete()} bg={mainTheme[102]} size='small'>
            Confirm
          </CloseBtn>
        </Box>

        <Arrow fill={mainTheme[106]} />
      </StyledContent>
    </Portal>
  </Root>
}