import { Root, Thumb } from '@radix-ui/react-switch';
import { Box, styled } from "@mui/system"
import { mainTheme } from '../muiColor';

const SwitchRoot = styled(Root)`
  position: relative;
  width: 42px;
  height: 25px;
  border: none;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 9999px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:focus {
    // box-shadow: 0 0 0 2px white;
  }

  &[data-state='checked'] {
    background-color: ${mainTheme.golden};
  }
`;

const SwitchThumb = styled(Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;

  &[data-state='checked'] {
    transform: translateX(19px);
  }
`;

interface ISwitch {
  isChecked: boolean
  onCheckedChange: (status: boolean) => void
}

export const Switch = ({ isChecked, onCheckedChange }: ISwitch) => {

  return <Box sx={{
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  }}>
    <Box
      component={SwitchRoot}
      checked={isChecked}
      onCheckedChange={(val) => onCheckedChange(val)}
    >
      <SwitchThumb />
    </Box>
  </Box>
}
