import Box from "@mui/system/Box"
import { Logo } from "../logo"
import { UserMenu } from "../userMenu"
import { Menu } from "lucide-react"
import { Drawer } from "@/components/basics/drawer";
import { useDrawerContext } from "@/components/basics/drawer/drawerContext";
import { Sidebar } from "./Sidebar";

export const Nav = ({ isMobile }: { isMobile: boolean }) => {
  const { toggleDrawer } = useDrawerContext();

  return <Box component={'nav'} sx={{
    display: 'flex',
    justifyContent: 'space-between',
    height: '42px',
    width: '100%',
    boxSizing: 'border-box',
  }}>
    <Box sx={{ display: 'flex', alignItems: 'center', ml: '20px' }}>
      {isMobile && <Box
        onClick={() => toggleDrawer('NavDrawer')}
        component={Menu}
        size={22}
        color={'#FFF'}
        sx={{
          cursor: 'pointer',
          mr: '10px'
        }} />}
      <Logo />
    </Box>

    <UserMenu />

    <Drawer anchor={"left"} id="NavDrawer" width={220}>
      {isMobile && <Sidebar isMobile={isMobile} />}
    </Drawer>
  </Box>
}