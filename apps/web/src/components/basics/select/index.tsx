import { forwardRef } from 'react';
import {
  Select as BaseSelect,
  SelectProps,
  selectClasses,
  SelectRootSlotProps,
} from '@mui/base/Select';
import { Option as BaseOption, optionClasses } from '@mui/base/Option';
import { styled } from '@mui/system';
import { ChevronsDownUp } from 'lucide-react';
import { muiBlue, muiGrey } from '../muiColor';

interface ISelectProps<T = unknown> {
  value?: T | any;
  defaultValue?: T | any;
  placeholder?: React.ReactNode;
  options: any[]
  onChange?: (event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null, value: any) => void;
  label?: string
  id?: string
}

export function Select(props: ISelectProps) {
  const { options, onChange, value, id = 'value', label = 'label' } = props

  return (
    <SelectOrgin
      value={value}
      onChange={onChange && onChange}
    >
      {options.map((c) => (
        <Option key={c[id]} value={c}>
          {c[label]}
        </Option>
      ))}
    </SelectOrgin>
  );
}

function SelectOrgin<TValue extends {}, Multiple extends boolean = false>(
  props: SelectProps<TValue, Multiple>,
) {
  const slots: SelectProps<TValue, Multiple>['slots'] = {
    root: Button,
    listbox: Listbox,
    popup: Popup,
    ...props.slots,
  };

  return <BaseSelect {...props} slots={slots} />;
}

const Button = forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean,
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { ownerState, ...other } = props;
  return (
    <StyledButton type="button" {...other} ref={ref}>
      {other.children}
      <ChevronsDownUp size={20} />
    </StyledButton>
  );
});

const StyledButton = styled('button', { shouldForwardProp: () => true })(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 200px;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? muiGrey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? muiGrey[700] : muiGrey[200]};
  color: ${theme.palette.mode === 'dark' ? muiGrey[300] : muiGrey[900]};
  position: relative;
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? muiGrey[900] : muiGrey[50]};

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? muiGrey[800] : muiGrey[50]};
    border-color: ${theme.palette.mode === 'dark' ? muiGrey[600] : muiGrey[300]};
  }

  &.${selectClasses.focusVisible} {
    outline: 0;
    border-color: ${muiBlue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? muiBlue[600] : muiBlue[200]};
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  `,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 220px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? muiGrey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? muiGrey[700] : muiGrey[200]};
  color: ${theme.palette.mode === 'dark' ? muiGrey[300] : muiGrey[900]};
  box-shadow: 0px 2px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
    };
  `,
);

const Option = styled(BaseOption)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? muiBlue[900] : muiBlue[100]};
    color: ${theme.palette.mode === 'dark' ? muiBlue[100] : muiBlue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? muiGrey[800] : muiGrey[100]};
    color: ${theme.palette.mode === 'dark' ? muiGrey[300] : muiGrey[900]};
  }

  &:focus-visible {
    outline: 3px solid ${theme.palette.mode === 'dark' ? muiBlue[600] : muiBlue[200]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? muiBlue[900] : muiBlue[100]};
    color: ${theme.palette.mode === 'dark' ? muiBlue[100] : muiBlue[900]};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? muiGrey[700] : muiGrey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? muiGrey[800] : muiGrey[100]};
    color: ${theme.palette.mode === 'dark' ? muiGrey[300] : muiGrey[900]};
  }
  `,
);

const Popup = styled('div')`
  z-index: 1;
`;
