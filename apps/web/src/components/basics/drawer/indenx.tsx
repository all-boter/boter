import { Box } from "@mui/system"
import './index.css'
import { useEffect, useState } from "react";
import clsx from "clsx";

interface IDrawer {
  visible: boolean;
  anchor: string
  onClose: () => void
  children: React.ReactNode;
}

const renderAnchor = (anchor: string) => {
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
      width: '300px',
      height: '100%',
      backgroundColor: 'aliceblue'
    }}>
      {children}
    </Box>
  </div>
}