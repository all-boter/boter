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
    {...props}
    value={value}
    onChange={onChange && onChange}
    // onBlur={handleBlur}
    style={{ display: "block" }}
  >
    {options.map((c) => (
      <option key={c[id]} value={c[id]}>
        {c[label]}
      </option>
    ))}
  </select>
}
