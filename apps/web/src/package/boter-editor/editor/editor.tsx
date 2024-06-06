import React, { useRef, useEffect } from 'react';
import MonacoEditor, { type Monaco } from '@monaco-editor/react'
import { KeyMod, KeyCode, editor, type IKeyboardEvent } from 'monaco-editor'
import { AppDispatch, useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { editorSlice, statusState } from '@/store/editorSlice';
import { Box } from '@mui/system';

interface Props {
}

export const Editor = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const status = useAppSelector(statusState)

  const onModifyloading = () => {
    dispatch(editorSlice.actions.modifyloading(status.loading))
  }

  return <div>
    <button onClick={onModifyloading}>modifyloading</button>
    <Box>
      {status.loading ? 'loading' : 'ok'}
    </Box>
  </div>
};

export default Editor;