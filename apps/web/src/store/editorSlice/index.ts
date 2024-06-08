import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "..";
import { IEditor, PanelState } from "./types";
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
    changePanelLayout: (state, action: PayloadAction<PanelState>) => {
      console.log('%c=changePanelLayout:', 'color:red', action.payload)

      state.panel = {
        ...state.panel,
        ...action.payload,
      }

      return state;
    }
  }
});

export const statusState = (state: AppState) => state.editorSlice.status
export const monacoSettingsState = (state: AppState) => state.editorSlice.monaco
export const editorSettingsState = (state: AppState) => state.editorSlice.settings
export const panelState = (state: AppState) => state.editorSlice.panel