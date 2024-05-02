import { Root, Trigger, Portal, Content, Arrow } from '@radix-ui/react-popover';
import { CloseBtn, TriggerBtn } from '@/components/basics/button/triggerBtn';
import { Box, styled } from '@mui/system';
import { lightBlue, muiGrey } from '@/components/basics/muiColor';

const StyledContent = styled(Content)(`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 90px;
    border-radius: 8px;
    background: ${muiGrey[101]};
    padding: 0 10px;
`)

export const DeletePop = () => {

  const onDelete = () => {
    console.log('onDelete')
  }

  return <Root>
    <Trigger asChild>
      <TriggerBtn color={'#0ecb81'} size={'small'}>
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
          <CloseBtn aria-label="Close" color={lightBlue[100]} size='small'>
            Cancel
          </CloseBtn>

          <CloseBtn aria-label="Close" onClick={() => onDelete()} color={'#f87171'} size='small'>
            Confirm
          </CloseBtn>
        </Box>

        <Arrow fill={muiGrey[101]} />
      </StyledContent>
    </Portal>
  </Root>
}