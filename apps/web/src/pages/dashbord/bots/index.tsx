import { Box } from "@mui/system"
import { Sidebar } from "@/components/views/Sidebar"
import { useEffect, useState } from "react";
import { Bot, getOwnedBots } from "@/services/stgApi";
import { BotStatus, SUCCESS } from "@/common/constants";
import { BotList } from "@/components/views/bots/botList";
import { BoterSelect } from "@/components/basics/select";
import { mainTheme } from "@/components/basics/muiColor";

const options: {
  value: BotStatus,
  label: BotStatus
}[] = [
    {
      value: BotStatus.Running,
      label: BotStatus.Running
    },
    {
      value: BotStatus.Stopped,
      label: BotStatus.Stopped
    },
  ]

export const Bots = () => {
  const [bots, setBots] = useState<Bot[]>([])
  const [botStatusFilter, setBotStatusFilter] = useState<BotStatus>(BotStatus.Running);

  const getBotsUtil = async (botStatus: BotStatus) => {
    const res = await getOwnedBots(botStatus)
    if (res.code === SUCCESS) {
      setBots(res.data)
    }
  }

  const onChangeBotFilter = (val: BotStatus) => {
    setBotStatusFilter(val)
    getBotsUtil(val)
  }

  useEffect(() => {
    getBotsUtil(BotStatus.Running)
  }, [])

  return <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', background: '#1e293b' }}>
    <Sidebar />

    <Box sx={{ width: '85%', mx: '20px', mt: '20px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}>
        <Box component={'span'} sx={{ mr: '10px', color: mainTheme.white, fontWeight: '700', fontSize: '20px' }}>
          My bots
        </Box>
        <BoterSelect
          options={options}
          value={botStatusFilter}
          width={140}
          onChange={onChangeBotFilter}
        />
      </Box>

      <BotList bots={bots} refreshList={getBotsUtil} />
    </Box>
  </Box>
}