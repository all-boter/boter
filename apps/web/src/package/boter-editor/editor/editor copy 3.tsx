import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import { CodeFile } from '../utils';
import { Vimer } from 'boter-vim'

interface Props {
  // codeFile: CodeFile
  // defaultValue: any
  // language: string
  // onChange: (codeFile: CodeFile) => void
}

// export const Editor = ({ codeFile, language, onChange, defaultValue }: Props) => {
export const Editor = () => {
  const divEl = useRef<HTMLDivElement>(null);
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>(null as any);
  const codeFileRef = useRef<any>('');

  useEffect(() => {
    if (divEl.current) {
      editor.current = monaco.editor.create(divEl.current, {
        value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
        // language: 'typescript'
        language: 'javascript'
      });

      editor.current.focus();
      Vimer.initVim(editor.current, divEl.current);

      editor.current.onDidChangeModelContent((event) => {
        const value = editor.current.getValue();
        // onChange({ ...codeFileRef.current, content: value });
      });
    }

    return () => {
      editor.current.dispose();
    };
  }, []);

  // useEffect(() => {
  //   if (codeFile) {
  //     codeFileRef.current = codeFile;
  //     editor.current.setValue(codeFile.content);
  //   }
  // }, [codeFile]);

  return <div style={{
    // width: '70%',
    width: '100%',
    height:"calc(100% - 22px)",
    boxSizing: 'border-box'
  }} ref={divEl}
  />;
};

export default Editor;