import { styled } from '@mui/system';
import { mainColor } from '../muiColor';

interface TriggerBtnProps {
  color: string;
  size?: 'small' | 'middle';
  theme?: any
}

export const TriggerBtn = styled('button')(
  ({ theme, color, size = 'middle' }: TriggerBtnProps) => `
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
  border: 1px solid ${color || mainColor[100]};
  box-shadow: 0 2px 1px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'}, inset 0 1.5px 1px ${color || mainColor[100]}, inset 0 -2px 1px ${color || mainColor[100]};

  &:hover {
    opacity: .8;
  }`,
);
