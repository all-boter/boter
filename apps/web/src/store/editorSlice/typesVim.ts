export enum VimMode {
  Visual = 'visual',
  Normal = 'normal',
  Insert = 'insert',
  Replace = 'replace',
}

export enum VimSubMode {
  Linewise = 'linewise',
  Blockwise = 'blockwise',
}

export type ConfirmMessage = VimState['confirmMessage']

export interface VimState {
  mode: VimMode
  subMode: VimSubMode
  keyBuffer?: string
  commandStarted?: boolean
  confirmMessage?: {
    type: 'error' | 'default'
    message: string
  }
}