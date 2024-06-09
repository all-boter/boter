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
import { CodeFile } from '../utils';
import { DEFAULT_LANGUAGE } from './constants';
import { boterCodeDb } from '../boter-db';
import { modifyloadingAciton } from '@/store/editorSlice/action';
import { createVimModeAdapter } from './vim';

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
  codeFile: CodeFile
}

export const Editor = ({ codeFile }: Props) => {
  const status = useAppSelector(statusState)
  const monacoSettings = useAppSelector(monacoSettingsState)
  const editorSettings = useAppSelector(editorSettingsState)

  const onModifyloading = () => {
    // dispatch(editorSlice.actions.modifyloading(status.loading))
    modifyloadingAciton(status.loading)
  }

  const options = useMemo(() => {
    const options = setMonacoSettingsToOptions(monacoSettings)
    console.log('%c=editor-options==>', 'color:red', { monacoSettings, options })

    return options
  }, [monacoSettings])

  const editorDidMount = (editorInstance: editor.IStandaloneCodeEditor, monacoInstance: Monaco) => {
    console.log('%c=editorDidMount', 'color:grey', { editorInstance, monacoInstance })
    console.log('%c=editorDidMount - enableVimMode', 'color:grey', editorSettings.enableVimMode)
    // editorInstance.onKeyDown((e) => this.onKeyDown(e))
    const [vimAdapter, statusAdapter] = createVimModeAdapter(editorInstance)
    if(editorSettings.enableVimMode){
      // console.log('%c=Vim mode enabled','color:green',{
      //   vimAdapter,
      //   statusAdapter
      // })

      vimAdapter.attach()
      // Vimer.initVim(editorInstance,null as any);
    }
  }

  const onChange = async (newValue: string | undefined, _: editor.IModelContentChangedEvent) => {
    if (!newValue) {
      return
    }

    // void this.debouncedAnalyzeFunc(fileName, code)
    if (codeFile?.code_id) {
      console.log('%c=onChange===>', 'color:grey',codeFile.code_id)
      await boterCodeDb.modules.update(codeFile.code_id, { code: newValue });
    } else {
      console.error('onChange error')
    }
  }

  useEffect(() => {
    const workspaceState = loadWorkspaceState()
    console.log('%c=editor-useEffect:', 'color:red', workspaceState)
  }, [])

  return <Box sx={{
    display: 'flex',
    width: '100%',
    minWidth: '500px',
  }}
  >
    {/* <button onClick={onModifyloading}>test action</button>
    { status.loading ?'loading': 'ok'} */}
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