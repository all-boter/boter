import { VimMode, VimState, VimSubMode } from "@/store/editorSlice/typesVim"
import { StatusBarItem } from "./statusBarItem"
import { Nullable } from "@/common"
import { useAppSelector } from "@/store"
import { editorSettingsState, vimState } from "@/store/editorSlice"
import { useMemo } from "react"
import vimIcon from "@assets/vimIcon.svg"
import { Box } from "@mui/system"

const getItemText = (state: Nullable<VimState>): string => {
  if (!state) return ''
  const { mode, subMode, keyBuffer, commandStarted, confirmMessage } = state
  if (confirmMessage) {
    return confirmMessage.message
  }

  if (commandStarted) {
    return keyBuffer ?? ''
  }

  if (mode !== VimMode.Visual) {
    return `-- ${mode.toUpperCase()} --`
  }

  switch (subMode) {
    case VimSubMode.Linewise:
      return '-- VISUAL LINE --'
    case VimSubMode.Blockwise:
      return '-- VISUAL BLOCK --'
    default:
      return '-- VISUAL --'
  }
}

export const VimStatusBarItem = () => {
  const editorSettings = useAppSelector(editorSettingsState)
  const vim = useAppSelector(vimState)

  const text = useMemo<string>(() => {
    return getItemText(vim)
  }, [vim.mode])

  if (!vim || !editorSettings.enableVimMode) {
    return null
  }

  return <StatusBarItem>
    <Box component={'img'}
      src={vimIcon}
      sx={{ width: 16, height: 16, mr: '4px' }} />
    {text}
  </StatusBarItem>
}