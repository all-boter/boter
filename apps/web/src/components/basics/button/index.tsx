import { Button as BaseButton, ButtonProps, buttonClasses } from '@mui/base/Button'
import { styled } from '@mui/system';
import { mainColor, muiBlue, muiGrey } from '../muiColor';

interface Props extends ButtonProps{
  children: JSX.Element | string
  color?: string
  size?: 'small' | 'middle'
}

export function Button(props: Props) {

  return <StyledButton {...props}>{props.children}</StyledButton>;
}

const StyledButton = styled(BaseButton)(
  ({ theme,color,size='middle' }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${color || mainColor[100]};
  padding: ${size === 'small' ? '5px 10px' : '8px 16px'};
  border-radius: 8px;
  color: ${mainColor[101]};
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${color || mainColor[100]};;
  box-shadow: 0 2px 1px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
    }, inset 0 1.5px 1px ${color || mainColor[100]};, inset 0 -2px 1px ${color || mainColor[100]};;

  &:hover {
    opacity: .8;
  }

  &.${buttonClasses.active} {
    background-color: ${color || mainColor[100]};;
    box-shadow: none;
    transform: scale(0.99);
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? muiBlue[300] : muiBlue[200]};
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