import { Trigger, Root, ItemText, Content, Item, Icon } from '@radix-ui/react-select';
import { Box, css, styled } from '@mui/system';
import arrowIcon from "@assets/arrow.svg"
import { useMemo } from 'react';

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

const RadixItem = styled(Item)(
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
}

export const BoterSelect = (props: IBoterSelect) => {
  const { options, id = 'value', label = 'label', value, onChange } = props

  const labelView = useMemo<string>(() => {
    if (!value) return ''

    return options.find((item) => {
      return item[id] === value
    })?.[label] || ''
  }, [value])

  return <Root
    value={value}
    dir="ltr"
    onValueChange={onChange && onChange}
  >
    <Trigger asChild>
      <RadixSelTrigger width={props.width || 0}>
        <Box component={'span'}>{labelView}</Box>
        <Icon asChild>
          <Box component={'img'} src={arrowIcon} sx={{ width: 22, height: 22, pr: '6px' }} />
        </Icon>
      </RadixSelTrigger>
    </Trigger>

    <Content position="popper">
      <Dropdown width={props.width || 0}>
        {options.map((item, i) => {
          return (
            <RadixItem key={item[id] || i} value={item[id]}>
              <ItemText> {item[label]} </ItemText>
            </RadixItem>
          );
        })}
      </Dropdown>
    </Content>
  </Root>
}