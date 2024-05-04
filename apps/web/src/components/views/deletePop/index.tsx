import { Root, Trigger, Portal, Content, Arrow } from '@radix-ui/react-popover';
import { CloseBtn, TriggerBtn } from '@/components/basics/button/triggerBtn';
import { Box, styled } from '@mui/system';
import { lightBlue, mainColor } from '@/components/basics/muiColor';
import { IStrategy, deleteStg } from '@/services/stgApi';
import { SUCCESS } from '@/common/constants';

const StyledContent = styled(Content)(`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 90px;
    border-radius: 8px;
    background: ${mainColor[106]};
    padding: 0 10px;
`)

interface IDeletePop {
  stg: IStrategy
  callback: () => void
}

export const DeletePop = (props: IDeletePop) => {

  const onDelete = async () => {
    const { stg, callback } = props
    console.log('onDelete', props.stg)
    const res = await deleteStg(stg.id)
    if (res.code === SUCCESS) {
      callback()
    } else {
      alert(res.msg)
    }
  }

  return <Root>
    <Trigger asChild>
      <TriggerBtn color={mainColor[103]} bg={mainColor[108]} size={'small'}>
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
          <CloseBtn aria-label="Close" bg={lightBlue[100]} size='small'>
            Cancel
          </CloseBtn>

          <CloseBtn aria-label="Close" onClick={() => onDelete()} bg={mainColor[102]} size='small'>
            Confirm
          </CloseBtn>
        </Box>

        <Arrow fill={mainColor[106]} />
      </StyledContent>
    </Portal>
  </Root>
}