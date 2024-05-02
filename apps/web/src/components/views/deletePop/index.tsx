import { Root, Trigger, Portal, Content, Close, Arrow } from '@radix-ui/react-popover';
import { TriggerBtn } from '@/components/basics/button/triggerBtn';

export const DeletePop = () => {
  return <Root>
    <Trigger asChild>
      <TriggerBtn color={'#0ecb81'} size={'small'}>
        test
      </TriggerBtn>
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
}