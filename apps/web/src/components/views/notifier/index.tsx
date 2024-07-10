import { useRef } from "react"
import { Button } from "@/components/basics/button"
import { mainTheme } from "@/components/basics/mainColor"
import { Box } from "@mui/system"
import { NotifierList, NotifierListRef } from "./notifierList"
import { UserMenu } from "../userMenu"

export const Notifier = () => {
  const notifierListRef = useRef<NotifierListRef>(null);

  const onCreate = () => {
    notifierListRef.current && notifierListRef.current.toggleDrawerUtil();
  }

  return <Box sx={{
    width: '85%',
    mx: '20px',
    flexGrow: 1
  }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <Box sx={{ mt: '14px', fontWeight: '700', fontSize: '20px' }}>
        <Box component={'span'} sx={{ mr: '10px', color: mainTheme.white }}>
          Notification channels
        </Box>

        <Button onClick={() => onCreate()} padding='6px 8px'>Create channel</Button>
      </Box>

      <UserMenu />
    </Box>

    <NotifierList ref={notifierListRef} />
  </Box>
}