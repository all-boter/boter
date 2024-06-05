import { ButtonHTMLAttributes } from 'react';
import { styled } from '@mui/system';
import { mainColor, mainTheme, muiBlue, muiGrey } from '../muiColor';
import ButtonOrgin from './btnOrgin';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | string
  color?: string
  bg?: string
  size?: 'small' | 'middle'
  width?: string
  // onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button(props: Props) {

  return <StyledButton {...props}>{props.children}</StyledButton>;
}

const StyledButton = styled(ButtonOrgin)(
  ({ theme, bg, color, width, size = 'middle' }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${bg || mainTheme.golden};
  padding: ${size === 'small' ? '5px 10px' : '8px 16px'};
  width: ${width ? width + 'px' : 'auto'};
  border-radius: 6px;
  color: ${color || mainColor[101]};
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${bg || mainTheme.golden};;
  box-shadow: 0 2px 1px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'}, inset 0 1.5px 1px ${bg || mainTheme.golden}, inset 0 -2px 1px ${bg || mainTheme.golden};

  &:hover {
    opacity: .8;
  }

  &.active {
    background-color: ${bg || mainTheme.golden};;
    box-shadow: none;
    transform: scale(0.99);
  }

  &:focus {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? muiBlue[300] : muiBlue[200]};
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