import React, { useRef, useEffect, useMemo } from 'react';
import MonacoEditor, { type Monaco } from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'
import { editor } from 'monaco-editor'
import { useAppSelector } from '@/store';
import { editorSettingsState, monacoSettingsState, vimState } from '@/store/editorSlice';
import { Box } from '@mui/system';
import { loadWorkspaceState } from '@/store/conifg/configWorkspace';
import { MonacoSettings } from '@/store/editorSlice/tpesMonaco';
import { getDefaultFontFamily, getFontFamily } from '@/store/conifg/fonts';
import { CodeFile } from '../utils';
import { boterCodeDb } from '../boter-db';
import { createVimModeAdapter } from './vim';

const setMonacoSettingsToOptions = (state: MonacoSettings, enableVimMode: boolean): monaco.editor.IEditorOptions => {
  const {
    selectOnLineNumbers,
    mouseWheelZoom,
    smoothScrolling,
    cursorBlinking,
    fontLigatures,
    contextMenu,
  } = state
  return {
    selectOnLineNumbers,
    mouseWheelZoom,
    smoothScrolling,
    cursorBlinking,
    cursorStyle: enableVimMode ? "block" : "line",
    fontLigatures,
    fontFamily: state.fontFamily ? getFontFamily(state.fontFamily) : getDefaultFontFamily(),
    showUnused: true,
    automaticLayout: true,
    minimap: { enabled: state.minimap },
    contextmenu: contextMenu,
  }
}

interface Props {
  codeFile: CodeFile
}

export const Editor = ({ codeFile }: Props) => {
  const editor = useRef<editor.IStandaloneCodeEditor>(null as any);
  const monacoSettings = useAppSelector(monacoSettingsState)
  const editorSettings = useAppSelector(editorSettingsState)
  const vim = useAppSelector(vimState)

  const options = useMemo(() => {
    return setMonacoSettingsToOptions(monacoSettings, editorSettings.enableVimMode)
  }, [monacoSettings])

  const editorDidMount = (editorInstance: editor.IStandaloneCodeEditor, monacoInstance: Monaco) => {
    editor.current = editorInstance
    const [vimAdapter, statusAdapter] = createVimModeAdapter(editorInstance)
    if (editorSettings.enableVimMode) {
      vimAdapter.attach()
    }
  }

  const onChange = async (newValue: string | undefined, _: editor.IModelContentChangedEvent) => {
    if (!newValue) {
      return
    }

    if (codeFile?.code_id) {
      await boterCodeDb.modules.update(codeFile.code_id, { code: newValue });
    } else {
      console.error('onChange error')
    }
  }

  useEffect(() => {
    if (editor.current && vim.mode) {
      editor.current.updateOptions({
        cursorStyle: monacoSettings.cursorStyle,
      })
    }
  }, [vim.mode])

  useEffect(() => {
    loadWorkspaceState()
  }, [])

  return <Box sx={{
    display: 'flex',
    width: '100%',
    minWidth: '500px',
  }}
  >
    <MonacoEditor
      loading={<Box >Loading editor...</Box>}
      // language={'js'}
      options={options}
      value={codeFile?.content}
      theme={editorSettings.darkMode ? 'vs-dark' : 'vs-light'}
      onMount={(e, m) => editorDidMount(e, m)}
      onChange={(newVal, e) => onChange(newVal, e)}
    />
  </Box>
};

export default Editor;