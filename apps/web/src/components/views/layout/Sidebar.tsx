import { NavLink } from "react-router-dom";
import { Box, styled } from "@mui/system"
import { StgIcon } from "../../icon/stgIcon";
import { mainTheme } from "../../basics/mainColor";
import { BotIcon } from "../../icon/botIcon";
import { BellRing, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface StyledBoxProps {
  isActive: boolean;
}

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<StyledBoxProps>(({ isActive }) => ({
  paddingLeft: '8px',
  color: isActive ? '#FCD535' : '#FFF'
}));

export const Sidebar = ({ isMobile = false }: { isMobile?: boolean }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const SIDEBAR_WIDTH = isMobile ? '100%' : isOpen ? '10%' : '0px';

  return <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: SIDEBAR_WIDTH,
      minWidth: isOpen ? '190px' : SIDEBAR_WIDTH,
      transition: 'width 0.3s',
      height: '100%',
      paddingTop: {
        mobile: '20px',
        tablet: '0px',
        desktop: '0px'
      },
    }}>

    {!isMobile && <Box sx={{ position: 'absolute', zIndex: 1, left: '2px', bottom: '0px', cursor: 'pointer' }}
      onClick={handleToggleSidebar}>
      {isOpen ? <ChevronLeft color="#FFF" /> : <ChevronRight color="#FFF" />}
    </Box>}

    {isOpen && <>
      <NavLink
        className="navLink"
        to="/dashbord/strategies"
      >
        {({ isActive }) => (
          <>
            <StgIcon fill={isActive ? mainTheme.golden : '#FFF'} />
            <StyledBox component='span' isActive={isActive}>
              {t('myStg')}
            </StyledBox>
          </>
        )}
      </NavLink>

      <NavLink
        className="navLink"
        to="/dashbord/bots"
      >
        {({ isActive }) => (
          <>
            <BotIcon fill={isActive ? mainTheme.golden : '#FFF'} />
            <StyledBox component='span' isActive={isActive}>
              {t('myBots')}
            </StyledBox>
          </>
        )}
      </NavLink>

      <NavLink
        className="navLink"
        to="/dashbord/notifier"
      >
        {({ isActive }) => (
          <>
            <Box component={BellRing} size={20} sx={{
              color: isActive ? mainTheme.golden : '#FFF'
            }} />
            <StyledBox component='span' isActive={isActive}>
              {t('notiC')}
            </StyledBox>
          </>
        )}
      </NavLink>
    </>}
  </Box>
}
