import { Box } from "@mui/system"
import { useEffect, useState } from "react";
import { Bot, getOwnedBots } from "@/services/stgApi";
import { BotStatus, SUCCESS } from "@/common/constants";
import { BotList } from "@/components/views/bots/botList";
import { BoterSelect } from "@/components/basics/select";
import { mainTheme } from "@/components/basics/mainColor";
import { DrawerProvider } from "@/components/basics/drawer/drawerContext";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/views/layout";

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
  const { t } = useTranslation();
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

  return <Layout>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: '10px' }}>
      <Box component={'span'} sx={{ mr: '10px', color: mainTheme.white, fontWeight: '600', fontSize: '20px' }}>
        {t('myBots')}
      </Box>
      <BoterSelect
        options={options}
        value={botStatusFilter}
        width={140}
        onChange={onChangeBotFilter}
      />
    </Box>

    <DrawerProvider>
      <BotList bots={bots} refreshList={getBotsUtil} />
    </DrawerProvider>
  </Layout>
}