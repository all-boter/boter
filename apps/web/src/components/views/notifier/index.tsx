import { useRef } from "react"
import { Button } from "@/components/basics/button"
import { mainTheme } from "@/components/basics/mainColor"
import { Box } from "@mui/system"
import { NotifierList, NotifierListRef } from "./notifierList"

export const Notifier = () => {
  const notifierListRef = useRef<NotifierListRef>(null);

  const onCreate = () => {
    notifierListRef.current && notifierListRef.current.toggleDrawerUtil();
  }

  return <Box sx={{ width: '100%', mb: '20px' }}>
    <Box sx={{
      width: '85%',
      mx: '20px',
      mt: '20px',
      flexGrow: 1
    }}>
      <Box sx={{ width: '100%', mb: '20px' }}>
        <Box component={'span'} sx={{ mr: '10px', color: mainTheme.white }}>
          Notification channels
        </Box>

        <Button onClick={() => onCreate()} padding='6px 8px'>Create channel</Button>
      </Box>
    </Box>

    <NotifierList ref={notifierListRef} />
  </Box>
}