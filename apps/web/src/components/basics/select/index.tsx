import { Trigger, Root, ItemText, Content, Item, Icon } from '@radix-ui/react-select';
import { Box, css, styled } from '@mui/system';
import arrowIcon from "@assets/arrow.svg"
import { useLayoutEffect, useMemo, useState } from 'react';

interface ICss {
  width: number
  theme?: any
}

const selectTheme = {
  whiteBg: 'rgb(255, 255, 255)',
  whiteColor: 'rgb(9, 9, 11)',
  whiteHover: 'hsl(240 4.8% 95.9%)',

  blackColor: '#fff',
  blackBg: '#2a2a2a',
  blackHover: '#35363a'
}

export const SelectItem = styled(Item)(
  ({ theme }) => css`
    cursor: pointer;
    padding: 8px;
    outline: none;
    font-size: 14px;
    transition: background ease 300ms;
    border-radius: 6px;
    &:focus {
      background: ${selectTheme.whiteHover};
    }
  `
);

const Dropdown = styled('div')(
  ({ theme, width }: ICss) => css`
    position: relative;
    box-sizing: border-box;
    width: ${width ? width + 'px' : '180px'};
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

const RadixSelTrigger = styled('div')(
  ({ theme, width }: ICss) => css`
    position: relative;
    cursor: pointer;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    width: ${width ? width + 'px' : '100%'};
    box-sizing: border-box;
    padding: 18px;
    height: 32px;
    font-size: 14px;
    font-family: sans-serif;
    border-radius: 6px;
    outline: none;
    background: ${selectTheme.whiteBg};
    color: ${selectTheme.whiteColor};
  `
);

interface IBoterSelect {
  options: any[]
  value?: any;
  onChange?: (event: any) => void
  label?: string
  id?: string
  width?: number
  children?: React.ReactNode
}

export const BoterSelect = (props: IBoterSelect) => {
  const { children, options, id = 'value', label = 'label', value, onChange, width } = props;
  const [internalValue, setInternalValue] = useState(value);

  useLayoutEffect(() => {
    setInternalValue(value);
  }, [value]);

  const labelView = useMemo<string>(() => {
    if (!internalValue) return '';

    return options.find((item) => item[id] === internalValue)?.[label] || '';
  }, [internalValue, options, id, label]);

  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <Root
      value={internalValue}
      dir="ltr"
      onValueChange={handleValueChange}
    >
      <Trigger asChild>
        <RadixSelTrigger width={width || 0}>
          <Box component={'span'}>{labelView}</Box>
          <Icon asChild>
            <Box component={'img'} src={arrowIcon} sx={{ width: 22, height: 22, pr: '6px' }} />
          </Icon>
        </RadixSelTrigger>
      </Trigger>

      <Content position="popper" style={{ zIndex: '999' }}>
        <Dropdown width={width || 0}>
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