import { FormItem } from "../basics/DynamicFormProvider"
import { useForm, Controller } from "react-hook-form"
import Picker from 'react-datepicker'
import { useMemo } from "react"
import { Box } from "@mui/system"

interface Props extends FormItem {
  values: any
  setFormValuesState: (val: any) => void
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const currentDate = new Date();
console.log(formatDate(currentDate));

/**
 * https://reactdatepicker.com/
*/
export const TimePicker = (props: Props) => {
  const { id, setFormValuesState } = props
  const { control: controlF } = useForm();

  const val = useMemo(() => {
    if (props.values[id]) {
      return new Date(props.values[id])
    }

    return null
  }, [props.values])

  return <>
    <Box sx={{ my: '8px', color: '#FFF' }}>{props.label}</Box>

    <Controller
      name={id}
      control={controlF}
      render={() => (
        <Picker
          dateFormat="yyyy-MM-dd HH:mm:ss"
          selected={val}
          className='fomir-date-picker'
          onChange={(date: any) => {
            setFormValuesState({
              ...props.values,
              [id]: formatDate(new Date(date))
            })
          }}
          selectsStart
          placeholderText={props.placeholder}
          showTimeSelect
          timeFormat="HH:mm"
        />
      )
      }
    />
  </>
}