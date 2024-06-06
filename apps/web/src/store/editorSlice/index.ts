import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "..";
import { IEditor } from "./types";
import { config } from "../conifg";
import { initialTerminalState } from "./typesTerminal";
import { initialWorkspaceState } from "./typesWorkspace";

const initialState: IEditor = {
  status: {
    loading: true,
  },
  settings: {
    darkMode: config.darkThemeEnabled,
    autoFormat: true,
    useSystemTheme: config.useSystemTheme,
    enableVimMode: config.enableVimMode,
    goProxyUrl: config.goProxyUrl,
  },
  runTarget: config.runTargetConfig,
  monaco: config.monacoSettings,
  panel: config.panelLayout,
  notifications: {},
  vim: null,
  terminal: initialTerminalState,
  workspace: initialWorkspaceState,
}

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    modifyloading: (state, action: PayloadAction<boolean>) => {
      state.status.loading = !action.payload

      return state;
    },
  }
});

export const statusState = (state: AppState) => state.editorSlice.status