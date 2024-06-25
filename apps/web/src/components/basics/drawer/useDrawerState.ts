import { useState, useCallback } from 'react';

export const useDrawerState = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setDrawerOpen(prev => !prev), []);

  return { drawerOpen, openDrawer, closeDrawer, toggleDrawer };
};