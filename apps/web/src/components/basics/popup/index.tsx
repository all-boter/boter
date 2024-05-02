import React from 'react';
import { Root, Trigger, Portal, Content, Close, Arrow } from '@radix-ui/react-popover';

interface Props {
  children?: JSX.Element
}

export function Popup(props: Props) {

  return (
    <Root>
      <Trigger asChild>
        <button className="IconButton" aria-label="Update dimensions">
          open
        </button>
      </Trigger>
      <Portal>
        <Content className="PopoverContent" sideOffset={5}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            content
          </div>
          <Close className="PopoverClose" aria-label="Close">
            close
          </Close>
          <Arrow className="PopoverArrow" />
        </Content>
      </Portal>
    </Root>
  );
}
