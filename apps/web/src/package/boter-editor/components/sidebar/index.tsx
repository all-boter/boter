import { Box } from '@mui/system';
import React, { ReactNode } from 'react';

export const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{
      display: 'block',
      minWidth: '200px',
      width: '200px',
      overflowY: 'auto',
      borderRight: '2px solid',
      borderColor: '#242424',
      paddingTop: '3px',
      backgroundColor: '#151515',
      color: 'white',
    }}>
      {children}
    </Box>
  )
}
