import React from 'react';
import { Box, styled } from '@mui/system';
import Cookies from 'js-cookie';
import { muiGreen } from '../../basics/mainColor';
import { Loginbtn } from '../loginBtn';
import { useNavigate } from 'react-router-dom';
import gitHubIcon from "@assets/gitHub.svg"
import googleIcon from "@assets/google.svg"
import launchIcon from "@assets/launch.svg"
import { isJwtExpired } from '@/common';
import { githubAuthUrl, googleAuthUrl, TOKEN_FIELD } from '@/common/constants';
import { useTranslation } from 'react-i18next';

const LaunchBtn = styled('a')(
  ({ theme }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  cursor: pointer;
  border-radius: 6px;
  border: 2px solid ${muiGreen['limeGreen']};
  padding: 0px 16px;
  font-weight: 600;
  font-size: 0.875rem;
  background-color: transparent;
  font-family: 'IBM Plex Sans', sans-serif;
  color: ${muiGreen['limeGreen']};
  transition: all 150ms ease;
  text-decoration: none;

  &:hover {
    background-color: rgba(111, 213, 114, .2);
    opacity: 0.9;
  }`,
);

export function HomeBtns() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onLaunch = () => {
    navigate('/dashbord/strategies');
  }

  return <>
    {
      Cookies.get(TOKEN_FIELD) && isJwtExpired(Number(Cookies.get('exp'))) ? <LaunchBtn onClick={() => onLaunch()}>
        {t('launchApp')}
        <Box component={'img'} src={launchIcon} sx={{ width: 22, height: 22, pr: '6px' }} />
      </LaunchBtn> : <>
        <Loginbtn url={githubAuthUrl} style={{ marginRight: '10px' }}>
          <Box component={'img'} src={gitHubIcon} sx={{ width: 22, height: 22, pr: '6px' }} />
          {t('loginWGitHub')}
        </Loginbtn>

        <Loginbtn style={{ marginLeft: '10px', position: 'relative' }} url={googleAuthUrl}>
          <Box component={'img'} src={googleIcon} sx={{ position: 'relative', top: '3px', width: 22, height: 22, pr: '6px' }} />
          {t('loginWGoogle')}
        </Loginbtn>
      </>
    }
  </>
}