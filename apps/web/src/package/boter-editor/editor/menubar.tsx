import { SUCCESS } from "@/common/constants"
import { editCodeByStgId } from "@/services/stgApi"
import { Box } from "@mui/system"
import { ArrowLeft, Play, Save } from "lucide-react"
import { getModulesBySourceId } from "../boter-db/db-util"
import { useNavigate } from "react-router-dom"
import { ToastContext, ToastType } from "@/components/basics/toast/toastContext"
import { useContext } from "react"
import { mainTheme } from "@/components/basics/mainColor"
import { MenubarItem } from "@/components/views/menubarItem"

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

    <MenubarItem onClick={() => onMenubar(MenubarEvent.Back)} sx={{width: '50px'}}>
      <Box component={ArrowLeft} size={20} sx={{ mr: '4px' }} />
    </MenubarItem>

    <MenubarItem onClick={() => onMenubar(MenubarEvent.Save)}>
      <Box component={Save} size={20} sx={{ mr: '4px' }} />
      Save
    </MenubarItem>

    <MenubarItem onClick={() => onMenubar(MenubarEvent.Run)}> <Box component={Play} size={20} sx={{ mr: '4px' }} />
      Run
    </MenubarItem>
  </Box>
}