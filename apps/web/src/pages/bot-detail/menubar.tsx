import { mainTheme } from "@/components/basics/mainColor";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Power, RotateCcw } from "lucide-react"
import { MenubarItem } from "@/components/views/menubarItem";
import { MenubarEvent } from "@/package/boter-editor/editor/menubar";
import { BotStatus, IBotOperate } from "@/common/constants";
import { useMemo } from "react";
import { activeBotsState, useAppSelector } from "@/store";
import { Bot, BotHandleEnum } from "@/services/stgApi";
import { BotBtnPop } from "@/components/views/bots/botBtnPop";
import { useDrawerContext } from "@/components/basics/drawer/drawerContext";
import { Drawer } from "@/components/basics/drawer";
import { EditBot } from "@/components/views/botDrawer/editBot";
import { useTranslation } from "react-i18next";

interface Props {
  botId: string
  bot: Bot
  refreshBot: () => void
}

export const BotMenubar = ({ botId, bot, refreshBot }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toggleDrawer } = useDrawerContext();
  const activeBots = useAppSelector(activeBotsState)

  const onMenubar = async (event: MenubarEvent) => {
    switch (event) {
      case MenubarEvent.Params:
        toggleDrawer('BotDrawer');
        break;

      case MenubarEvent.Back:
        navigate(-1);
        break;

      default:
        break;
    }
  }

  const botStatus = useMemo<{ status: BotStatus, botOperate: IBotOperate }>(() => {
    const bot = activeBots[botId]
    if (bot) {
      let text: IBotOperate = 'run'
      if (bot.status === BotStatus.Running) {
        text = 'stop'
      }

      return { status: bot.status, botOperate: text }
    } else {
      return { status: BotStatus.Stopped, botOperate: 'run' }
    }
  }, [activeBots, botId])

  const btnPopCallback = (botId: string, type: BotHandleEnum, botStatus = BotStatus.Running) => { }

  return <Box component={'div'}
    sx={{
      position: 'fixed',
      top: '0px',
      display: 'flex',
      height: '40px',
      width: '100%',
      background: mainTheme.blackBg
    }}>

    <MenubarItem onClick={() => onMenubar(MenubarEvent.Back)} sx={{ width: '50px' }}>
      <Box component={ArrowLeft} size={20} sx={{ mr: '4px' }} />
    </MenubarItem>

    <MenubarItem onClick={() => onMenubar(MenubarEvent.Params)}>
      <Box component={Play} size={20} sx={{ mr: '4px' }} />
      {t('botParams')}
    </MenubarItem>

    <BotBtnPop type={botStatus.botOperate} padding='0px 0px' bot={bot} callBack={btnPopCallback}>
      <MenubarItem >
        <Box component={botStatus.status === BotStatus.Running ? Power : Play} size={20} sx={{ mr: '4px' }} />
        {t(botStatus.botOperate)}
      </MenubarItem>
    </BotBtnPop>

    {botStatus.status === BotStatus.Running && <BotBtnPop type='restart' padding='0px 0px' bot={bot} callBack={btnPopCallback}>
      <MenubarItem >
        <Box component={RotateCcw} size={20} sx={{ mr: '4px' }} />
        {t('restart')}
      </MenubarItem>
    </BotBtnPop>
    }

    <Box sx={{
      lineHeight: '40px',
      fontSize: '12px',
      color: mainTheme.blackColor
    }}>status:
      <Box component={'span'} sx={{
        pl: '2px',
        color: botStatus.status === BotStatus.Running ? 'green' : 'red'
      }}>
        {botStatus.status}
      </Box>
    </Box>

    <Drawer anchor={"left"} id="BotDrawer">
      <EditBot bot={bot} onClose={() => refreshBot()} />
    </Drawer>
  </Box>
}