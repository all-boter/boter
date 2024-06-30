import { BotStatus, IBotOperate, SUCCESS } from "@/common/constants"
import { editCodeByStgId } from "@/services/stgApi"
import { Box } from "@mui/system"
import { ArrowLeft, Play, Save } from "lucide-react"
import { getModulesBySourceId } from "../boter-db/db-util"
import { useNavigate } from "react-router-dom"
import { ToastContext, ToastType } from "@/components/basics/toast/toastContext"
import { useContext, useMemo } from "react"
import { mainTheme } from "@/components/basics/mainColor"
import { MenubarItem } from "@/components/views/menubarItem"
import { EditorPop } from "@/components/views/btnPop/editorPop"
import { activeBotsState, socketConnectStatusState, useAppSelector } from "@/store"

enum MenubarEvent {
  Save = 1,
  Run = 2,
  Back = 3
}

interface IMenubar {
  id: string
}

export const EditorMenubar = ({ id }: IMenubar) => {
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext)!;
  const activeBots = useAppSelector(activeBotsState)

  const botStatus = useMemo<{ status: BotStatus, botOperate: IBotOperate }>(() => {
    const bot = activeBots[id]
    if (bot) {
      let text: IBotOperate = 'run'
      if (bot.status === BotStatus.Running) {
        text = 'stop'
      }

      return { status: bot.status, botOperate: text }
    } else {
      return { status: BotStatus.Stopped, botOperate: 'run' }
    }
  }, [activeBots, id])

  const onMenubar = async (event: MenubarEvent) => {
    const modules = await getModulesBySourceId(id)
    switch (event) {
      case MenubarEvent.Save:
        if (modules?.length) {
          const saveRes = await editCodeByStgId({
            stgId: id,
            code: modules[0].code
          })
          if (saveRes.code === SUCCESS) {
            showToast(saveRes.msg, { type: ToastType.success, duration: 1000 })
          } else {
            showToast(saveRes.msg, { type: ToastType.error, duration: 2000 })
          }
        }

        break;

      case MenubarEvent.Run:

        break;

      case MenubarEvent.Back:
        navigate(-1);
        break;

      default:
        break;
    }
  }

  return <Box component={'div'}
    sx={{
      display: 'flex',
      height: '40px',
      background: mainTheme.blackBg
    }}>

    <MenubarItem onClick={() => onMenubar(MenubarEvent.Back)} sx={{ width: '50px' }}>
      <Box component={ArrowLeft} size={20} sx={{ mr: '4px' }} />
    </MenubarItem>

    <MenubarItem onClick={() => onMenubar(MenubarEvent.Save)}>
      <Box component={Save} size={20} sx={{ mr: '4px' }} />
      Save
    </MenubarItem>

    {/* <MenubarItem onClick={() => onMenubar(MenubarEvent.Run)}> <Box component={Play} size={20} sx={{ mr: '4px' }} />
      Run
    </MenubarItem> */}

    <EditorPop type={botStatus.botOperate} stgId={id}>
      <MenubarItem >
        <Box component={Play} size={20} sx={{ mr: '4px' }} />
        {botStatus.botOperate}
      </MenubarItem>
    </EditorPop>

    <Box sx={{
      lineHeight: '40px',
      verticalAlign: 'center',
      color: mainTheme.blackColor
    }}>Bot:
      <Box component={'span'} sx={{
        pl: '2px',
        color: botStatus.status === BotStatus.Running ? 'green' : 'red'
      }}>
        {botStatus.status}
      </Box>
    </Box>
  </Box>
}