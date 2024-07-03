import { Box } from "@mui/system"
import { Resizable } from 're-resizable'
import { DEFAULT_PANEL_HEIGHT, DEFAULT_PANEL_WIDTH_PERCENT, LayoutType, MIN_HEIGHT, MIN_WIDTH, SizeChanges, handleClasses } from "./constants"
import { useCallback, useEffect, useState } from "react"
import clsx from "clsx"
import { botApi } from "@/services/botApi"

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

  id: string
}

export const InspectorPanel = ({
  // layout = LayoutType.Vertical,
  layout = LayoutType.Horizontal,
  height = DEFAULT_PANEL_HEIGHT,
  widthPercent = DEFAULT_PANEL_WIDTH_PERCENT,
  collapsed,
  id,
  onResize,
  onLayoutChange,
  onCollapsed,
}: Props) => {
  const isCollapsed = collapsed && layout === LayoutType.Vertical
  const [logContent, setLogContent] = useState<string>("");

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

  useEffect(() => {
    let eventSource: EventSource;
    if (id) {
      eventSource = new EventSource(`${botApi.streamLogs}${id}`, { withCredentials: true });
      eventSource.onmessage = ({ data }) => {
        const parsedData = JSON.parse(data);
        if (parsedData?.type === 'close') {
          console.log('%c==Closing connection A:', 'color:red')
          eventSource.close();
        } else {
          const logText = parsedData.msg || "";
          setLogContent(prev => prev + logText);
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);
        eventSource.close();
      };
    }

    return () => {
      if (eventSource) {
        console.log('%c===eventSource.close B:', 'color:red',)
        eventSource.close();
      }
    };
  }, [id])

  return <Resizable
    className={clsx('InspectorPanel', isCollapsed && 'InspectorPanel--collapsed', `InspectorPanel--${layout}`)}
    handleClasses={handleClasses}
    size={size}
    enable={enabledCorners}
    onResizeStop={handleResize}
    minHeight={MIN_HEIGHT}
    minWidth={MIN_WIDTH}
  >
    <Box sx={{
      background: '#313131',
      height: "calc(100vh - 60px)",
      overflowY: 'auto',
    }}>
      <Box sx={{
        color: '#fff',
        overflowY: 'auto',
        minHeight: '100%',
        boxSizing: 'border-box',
        pl: '10px',
        pb: '200px'
      }}>
        <pre>
          {logContent}
        </pre>
      </Box>
    </Box>
  </Resizable>
}