import { styled, css } from '@mui/system';
import { muiGrey } from '@/components/basics/muiColor';
import { Modal } from '@/components/basics/modal';

interface IModal {
  isOpen: boolean
  handleOpen?: () => void
  handleClose: () => void
}

export const CreateStg = (props: IModal) => {

  return <Modal {...props}>
    <ModalContent sx={{ width: 400 }}>
      test
    </ModalContent>
  </Modal>
}

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? muiGrey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? muiGrey[700] : muiGrey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? muiGrey[50] : muiGrey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? muiGrey[400] : muiGrey[800]};
      margin-bottom: 4px;
    }
  `,
);