import { Box } from "@mui/system"

enum MenubarEvent {
  Save = 1,
  Run = 2
}

export const EditorMenubar = () => {
  const onMenubar = (event: MenubarEvent) => {
    console.log('onSave', event)
  }

  return <Box component={'header'} 
  sx={{
    display: 'flex',
    height: '40px'
  }}>
    <Box onClick={() => onMenubar(MenubarEvent.Save)}>
      Save
    </Box>
    <Box onClick={() => onMenubar(MenubarEvent.Run)}>
      Run
    </Box>
  </Box>
}