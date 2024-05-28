import { Box } from "@mui/system"
import { Sidebar } from "@/components/views/Sidebar"
import { useEffect, useState } from "react";
import { Bot, getOwnedBots } from "@/services/stgApi";
import { BotStatus, SUCCESS } from "@/common/constants";
import { BotList } from "@/components/views/bots/botList";
import { RadixSelect } from "@/components/form/radixSelect";

const options: {
  id: BotStatus,
  label: BotStatus
}[]  = [
  {
    id: BotStatus.Running,
    label: BotStatus.Running
  },
  {
    id: BotStatus.Stopped,
    label: BotStatus.Stopped
  },
]

export const Bots = () => {
  const [bots, setBots] = useState<Bot[]>([])

  const getBotsUtil = async () => {
    const res = await getOwnedBots(BotStatus.Running)
    if (res.code === SUCCESS) {
      setBots(res.data)
    }
  }

  useEffect(() => {
    getBotsUtil()
  }, [])

  return <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', background: '#1e293b' }}>
    <Sidebar />

    <Box sx={{ width: '85%', mx: '20px', mt: '20px' }}>
      {/* <Select2 
          options={options} 
          id={'id'}
          label={'label'}
       /> */}

      <RadixSelect />
      <BotList bots={bots} refreshList={getBotsUtil} />
    </Box>
  </Box>
}