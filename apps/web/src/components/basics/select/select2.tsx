interface Props {
  value?: any;
  defaultValue?: any;
  placeholder?: React.ReactNode;
  options: any[]
  onChange?: (event: any) => void
  label?: string
  id?: string
}

export const Select2 = (props: Props) => {
  const { options, onChange, value, id = 'value', label = 'label' } = props

  return <select
    value={value}
    onChange={onChange && onChange}
  >
    <option style={{ display: 'none' }}></option>
    {options.map((c) => (
      <option key={c[id]} value={c[id]}>
        {c[label]}
      </option>
    ))}
  </select>
}
