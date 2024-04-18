import React, { ReactNode } from 'react';
// import './style.css'

export const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <div className='botere-aside'>
      {children}
    </div>
  )
}
