import { Trigger, Root, ItemText, Content } from '@radix-ui/react-select';
import { Box, css, styled } from '@mui/system';
import { useLayoutEffect, useState } from 'react';
import { SelectItem, selectTheme } from '.';
import { CircleMinus, CirclePlus } from 'lucide-react';

interface IBoterSelect {
  options: any[]
  value?: any;
  onChange?: (event: any) => void
  minus: (id: string) => void
  label?: string
  id?: string
  width?: number
  children?: React.ReactNode
}

export const Dropdown = styled('div')(
  ({ theme }) => css`
    position: relative;
    box-sizing: border-box;
    width: 280px;
    font-family: sans-serif;
    font-size: 16px;
    border: 1px solid #bcbaba;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    pointer-events: all;
    background: ${selectTheme.whiteBg};
    color: ${selectTheme.whiteColor};
  `
);

export const NotifierSelect = (props: IBoterSelect) => {
  const { children, options, id = 'value', label = 'label', value, onChange, width } = props;
  const [internalValue, setInternalValue] = useState(value);

  useLayoutEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleValueChange = (newValue: string) => {
    onChange && onChange(newValue);
  };

  return (
    <Root
      dir="ltr"
      onValueChange={handleValueChange}
    >

      <Box sx={{ position: 'relative', px: '6px', pt: '4px', width: '280px', minHeight: '40px', background: '#111827', borderRadius: '10px' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', color: '#FFF' }}>
          {internalValue?.length ? Array.isArray(internalValue) && internalValue?.map((item: any) => {
            return <Box key={item.id} className='y-center' sx={{ mr: '10px', mb: '4px' }}>
              {item.name}
              <Box onClick={() => props.minus(item.id)} sx={{ pl: '2px', color: '#9e9e9e', cursor: 'pointer' }} component={CircleMinus} size={16} />
            </Box>
          }) : <Box sx={{ color: '#9ca3af' }}>
            Select notification
          </Box>}
        </Box>
        <Trigger asChild>
          <Box sx={{ position: 'relative', bottom: '0px', color: '#FFF' }}>
            <Box component={CirclePlus} size={22} />
          </Box>
        </Trigger>
      </Box>

      <Content position="popper" style={{ zIndex: '999' }}>
        <Dropdown>
          {children ? children : options.map((item, i) => (
            <SelectItem key={item[id] || i} value={item[id]}>
              <ItemText>{item[label]}</ItemText>
            </SelectItem>
          ))}
        </Dropdown>
      </Content>
    </Root>
  );
};