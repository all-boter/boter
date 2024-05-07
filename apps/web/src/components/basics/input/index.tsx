import * as React from 'react';
import { Input as BaseInput } from '@mui/base/Input';
import { styled } from '@mui/system';
import { muiBlue, muiGrey } from '../muiColor';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: number
}

export function Input(props: Props) {

  return (
    <BaseInput slots={{ input: InputElement }} slotProps={{ input: { width: props.width } }} {...props} />
  );
}

const InputElement = styled('input')(
  ({ theme, width }) => `width: ${width || 300}px;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 8px 12px;
      border-radius: 8px;
      color: ${theme.palette.mode === 'dark' ? muiGrey[300] : muiGrey[900]};
      background: ${theme.palette.mode === 'dark' ? muiGrey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? muiGrey[700] : muiGrey[200]};
      box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
    };

      &:hover {
        border-color: ${muiBlue[400]};
      }

      &:focus {
        border-color: ${muiBlue[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? muiBlue[600] : muiBlue[200]};
      }

      // firefox
      &:focus-visible {
        outline: 0;
      }
`)
