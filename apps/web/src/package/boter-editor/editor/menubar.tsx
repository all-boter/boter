import { BotStatus, IBotOperate, SUCCESS } from "@/common/constants"
import { editCodeByStgId, IJsonValue } from "@/services/stgApi"
import { Box } from "@mui/system"
import { ArrowLeft, Play, Save, Settings } from "lucide-react"
import { getModulesBySourceId } from "../boter-db/db-util"
import { useNavigate } from "react-router-dom"
import { ToastContext, ToastType } from "@/components/basics/toast/toastContext"
import { useContext, useMemo } from "react"
import { mainTheme } from "@/components/basics/mainColor"
import { MenubarItem } from "@/components/views/menubarItem"
import { EditorPop } from "@/components/views/btnPop/editorPop"
import { activeBotsState, useAppSelector } from "@/store"
import { Drawer } from "@/components/basics/drawer"
import { EditStgParms } from "@/components/views/stgDrawer/editStgParms"
import { useDrawerContext } from "@/components/basics/drawer/drawerContext"

enum MenubarEvent {
  Save = 1,
  Run = 2,
  Back = 3,
  Params = 4
}

export interface IEditStgParams {
  schema: IJsonValue[],
  runnerId: string
}

interface IMenubar {
  id: string
  stgParams: IEditStgParams
  menubarCallback: () => void
}

export const EditorMenubar = ({ id, stgParams, menubarCallback }: IMenubar) => {
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext)!;
  const activeBots = useAppSelector(activeBotsState)
  const { toggleDrawer } = useDrawerContext();

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

      case MenubarEvent.Params:
        console.log('%c=Params schema', 'color:red',)
        toggleDrawer('BotDrawer')

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

    <MenubarItem onClick={() => onMenubar(MenubarEvent.Params)}>
      <Box component={Settings} size={20} sx={{ mr: '4px' }} />
      Params
    </MenubarItem>

    <MenubarItem onClick={() => onMenubar(MenubarEvent.Save)}>
      <Box component={Save} size={20} sx={{ mr: '4px' }} />
      Save
    </MenubarItem>

    <EditorPop type={botStatus.botOperate} stgId={id} runnerId={stgParams.runnerId}>
      <MenubarItem >
        <Box component={Play} size={20} sx={{ mr: '4px' }} />
        {botStatus.botOperate}
      </MenubarItem>
    </EditorPop>

    <Box sx={{
      lineHeight: '40px',
      fontSize: '12px',
      color: mainTheme.blackColor
    }}>Test status:
      <Box component={'span'} sx={{
        pl: '2px',
        color: botStatus.status === BotStatus.Running ? 'green' : 'red'
      }}>
        {botStatus.status}
      </Box>
    </Box>

    <Drawer anchor={"left"} id="BotDrawer">
      <EditStgParms paramsSchema={stgParams.schema} stgId={id} runnerId={stgParams.runnerId} onClose={() => menubarCallback()} />
    </Drawer>
  </Box>
}