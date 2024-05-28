import { useState } from 'react';
import { Trigger, Root, ItemText, Content, Item, Icon } from '@radix-ui/react-select';
import { Box, css, styled } from '@mui/system';
import arrowIcon from "@assets/arrow.svg"
import './radixSelect.css'

const options = ["Item 1", "Item 2", "Item 3", "Item 4"];

const RadixItem = styled(Item)(
  ({ theme }) => css`
    padding: 8px;
    outline: none;
    transition: background ease 300ms;
    border-radius: 4px;
    &:focus {
      background: #35363a;
    }
  `
);

const Dropdown = styled('div')(
  ({ theme }) => css`
    position: relative;
    box-sizing: border-box;
    color: #fff;
    padding: 16px 8px;
    font-family: sans-serif;
    font-size: 16px;
    background: #2a2a2a;
    border: 1px solid #1b1b1b;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    pointer-events: all;
  `
);

const RadixSelTrigger = styled('div')(
  ({ theme }) => css`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    background: #2a2a2a;
    padding: 16px;
    font-size: 16px;
    font-family: sans-serif;
    border: 1px solid '#df6c75';
    border-radius: 4px;
    outline: none;
    color: #fff;
  `
);

export const RadixSelect = () => {
  const [value, setValue] = useState('light');

  return <Root value={value} dir="ltr" onValueChange={setValue}>
    <Trigger asChild>
      <RadixSelTrigger>
        <Box component={'span'}>{value}</Box>
        <Icon asChild>
          <Box component={'img'} src={arrowIcon} sx={{ width: 22, height: 22, pr: '6px' }} />
        </Icon>
      </RadixSelTrigger>
    </Trigger>

    <Content position="popper">
      <Dropdown>
        {options.map((item, i) => {
          return (
            <RadixItem key={i} value={item}>
              <ItemText> {item} </ItemText>
            </RadixItem>
          );
        })}
      </Dropdown>
    </Content>
  </Root>
}