import Box from "@mui/system/Box"
import { Logo } from "../logo"
import { UserMenu } from "../userMenu"

export const Nav = () => {
  return <Box component={'nav'} sx={{
    display: 'flex',
    justifyContent: 'space-between',
    height: '40px',
    width: '100%',
  }}>
    <Logo />

    <UserMenu />
  </Box>
}