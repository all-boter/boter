import React from 'react';
import Box from '@mui/system/Box';
import { githubAuthUrl, googleAuthUrl } from '../common/constants';
import { Loginbtn } from '../components/views/loginBtn';
import logo from "../assets/logo.svg"
import gitHubIcon from "../assets/gitHub.svg"
import googleIcon from "../assets/google.svg"

function App() {
  // const navigate = useNavigate();
  // const onLogin = () => {
  //   navigate('/login');
  // }

  return (
    <Box sx={{ bgcolor: '#111827', height: '100%' }}>
      <Box>
        <Box component={'nav'} sx={{ display: 'flex', alignItems: 'center', height: '68px', pl: 1, color: '#f3f4f6', fontSize: 24 }}>
          <Box component={'img'} src={logo} sx={{ width: 28, height: 28, pr: '2px' }} />
          Boter
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '70vh' }}>
          <Box sx={{
            bgcolor: {
              mobile: 'green',
              tablet: 'blue',
              desktop: 'red',
            },
            fontSize: {
              mobile: '48px',
              desktop: '100px'
            }
          }
          }>Discover / build</Box>
          <Box sx={{
            fontSize: {
              mobile: '48px',
              desktop: '100px'
            }
          }}>Interesting Bots</Box>
          <Box sx={{ width: '60%', textAlign: 'center', fontSize: '20px', color: '#d1d5db' }}>Boter is a Bot as a service platform, Your can discover some interesting bot, or build your own bot with our tools</Box>

          <Box sx={{ display: 'flex', mt: '20px' }}>
            <Loginbtn url={githubAuthUrl}>
              <Box component={'img'} src={gitHubIcon} sx={{ width: 22, height: 22, pr: '6px' }} />
              Login with GitHub
            </Loginbtn>

            <Loginbtn style={{ marginLeft: '10px', position: 'relative' }} url={googleAuthUrl}>
              <Box component={'img'} src={googleIcon} sx={{ position: 'relative', top: '3px', width: 22, height: 22, pr: '6px' }} />
              Login with GitHub
            </Loginbtn>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
