import { styled } from '@mui/system';
import { Close } from '@radix-ui/react-popover';
import { mainTheme } from '../mainColor';
import { CSSProperties } from 'react';

interface TriggerBtnProps {
  color?: string;
  bg: string
  width?: string;
  height?: string;
  padding: string
  theme?: any
  customStyle?: CSSProperties;
}

export const TriggerBtn = styled('button')<TriggerBtnProps>(
  ({ theme, bg, color, padding = '0px', height = 'auto', width = 'auto', customStyle }) => {
    return {
      width,
      height,
      padding,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: 1.5,
      backgroundColor: bg || mainTheme.golden,
      borderRadius: '6px',
      color: color || mainTheme[101],
      transition: 'all 150ms ease',
      cursor: 'pointer',
      border: `1px solid ${bg || mainTheme.golden}`,
      boxShadow: `0 2px 1px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
        }, inset 0 1.5px 1px ${bg || mainTheme.golden}, inset 0 -2px 1px ${bg || mainTheme.golden}`,
      '&:hover': {
        opacity: 0.8,
      },
      ...(customStyle || {}),
    };
  }
);

export const CloseBtn = styled(Close)<TriggerBtnProps>(
  ({ theme, bg, color, padding = '0px', height = 'auto', width = 'auto' }: TriggerBtnProps) => `
  width: ${width},
  height: ${height},
  padding: ${padding};
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${bg || mainTheme.golden};
  border-radius: 6px;
  color: ${color || mainTheme[101]};
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${bg || mainTheme.golden};
  box-shadow: 0 2px 1px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'}, inset 0 1.5px 1px ${bg || mainTheme.golden}, inset 0 -2px 1px ${bg || mainTheme.golden};

  &:hover {
    opacity: .8;
  }`,
);
