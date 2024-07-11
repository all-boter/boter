import { useRef } from "react"
import { Button } from "@/components/basics/button"
import { mainTheme } from "@/components/basics/mainColor"
import { Box } from "@mui/system"
import { NotifierList, NotifierListRef } from "./notifierList"
import { useTranslation } from "react-i18next"

export const Notifier = () => {
  const { t } = useTranslation();
  const notifierListRef = useRef<NotifierListRef>(null);

  const onCreate = () => {
    notifierListRef.current && notifierListRef.current.toggleDrawerUtil();
  }

  return <>
    <Box sx={{ mb: '10px', fontWeight: '600', fontSize: '20px' }}>
      <Box component={'span'} sx={{ mr: '10px', color: mainTheme.white }}>
        {t('notiC')}
      </Box>

      <Button onClick={() => onCreate()} padding='6px 8px'>
        {t('createNoti')}
      </Button>
    </Box>

    <NotifierList ref={notifierListRef} />
  </>
}