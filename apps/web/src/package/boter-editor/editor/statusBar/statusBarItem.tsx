import { CSSProperties } from "react"
import { Box } from "@mui/system"
import clsx from "clsx"
import './StatusBarItem.css'

interface StatusBarItemProps {
  className?: string
  style?: CSSProperties
  children: React.ReactNode
}

export const StatusBarItem: React.FC<StatusBarItemProps> = ({
  className,
  children,
  style,
}) => {

  return <Box
    className={clsx(`StatusBarItem StatusBarItem--text`, className)}
    style={style}
  >
    {children}
  </Box>
}