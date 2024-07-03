import { useParams } from "react-router-dom";
import { BotMenubar } from "./menubar";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Bot, getBotById } from "@/services/stgApi";
import { BotStatus, SUCCESS } from "@/common/constants";
import { botApi } from "@/services/botApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { queryOwnedAllBotsStatus } from "@/store/appSlice";
import { DrawerProvider } from "@/components/basics/drawer/drawerContext";

export const BotDetail = () => {
  const dispatch: AppDispatch = useDispatch();
  const routerParams = useParams<{
    botId: string,
  }>();

  const [bot, setBot] = useState<Bot>({
    id: "",
    uid: "",
    strategyId: "",
    apiId: "",
    name: "",
    stgName: "",
    apiKey: "",
    status: BotStatus.Booting,
    isPublic: false,
    duration: 15000,
    params: {},
    backtestParams: {},
    backtestBotParams: {},
    storage: {},
    backtestStatus: ''
  })

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
      eventSource = new EventSource(`${botApi.streamLogs}${botId}`, { withCredentials: true });
      eventSource.onmessage = ({ data }) => {
        const parsedData = JSON.parse(data);
        if (parsedData?.type === 'close') {
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
        eventSource.close();
      }
    };
  }, [routerParams])

  const refreshBot = () => {
    getBotByIdUtil(bot.id)
  }

  useEffect(() => {
    dispatch(queryOwnedAllBotsStatus());
  }, [])

  return <div className="full-box" >
    <DrawerProvider>
      <BotMenubar bot={bot} botId={routerParams?.botId!} refreshBot={refreshBot} />
    </DrawerProvider>

    <Box sx={{
      display: 'flex',
      minheight: "calc(100vh - 40px)",
      pt: '32px',
    }}
    >
      <Box sx={{
        flexGrow: 1,
      }}
      >
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
    </Box>
  </div>
}