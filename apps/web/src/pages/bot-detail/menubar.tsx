import { mainTheme } from "@/components/basics/mainColor";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Save } from "lucide-react"
import { MenubarItem } from "@/components/views/menubarItem";

enum MenubarEvent {
  Restart = 1,
  Stop = 2,
  Params = 3,
  Back = 4
}

interface Props {
  botId: string
}

export const BotMenubar = ({botId }: Props) => {
  const navigate = useNavigate();

  const onMenubar = async (event: MenubarEvent) => {
    switch (event) {
      case MenubarEvent.Restart:

        break;

      case MenubarEvent.Stop:

        break;

      case MenubarEvent.Params:

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


    <MenubarItem onClick={() => onMenubar(MenubarEvent.Restart)}>
      <Box component={Save} size={20} sx={{ mr: '4px' }} />
      Restart 
    </MenubarItem>

    <MenubarItem onClick={() => onMenubar(MenubarEvent.Stop)}>
      <Box component={Save} size={20} sx={{ mr: '4px' }} />
       Stop
    </MenubarItem>

    <MenubarItem onClick={() => onMenubar(MenubarEvent.Params)}>
      <Box component={Play} size={20} sx={{ mr: '4px' }} />
      Bot Params
    </MenubarItem>
  </Box>
}