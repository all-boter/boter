import React from 'react';
import { Root, Portal, Overlay, Content } from '@radix-ui/react-dialog';
import { muiGrey } from '@/components/basics/mainColor';
import { css, styled } from '@mui/system';
import './modal.css'

interface IModal {
  isOpen: boolean
  handleOpen?: () => void
  handleClose: () => void
  children: JSX.Element
}

export const ModalContent = styled('div')(
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
   border-radius: 6px;
    border: 1px solid ${theme.palette.mode === 'dark' ? muiGrey[700] : muiGrey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? muiGrey[50] : muiGrey[900]};
  `,
);

export function Modal(props: IModal) {
  const { isOpen, handleClose, handleOpen, children } = props

  return (
    <Root open={isOpen} onOpenChange={handleClose}>
      <Portal>
        <Overlay />
        <Content className='dialog-content'>
          {children}
        </Content>
      </Portal>
    </Root>
  );
};