import { styled } from '@mui/system';
import { muiBlue, muiGrey } from '../muiColor';
import { TextareaHTMLAttributes, forwardRef } from 'react';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  width?: number;
  height?: number;
}

interface ICss {
  width?: number;
  height?: number;
  theme?: any
}

/**
 * ex:
 * <Textarea placeholder="Enter your text here" width={400} height={200} />
*/
export const Textarea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  return (
    <TextareaElement
      {...props}
      ref={ref}
    />
  );
});

const TextareaElement = styled('textarea')(
  ({ theme, width, height }: ICss) => `
    box-sizing: border-box;
    width: ${width || 300}px;
    height: ${height || 150}px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
   border-radius: 6px;
    color: ${theme.palette.mode === 'dark' ? muiGrey[300] : muiGrey[900]};
    background: ${theme.palette.mode === 'dark' ? muiGrey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? muiGrey[700] : muiGrey[200]};
    box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'};

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

    resize: vertical;
  `
);
