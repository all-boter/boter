import { useParams } from "react-router-dom";
import { BotMenubar } from "./menubar";
import { Box } from "@mui/system";
import { Sidebar } from "./sidebar";
import { useEffect, useState } from "react";
import { Bot, getBotById } from "@/services/stgApi";
import { SUCCESS } from "@/common/constants";
import { botApi } from "@/services/botApi";

export const BotDetail = () => {
  const routerParams = useParams<{
    botId: string,
  }>();

  const [bot, setBot] = useState<Bot>()
  const [logContent, setLogContent] = useState<string>("");

  const getBotByIdUtil = async (botId: string) => {
    const res = await getBotById(botId)
    if (res.code === SUCCESS) {
      setBot(res.data)
    }
  }

  useEffect(() => {
    const botId = routerParams?.botId
    let eventSource: EventSource;
    if (botId) {
      getBotByIdUtil(botId)
      eventSource = new EventSource(`${botApi.streamLogs}${botId}/logs`, { withCredentials: true });
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
        console.log('%c===eventSource.close B:','color:red',)
        eventSource.close();
      }
    };
  }, [routerParams])

  return <div className="full-box" >
    <BotMenubar botId={routerParams?.botId!} />

    <Box sx={{
      display: 'flex',
      minheight: "calc(100vh - 40px)",
      // background: '#111827'
    }}
    >
      <Box sx={{
        flexGrow: 1,
      }}
      >
        <Box sx={{
            color: '#fff',
            overflowY: 'auto',
            maxWidth: '100vw',
        }}>
          <pre>
            {logContent}
          </pre>
        </Box>
      </Box>
    </Box>
  </div>
}