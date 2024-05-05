import { useEffect, useState } from "react";
import clsx from "clsx";
import { Box } from "@mui/system"
import './index.css'

interface IDrawer {
  visible: boolean;
  anchor: 'left' | 'right'
  children: React.ReactNode;
  onClose: () => void
}

const renderAnchor = (anchor: 'left' | 'right') => {
  switch (anchor) {
    case "left":
      return "drawer-left";
    case "right":
      return "drawer-right";
    default:
      return "drawer-left";
  }
};

export const StgDrawer = ({ visible, anchor, onClose, children }: IDrawer) => {
  const [opened, setOpened] = useState(visible);
  const [active, setActive] = useState(visible);

  useEffect(() => {
    if (visible) {
      setOpened(true);
    }

    /**
     * Delay the external state so that it is set only after the component is mounted, 
     * so that the transition effect takes effect.
    */
    requestAnimationFrame(() => {
      setActive(visible);
    });
  }, [visible]);

  if (!opened && !visible) {
    return null;
  }

  return <div className={clsx(renderAnchor(anchor), 'drawer', active && 'active')}>
    <div className={'drawer-mask'} onClick={onClose} />
    <Box sx={{
      position: 'relative',
      width: '300px',
      height: '100%',
      backgroundColor: '#1f2937'
    }}>
      {children}
    </Box>
  </div>
}