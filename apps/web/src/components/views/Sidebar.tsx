import { NavLink } from "react-router-dom";
import { Box } from "@mui/system"
import { Logo } from "./logo";
import { StgIcon } from "../icon/stgIcon";
import { mainTheme } from "../basics/mainColor";
import { BotIcon } from "../icon/botIcon";
import { BellRing } from "lucide-react";

export const Sidebar = () => {
  return <Box sx={{ display: 'flex', flexDirection: 'column', width: '15%', minWidth: '280px', borderRight: '1px solid #374151' }}>
    <Box className='y-center' sx={{ height: '68px', ml: '20px' }}>
      <Logo />
    </Box>

    <NavLink
      className="navLink"
      to="/dashbord/strategies"
    >
      {({ isActive }) => (
        <>
          <StgIcon fill={isActive ? mainTheme.golden : '#FFF'} />
          <Box component={'span'} sx={{ pl: '8px', color: isActive ? '#FCD535' : '#FFF' }}>My Strategies</Box>
        </>
      )}
    </NavLink>

    <NavLink
      className="navLink"
      to="/dashbord/bots"
    >
      {({ isActive }) => (
        <>
          <BotIcon fill={isActive ? mainTheme.golden : '#FFF'} />
          <Box component={'span'} sx={{ pl: '8px', color: isActive ? '#FCD535' : '#FFF' }}>My Bots</Box>
        </>
      )}
    </NavLink>

    <NavLink
      className="navLink"
      to="/dashbord/notifier"
    >
      {({ isActive }) => (
        <>
          <Box component={BellRing} size={20} sx={{
            color: isActive ? mainTheme.golden : '#FFF'
          }} />
          <Box component={'span'} sx={{ pl: '8px', color: isActive ? '#FCD535' : '#FFF' }}>Notification</Box>
        </>
      )}
    </NavLink>
  </Box>
}
