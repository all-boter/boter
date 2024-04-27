import { BoterEditor } from "@/package/boter-editor/editor"

interface IEditor { }

export const Editor = (props: IEditor) => {

  return <div style={{ display: 'flex', height: '100vh', background: 'grey' }}>
    <BoterEditor />
  </div>
}