import Box from "@mui/system/Box"
import { ReactNode } from "react";
import { Nav } from "./Nav";
import { Sidebar } from "./Sidebar";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '100vh',
    width: '100%',
  }}>
    <Nav />

    <Box id='root-container' sx={{
      display: 'flex',
      flexGrow: '1',
      flexShrink: '1',
      flexBasis: '0',
      height: '100%',
      width: '100%',
    }}>
      <Sidebar />

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