import Box from "@mui/system/Box"
import { ReactNode } from "react";
import { Nav } from "./Nav";
import { Sidebar } from "./Sidebar";
import { useMediaQuery } from "@mui/system";
import { DrawerProvider } from "@/components/basics/drawer/drawerContext";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('tablet'));

  return <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '100vh',
    width: '100%',
  }}>
    <DrawerProvider>
      <Nav isMobile={isMobile} />
    </DrawerProvider>

    <Box sx={{
      display: 'flex',
      flexGrow: '1',
      flexShrink: '1',
      flexBasis: '0',
      height: '100%',
      width: '100%',
    }}>
      {!isMobile && <Sidebar />}

      <Box
        sx={{
          flexGrow: '1',
          flexShrink: '1',
          flexBasis: '0',
          overflow: 'auto',
          pr: '20px',
          pl: '20px'
        }}>
        {children}
      </Box>
    </Box>
  </Box>
}