import { config } from '.'
import { WorkspaceState, defaultFileName, defaultFiles } from '../editorSlice/typesWorkspace'

const CONFIG_KEY = 'workspace.state'

const defaultWorkspace: WorkspaceState = {
  selectedFile: defaultFileName,
  files: defaultFiles,
}

export const saveWorkspaceState = (state: WorkspaceState) => {
  console.log('%c=saveWorkspaceState', 'color:black')
  const sanitized = sanitizeState(state)
  if (!sanitized.files || Object.keys(sanitized.files).length === 0) {
    // Truncate saved state if workspace is empty.
    config.delete(CONFIG_KEY)
    return
  }

  config.setObject(CONFIG_KEY, sanitized)
}

export const loadWorkspaceState = (): WorkspaceState => {
  console.log('%c=初始化-sanitizeState -1 ', 'color:black')
  return sanitizeState(config.getObject(CONFIG_KEY, defaultWorkspace))
}

const sanitizeState = (state: WorkspaceState) => {
  console.log('%c=初始化-sanitizeState -2', 'color:black')
  // Skip current snippet URL.
  const { selectedFile, files } = state

  if (!files) {
    // Save defaults if ws is empty.
    return defaultWorkspace
  }

  return { selectedFile, files }
}
