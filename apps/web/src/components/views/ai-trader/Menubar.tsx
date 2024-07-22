import { Box } from "@mui/system"
import { Play, Power, RotateCcw, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MenubarItem } from "../menubarItem";
import { useDrawerContext } from "@/components/basics/drawer/drawerContext";
import { Drawer } from "@/components/basics/drawer";
import { mainTheme } from "@/components/basics/mainColor";
import { useMemo } from "react";
import { IAiTraderParams } from "@/services/botApi";
import { BotStatus, IBotOperate } from "@/common/constants";
import { EditParamsType, EditStgParms } from "../stgDrawer/editStgParms";
import { activeBotsState, useAppSelector } from "@/store";
import { EditorPop } from "../btnPop/editorPop";
import { BotType } from "@/services/stgApi";

interface Props {
  isMobile: boolean
  aiTraderParams: IAiTraderParams
  menubarCallback: () => void
}

export enum MenubarEvent {
  Run = 2,
  Params = 4
}

export const Menubar = ({ isMobile, aiTraderParams, menubarCallback }: Props) => {
  const { t } = useTranslation();
  const activeBots = useAppSelector(activeBotsState)
  const { toggleDrawer } = useDrawerContext();

  const botStatus = useMemo<{ status: BotStatus, botOperate: IBotOperate }>(() => {
    const bot = activeBots[aiTraderParams.botId]
    if (bot) {
      let text: IBotOperate = 'run'
      if (bot.status === BotStatus.Running) {
        text = 'stop'
      }

      return { status: bot.status, botOperate: text }
    } else {
      return { status: BotStatus.Stopped, botOperate: 'run' }
    }
  }, [activeBots, aiTraderParams.id])

  const onMenubar = async (event: MenubarEvent) => {
    switch (event) {
      case MenubarEvent.Params:
        toggleDrawer('BotDrawer')

        break;

      default:
        break;
    }
  }


  return <Box sx={{
    display: 'flex',
    height: '40px',
    background: mainTheme.blackBg,
    color: '#fff'
  }}>
    <MenubarItem onClick={() => onMenubar(MenubarEvent.Params)}>
      <Box component={Settings} size={20} sx={{ mr: '4px' }} />
      {t('stgParams')}
    </MenubarItem>

    <EditorPop
      schema={aiTraderParams.paramsSchema}
      type={botStatus.botOperate}
      stgId={aiTraderParams.id}
      botId={aiTraderParams.botId}
      runnerId={aiTraderParams.runnerId}
      botType={BotType.ai_trader}
      callback={() => menubarCallback()}
    >
      <MenubarItem>
        <Box component={botStatus.status === BotStatus.Running ? Power : Play} size={20} sx={{ mr: '4px' }} />
        {t(botStatus.botOperate)}
      </MenubarItem>
    </EditorPop>

    {botStatus.status === BotStatus.Running && <EditorPop
      schema={aiTraderParams.paramsSchema}
      type={'restart'}
      stgId={aiTraderParams.id}
      botId={aiTraderParams.botId}
      runnerId={aiTraderParams.runnerId}
      botType={BotType.ai_trader}
    >
      <MenubarItem>
        <Box component={RotateCcw} size={20} sx={{ mr: '4px' }} />
        {t('restart')}
      </MenubarItem>
    </EditorPop>}

    <Box sx={{
      lineHeight: '40px',
      fontSize: '12px',
      color: mainTheme.blackColor
    }}>
      {t('runningStatus')}
      <Box component={'span'} sx={{
        pl: '2px',
        color: botStatus.status === BotStatus.Running ? 'green' : 'red'
      }}>
        {botStatus.status}
      </Box>
    </Box>

    <Drawer anchor={"left"} id="BotDrawer">
      <EditStgParms
        paramsSchema={aiTraderParams.paramsSchema}
        editType={EditParamsType.aiParams}
        stgId={aiTraderParams.id}
        runnerId={aiTraderParams.runnerId}
        onClose={() => menubarCallback()}
      />
    </Drawer>
  </Box>
}