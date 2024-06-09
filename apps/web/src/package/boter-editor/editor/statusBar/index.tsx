import { Box } from "@mui/system"
import { StatusBarItem } from "./statusBarItem"
import { VimStatusBarItem } from "./vimStatusBarItem"
import gitHubIcon from "@assets/gitHub.svg"

export const StatusBar = () => {

  return <Box sx={{
    display: 'flex',
    flexDirection: 'row',
    color: 'white',
    backgroundColor: '#007fd4',
    padding: '0 7px',
    justifyContent: 'space-between',
    height: '22px',
    boxSizing: 'border-box',
    width: '100%',
  }}>

    <div className={'StatusBar__side-left'}>
      {/* <StatusBarItem>
        StatusBar
      </StatusBarItem> */}

      <VimStatusBarItem />
    </div>

    <div className={'StatusBar__side-right'}>
      <StatusBarItem>
        <Box component={'img'}
          src={gitHubIcon}
          onClick={() => window.open('https://github.com/all-boter/boter/issues/new', '_blank')}
          sx={{ width: 16, height: 16, cursor: 'pointer' }} />
      </StatusBarItem>
    </div>
  </Box>
}