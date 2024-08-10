import { FormItem } from "../basics/DynamicFormProvider";
import { Box } from "@mui/system";
import { BoterSelect } from "../basics/select";

interface Props extends FormItem {
  values: any
  setFormValuesState: (val: any) => void
}

export const intervals = [
  // '1m',
  { id: '3m' },
  { id: '5m' },
  { id: '15m' },
  { id: '1h' },
  { id: '1d' },
  { id: '1w' },
]

export const PeriodS = (props: Props) => {
  const { id, setFormValuesState } = props

  const handleChange = (value: any) => {
    console.log('%c=value','color:red',value)
    if (value) {
      setFormValuesState({
        ...props.values,
      [id]: value
      })
    }
  }

  return <>
    <Box sx={{ my: '8px', color: '#FFF' }}>{props.label}</Box>

      <BoterSelect
        options={intervals}
        value={props.values[id]}
        width={240}
        id='id'
        label='id'
        onChange={(e) => handleChange(e)}
      />
  </>
}
