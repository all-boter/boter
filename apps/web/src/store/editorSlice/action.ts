import store from "@/store";
import { editorSlice } from "@/store/editorSlice";
import { ConfirmMessage } from "./typesVim";
import { VimModeChangeArgs } from "@/package/boter-editor/editor/vim";

// =====Vim end=====
// =====Vim end=====
export const newVimInitAction = () => {
  // console.log('%c=newVimInitAction==>A', 'color:grey',)
  store.dispatch(editorSlice.actions.newVimInitAction());
}

export const newVimModeChangeAction = (mode: VimModeChangeArgs) => {
  // console.log('%c=newVimModeChangeAction==>A', 'color:grey',mode)
  store.dispatch(editorSlice.actions.newVimModeChangeAction(mode));
}

export const newVimDisposeAction = () => {
  // console.log('%c=newVimDisposeAction==>A', 'color:grey',)
  store.dispatch(editorSlice.actions.newVimDisposeAction());
}

export const newVimConfirmAction = (confirmMessage: ConfirmMessage) => {
  // console.log('%c=newVimConfirmAction==>', 'color:grey',)
  store.dispatch(editorSlice.actions.newVimConfirmAction(confirmMessage));
}

export const newVimCommandStartAction = (keyBuffer: string) => {
  // console.log('%c=newVimConfirmAction==>', 'color:grey',)
  store.dispatch(editorSlice.actions.newVimCommandStartAction(keyBuffer));
}

export const newVimCommandDoneAction = () => {
  // console.log('%c=newVimCommandDoneAction==>', 'color:grey',)
  store.dispatch(editorSlice.actions.newVimCommandDoneAction());
}

export const newVimKeyDeleteAction = () => {
  // console.log('%c=newVimKeyDeleteAction==>', 'color:grey',)
  store.dispatch(editorSlice.actions.newVimKeyDeleteAction());
}

export const newVimKeyPressAction = (key: string, replaceContents = false) => {
  // console.log('%c=newVimKeyPressAction==>', 'color:grey',)
  store.dispatch(editorSlice.actions.newVimKeyPressAction({ key, replaceContents }));
}
// =====Vim end=====
// =====Vim end=====