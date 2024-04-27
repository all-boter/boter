import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';

interface IModal {
  isOpen: boolean
  handleOpen?: () => void
  handleClose: () => void
  children: JSX.Element
}

export function Modal(props: IModal) {
  const { isOpen, handleClose, handleOpen, children } = props

  return (
    <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={isOpen}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      {children}
    </StyledModal>
  );
}

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'base-Backdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const StyledModal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;
