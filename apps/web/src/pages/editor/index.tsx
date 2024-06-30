import { BoterEditor } from "@/package/boter-editor/editor"
import { useParams } from "react-router-dom";
import PageNotFound from "../pageNotFound";

interface IEditor { }

export enum EditorSource {
  server = 'server',
  github = 'github'
}

export const Editor = (props: IEditor) => {
  const routerParams = useParams<{
    source: string,
    stgId: string
  }>();

  if (
    routerParams?.source === EditorSource.server ||
    routerParams?.source === EditorSource.github
  ) {
    return <BoterEditor editerType={routerParams?.source} stgId={routerParams.stgId} />
  } else {
    return <PageNotFound />;
  }
}