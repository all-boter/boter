import React, { CSSProperties, ReactNode } from 'react';
import { buttonClasses } from '@mui/base/Button';
import { styled } from '@mui/system';
import { lightBlue,muiGrey } from '../basics/muiColor';

const Button = styled('a')(
  ({ theme }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid #9ca3af;
  padding: 0px 16px;
  font-weight: 600;
  font-size: 0.875rem;
  background-color: transparent;
  font-family: 'IBM Plex Sans', sans-serif;
  color: white;
  transition: all 150ms ease;
  text-decoration: none;

  &:hover {
    background-color: ${lightBlue[900]};
  }

  &.${buttonClasses.active} {
    background-color: ${lightBlue[900]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? muiGrey[300] : muiGrey[200]};
    outline: none;
  }

  &.${buttonClasses.disabled} {
    background-color: ${theme.palette.mode === 'dark' ? muiGrey[700] : muiGrey[200]};
    color: ${theme.palette.mode === 'dark' ? muiGrey[200] : muiGrey[700]};
    border: 0;
    cursor: default;
    box-shadow: none;
    transform: scale(1);
  }
  `,
);

type Props = {
  children?: ReactNode;
  url: string
  style?: CSSProperties
};

export function Loginbtn({ children, url, style }: Props) {
  return <Button href={url} style={style}>{children}</Button>;
}