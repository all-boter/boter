import { SUCCESS } from "@/common/constants"
import { editCodeByStgId } from "@/services/stgApi"
import { Box, styled } from "@mui/system"
import { Play, Save } from "lucide-react"
import { getModulesBySourceId } from "../boter-db/db-util"

enum MenubarEvent {
  Save = 1,
  Run = 2
}

const menbarTheme = {
  whiteBg: 'rgb(255, 255, 255)',
  whiteColor: 'rgb(50, 49, 48)',
  whiteHover: 'rgb(243, 242, 241)',

  blackColor: '#f4f4f4',
  blackBg: '#2a2a2a',
  blackHover: '#3f3f3f'
}

const StyledItem = styled('div')(`
  font-size: 14px;
  font-weight: 400;
  box-sizing: border-box;
  border: none;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  padding: 0px 12px;
  border-radius: 0px;
  min-width: 40px;
  background-color: ${menbarTheme.blackBg};
  color: ${menbarTheme.blackColor};
  height: 100%;
  user-select: none;
  :hover {
    background-color: ${menbarTheme.blackHover};
    color: ;
  }
  :active {
    background-color: ${menbarTheme.blackHover};
    color: ${menbarTheme.blackColor};
  }
  `
)

const StyledSpan = styled('span')(`
  display: flex;
  height: 100%;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  `
)

interface IMenubar {
  id: string
}

export const EditorMenubar = ({ id }: IMenubar) => {

  const onMenubar = async (event: MenubarEvent) => {
    const modules = await getModulesBySourceId(id)
    switch (event) {
      case MenubarEvent.Save:
        if(modules?.length) {
          const saveRes = await editCodeByStgId({
            stgId: id,
            code: modules[0].code
          })
          if (saveRes.code === SUCCESS) {
            console.log('saveRes', saveRes)
          } else {
            alert(saveRes.msg)
          }
        }

        break;

      case MenubarEvent.Run:

        break;

      default:
        break;
    }
  }

  return <Box component={'header'}
    sx={{
      display: 'flex',
      height: '40px',
      paddingLeft: '30px',
      background: menbarTheme.blackBg
    }}>

    <StyledItem onClick={() => onMenubar(MenubarEvent.Save)}>
      <StyledSpan>
        <Box component={Save} size={20} sx={{ mr: '4px' }}></Box>
        Save
      </StyledSpan>
    </StyledItem>

    <StyledItem onClick={() => onMenubar(MenubarEvent.Run)}>
      <StyledSpan>
        <Box component={Play} size={20} sx={{ mr: '4px' }}></Box>
        Run
      </StyledSpan>
    </StyledItem>
  </Box>
}