import { defaultPanelProps } from "@/package/boter-editor/editor/constants"
import { MonacoSettings, defaultMonacoSettings } from "../editorSlice/tpesMonaco"
import { PanelState } from "../editorSlice/types"
import { RunTargetConfig, defaultRunTarget } from "../editorSlice/typesRunTargetConfig"
import { DarkTheme, LightTheme } from "./colors"
import { supportsPreferColorScheme } from "./theme"

const DARK_THEME_KEY = 'ui.darkTheme.enabled'
const USE_SYSTEM_THEME_KEY = 'ui.darkTheme.useSystem'
const RUN_TARGET_KEY = 'go.build.target'
const ENABLE_VIM_MODE_KEY = 'ms.monaco.vimModeEnabled'
const AUTOFORMAT_KEY = 'go.build.autoFormat'
const MONACO_SETTINGS = 'ms.monaco.settings'
const PANEL_SETTINGS = 'ui.layout.panel'
const GOPROXY_URL = 'go.env.GOPROXY'

const setThemeStyles = (isDark: boolean) => isDark ? DarkTheme : LightTheme

// TODO: move key operations to store.

export const config = {
  _cache: new Map<string, any>(),

  get darkThemeEnabled(): boolean {
    return this.getBoolean(DARK_THEME_KEY, false)
  },

  set darkThemeEnabled(enable: boolean) {
    this.setBoolean(DARK_THEME_KEY, enable)
  },

  get useSystemTheme() {
    return this.getBoolean(USE_SYSTEM_THEME_KEY, supportsPreferColorScheme())
  },

  set useSystemTheme(val: boolean) {
    this.setBoolean(USE_SYSTEM_THEME_KEY, val)
  },

  get enableVimMode() {
    return this.getBoolean(ENABLE_VIM_MODE_KEY, true)
  },

  set enableVimMode(val: boolean) {
    this.setBoolean(ENABLE_VIM_MODE_KEY, val)
  },

  get goProxyUrl() {
    return this.getString(GOPROXY_URL, 'https://proxy.golang.org')
  },

  set goProxyUrl(newVal: string) {
    this.setString(GOPROXY_URL, newVal)
  },

  get runTargetConfig(): RunTargetConfig {
    return this.getObject<RunTargetConfig>(RUN_TARGET_KEY, defaultRunTarget)
  },

  set runTargetConfig(newVal: RunTargetConfig) {
    this.setObject(RUN_TARGET_KEY, newVal)
  },

  get autoFormat(): boolean {
    return this.getBoolean(AUTOFORMAT_KEY, true)
  },

  set autoFormat(v: boolean) {
    this.setBoolean(AUTOFORMAT_KEY, v)
  },

  get monacoSettings(): MonacoSettings {
    return this.getObject<MonacoSettings>(MONACO_SETTINGS, defaultMonacoSettings)
  },

  set monacoSettings(m: MonacoSettings) {
    this.setObject(MONACO_SETTINGS, m)
  },

  get panelLayout(): PanelState {
    return this.getObject<PanelState>(PANEL_SETTINGS, {
      ...defaultPanelProps,
    })
  },

  set panelLayout(v: PanelState) {
    this.setObject(PANEL_SETTINGS, v)
  },

  getString<T = string>(key: string, defaultVal: T) {
    if (this._cache.has(key)) {
      return this._cache.get(key)
    }

    const val = localStorage.getItem(key)
    return (val ?? defaultVal) as T
  },

  setString(key: string, val: string) {
    this._cache.set(key, val)
    localStorage.setItem(key, val)
  },

  getBoolean(key: string, defVal: boolean): boolean {
    if (this._cache.has(key)) {
      return this._cache.get(key)
    }

    const val = localStorage.getItem(key)
    if (!val) {
      return defVal
    }

    return val === 'true'
  },

  setBoolean(key: string, val: boolean) {
    this._cache.set(key, val)
    localStorage.setItem(key, val.toString())
  },

  getObject<T>(key: string, fallback: T): T {
    if (this._cache.has(key)) {
      return this._cache.get(key) as T
    }

    const val = localStorage.getItem(key)
    if (!val) {
      this._cache.set(key, fallback)
      return fallback
    }

    try {
      const obj = JSON.parse(val) as T
      const result = fallback ? { ...fallback, ...obj } : obj
      this._cache.set(key, result)
      return result
    } catch (err) {
      console.warn(`failed to read settings key ${key}`, err)
      this._cache.set(key, fallback)
      return fallback
    }
  },

  setObject<T>(key: string, val: T) {
    this._cache.set(key, val)
    try {
      localStorage.setItem(key, JSON.stringify(val))
    } catch (err) {
      console.error(`Failed to save ${key} property to localStorage:`, err)
    }
  },

  delete(key: string) {
    localStorage.removeItem(key)
  },

  sync() {
    setThemeStyles(this.darkThemeEnabled)
  },

  forceRefreshPage() {
    // document.location.reload(true);
  },
}
