import React, { useRef, useEffect, useMemo } from 'react';
import MonacoEditor, { type Monaco } from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'
import { KeyMod, KeyCode, editor, type IKeyboardEvent } from 'monaco-editor'
import { AppDispatch, useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { editorSettingsState, editorSlice, monacoSettingsState, statusState } from '@/store/editorSlice';
import { Box } from '@mui/system';
import { loadWorkspaceState } from '@/store/conifg/configWorkspace';
import { MonacoSettings } from '@/store/editorSlice/tpesMonaco';
import { getDefaultFontFamily, getFontFamily } from '@/store/conifg/fonts';

const LANGUAGE_GOLANG = 'go'

const setMonacoSettingsToOptions = (state: MonacoSettings): monaco.editor.IEditorOptions => {
  const {
    selectOnLineNumbers,
    mouseWheelZoom,
    smoothScrolling,
    cursorBlinking,
    fontLigatures,
    cursorStyle,
    contextMenu,
  } = state
  return {
    selectOnLineNumbers,
    mouseWheelZoom,
    smoothScrolling,
    cursorBlinking,
    cursorStyle,
    fontLigatures,
    fontFamily: state.fontFamily ? getFontFamily(state.fontFamily) : getDefaultFontFamily(),
    showUnused: true,
    automaticLayout: true,
    minimap: { enabled: state.minimap },
    contextmenu: contextMenu,
  }
}


interface Props {
}

export const Editor = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const status = useAppSelector(statusState)
  const monacoSettings = useAppSelector(monacoSettingsState)
  const editorSettings = useAppSelector(editorSettingsState)

  const onModifyloading = () => {
    dispatch(editorSlice.actions.modifyloading(status.loading))
  }

  const options = useMemo(() => {
    const options = setMonacoSettingsToOptions(monacoSettings)
    console.log('%c=editor-options==>', 'color:red', { monacoSettings, options })

    return options
  }, [monacoSettings])

  useEffect(() => {
    const workspaceState = loadWorkspaceState()
    console.log('%c=editor-useEffect:', 'color:red', workspaceState)
  }, [])

  return <>
  <Box sx={{
    display: 'flex',
    width: '100%',
    minWidth: '500px',
  }}>
    <MonacoEditor
      language={LANGUAGE_GOLANG}
      options={options}
      theme={editorSettings.darkMode ? 'vs-dark' : 'vs-light'}
    />
  </Box>
</>
};

export default Editor;