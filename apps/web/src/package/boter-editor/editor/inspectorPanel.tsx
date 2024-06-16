import { Box } from "@mui/system"
import { Resizable } from 're-resizable'
import { DEFAULT_PANEL_HEIGHT, DEFAULT_PANEL_WIDTH_PERCENT, LayoutType, MIN_HEIGHT, MIN_WIDTH, SizeChanges, handleClasses } from "./constants"
import { useCallback, useEffect, useState } from "react"
import clsx from "clsx"
import { SocketConnector } from "@/common/socketConnector"

export interface Props {
  /**
   * Panel layout
   */
  layout?: LayoutType

  /**
   * Hide or show panel contents
   */
  collapsed?: boolean

  /**
   * Absolute height in pixels.
   *
   * Right now, resize in percent is buggy.
   */
  height?: number

  /**
   * Width in percents.
   */
  widthPercent?: number

  /**
   * Resize handler
   * @param size
   */
  onResize: (size: SizeChanges) => void

  /**
   * Panel orientation change handler.
   * @param layout
   */
  onLayoutChange: (layout: LayoutType) => void

  /**
   * Panel collapse/expand handler.
   * @param collapsed
   */
  onCollapsed: (collapsed: boolean) => void
}

export const InspectorPanel = ({
  // layout = LayoutType.Vertical,
  layout = LayoutType.Horizontal,
  height = DEFAULT_PANEL_HEIGHT,
  widthPercent = DEFAULT_PANEL_WIDTH_PERCENT,
  collapsed,
  onResize,
  onLayoutChange,
  onCollapsed,
}: Props) => {
  const isCollapsed = collapsed && layout === LayoutType.Vertical

  const handleResize = useCallback(
    (e: any, direction: any, ref: any, delta: any) => {
      const { height, width } = ref.getBoundingClientRect()
      console.log('%c=handleResize', 'color:red',)
      switch (layout) {
        case LayoutType.Vertical:
          onResize?.({ height })
          return
        case LayoutType.Horizontal:
          onResize?.({ width })
          break
        default:
      }
    },
    [layout, onResize],
  )

  const size = {
    // FIXME: Percent height flickers during resize. Use pixels for now.
    height: layout === LayoutType.Vertical ? height : '100%',
    width: layout === LayoutType.Horizontal ? `${widthPercent}%` : '100%',
  }

  const enabledCorners = {
    top: !collapsed && layout === LayoutType.Vertical,
    right: false,
    bottom: false,
    left: !collapsed && layout === LayoutType.Horizontal,
    topRight: false,
    bottomRight: false,
    bottomLeft: false,
    topLeft: false,
  }

  const handleConnection = ()=>{
    // if(socket){
    //   console.log('%c=handleConnection','color:red',)
    //   socket.emitStartEvent()
    // }
    console.log('%c=handleConnection:','color:red',SocketConnector.getInstance())
    const socket = SocketConnector.getInstance()
    if(socket) {
      socket.emitStartEvent()
    }
  }

  return <Resizable
    className={clsx('InspectorPanel', isCollapsed && 'InspectorPanel--collapsed', `InspectorPanel--${layout}`)}
    handleClasses={handleClasses}
    size={size}
    enable={enabledCorners}
    onResizeStop={handleResize}
    minHeight={MIN_HEIGHT}
    minWidth={MIN_WIDTH}
  >
    <Box sx={{ background: 'green' }}>
      InspectorPanel
      <button onClick={handleConnection}>handleConnection</button>
    </Box>
  </Resizable>
}