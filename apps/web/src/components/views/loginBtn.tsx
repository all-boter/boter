import React, { CSSProperties, ReactNode } from 'react';
import { styled } from '@mui/system';
import { mainColor, muiGreen } from '../basics/mainColor';

const Button = styled('a')(
  ({ theme }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  cursor: pointer;
 border-radius: 6px;
  border: 2px solid ${muiGreen['limeGreen']};
  padding: 0px 16px;
  font-weight: 600;
  font-size: 0.875rem;
  background-color: transparent;
  font-family: 'IBM Plex Sans', sans-serif;
  color: ${muiGreen['limeGreen']};
  transition: all 150ms ease;
  text-decoration: none;

  &:hover {
    background-color: ${mainColor[900]};
  }`,
);

type Props = {
  children?: ReactNode;
  url: string
  style?: CSSProperties
};

export function Loginbtn({ children, url, style }: Props) {
  return <Button href={url} style={style}>{children}</Button>;
}