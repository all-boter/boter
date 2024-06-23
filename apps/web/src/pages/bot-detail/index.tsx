import { useParams } from "react-router-dom";
import { BotMenubar } from "./menubar";
import { Box } from "@mui/system";
import { Sidebar } from "./sidebar";
import { BotLog } from "./log";

export const BotDetail = () => {
  const routerParams = useParams<{
    botId: string,
  }>();

  return <div className="full-box">
    <BotMenubar botId={routerParams?.botId!} />

    <Box sx={{
      display: 'flex',
      height: "calc(100vh - 40px)",
      background: 'grey'
    }}
    >
      <Sidebar />
      <BotLog botId={routerParams?.botId!} />
    </Box>
  </div>
}