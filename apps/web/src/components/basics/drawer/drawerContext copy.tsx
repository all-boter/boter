import React, { createContext, useContext } from 'react';
import { useDrawerState } from './useDrawerState';

type DrawerContextType = ReturnType<typeof useDrawerState>;

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const drawerState = useDrawerState();

  return (
    <DrawerContext.Provider value={drawerState}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawerContext must be used within a DrawerProvider');
  }

  return context;
};