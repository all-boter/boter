import { useParams } from "react-router-dom";
import { BotMenubar } from "./menubar";
import { Box } from "@mui/system";
import { Sidebar } from "./sidebar";
import { BotLog } from "./log";
import { useEffect, useState } from "react";
import { Bot, getBotById } from "@/services/stgApi";
import { SUCCESS } from "@/common/constants";

export const BotDetail = () => {
  const routerParams = useParams<{
    botId: string,
  }>();

  const [bot, setBot] = useState<Bot>()

  const getBotByIdUtil = async(botId: string)=>{
    const res = await getBotById(botId)
    if (res.code === SUCCESS) {
      setBot(res.data)
    }
  }

  useEffect(()=>{
    if (routerParams.botId) getBotByIdUtil(routerParams.botId)
  },[routerParams])

  console.log('%c=bot','color:red',bot)

  return <div className="full-box">
    <BotMenubar botId={routerParams?.botId!} />

    <Box sx={{
      display: 'flex',
      height: "calc(100vh - 40px)",
      background: 'grey'
    }}
    >
      <Sidebar bot={bot as Bot}/>
      <BotLog botId={routerParams?.botId!} />
    </Box>
  </div>
}