import { ButtonHTMLAttributes } from 'react';
import { styled } from '@mui/system';
import ButtonOrgin from './btnOrgin';
import { mainTheme, muiBlue, muiGrey } from '../mainColor';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | string
  color?: string
  bg?: string
  width?: string
  height?: string
  padding: string
  // onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button(props: Props) {

  return <StyledButton {...props}>{props.children}</StyledButton>;
}

const StyledButton = styled(ButtonOrgin)(
  ({ theme, bg, color,padding='0px' ,height = 'auto', width = 'auto' }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${bg || mainTheme.golden};
  padding: ${padding};
  width: ${width};
  height: ${height};
  border-radius: 6px;
  color: ${color || mainTheme[101]};
  transition: all 150ms ease;
  cursor: pointer;
  border: 0px;
  box-shadow: 0 2px 1px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'}, inset 0 1.5px 1px ${bg || mainTheme.golden}, inset 0 -2px 1px ${bg || mainTheme.golden};
  box-sizing: border-box;

  &:hover {
    opacity: .8;
  }

  &.active {
    background-color: ${bg || mainTheme.golden};;
    box-shadow: none;
    transform: scale(0.99);
  }

  &:focus {
    // box-shadow: 0 0 0 1px ${theme.palette.mode === 'dark' ? muiBlue[300] : muiBlue[200]};
    outline: none;
  }

  &:disabled {
    background-color: ${theme.palette.mode === 'dark' ? muiGrey[700] : muiGrey[200]};
    color: ${theme.palette.mode === 'dark' ? muiGrey[200] : muiGrey[700]};
    border: 0;
    cursor: default;
    box-shadow: none;
    transform: scale(1);
  }
  `,
);