import { Provider, Root, Title, Viewport, Description, Action } from '@radix-ui/react-toast';
import { useContext } from 'react';
import { ToastContext, ToastType } from './toastContext';
import { Box, styled } from '@mui/system';
import { Check, Info, X } from 'lucide-react';
import './toast.css'

/**
 * Usage:
 * const { showToast } = useContext(ToastContext)!;
 * showToast('hello!')
*/
const StyledTitle = styled(Title)`
  display: flex;
  grid-area: title;
  font-weight: 500;
  color: #1c2024;
  font-size: 15px;
`;

const StyledContainer = styled('div')`
  width: 20px;
  height: 20px;
`;

export const Toast: React.FC = () => {
  const { toasts } = useContext(ToastContext)!;

  const renderIcon = (toastType: ToastType) => {
    if (toastType === ToastType.success) {
      return <StyledContainer>
        <Check size={20} />
      </StyledContainer>
    } else if (toastType === ToastType.error) {
      return <StyledContainer>
        <X size={20} />
      </StyledContainer>
    } else if (toastType === ToastType.info) {

      return <StyledContainer>
        <Info size={20} />
      </StyledContainer>
    }

    return null
  }

  return (
    <>
      {toasts.map((toast, index) => (
        <Provider key={index} duration={toast?.duration || 3000}>
          <Root className={'ToastRoot' + (toast?.direction || 'Up')}>
            <StyledTitle>
              {renderIcon(toast.type)}
              <Box sx={{
                pl: '6px'
              }}>
                {toast.msg}
              </Box>
            </StyledTitle>
          </Root>

          <Viewport className={'ToastViewport' + (toast?.direction || 'Up')} />
        </Provider>
      ))}
    </>
  );
};
