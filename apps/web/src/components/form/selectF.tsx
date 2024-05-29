import { FormItem } from "../basics/DynamicFormProvider";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { SUCCESS } from "@/common/constants";
import { useForm, Controller } from "react-hook-form"
import { BoterSelect } from "../basics/select";

interface Props extends FormItem {
  values: any
  setFormValuesState: (val: any) => void
}

export const SelectF = (props: Props) => {
  const { control, id, setFormValuesState } = props
  const [options, setOptions] = useState<any[]>([])
  const { control: controlF } = useForm();

  const dataSourceFnUtil = async () => {
    if (props.dataSourceFn) {
      const res = await props.dataSourceFn()
      if (res.code === SUCCESS) {
        setOptions(res.data)
      } else {
        alert(res.msg)
      }
    }
  }

  const handleChange = (value: any) => {
    console.log('%c=_e', 'color:red', value)
    if (control.id) {
      setFormValuesState({
        ...props.values,
        [id]: value
      })
    }
  }

  useEffect(() => {
    dataSourceFnUtil()
  }, [props.dataSourceFn])

  return <>
    <Box sx={{ mb: '8px' }}>{props.label}</Box>

    <Controller
      name={id}
      control={controlF}
      render={({ field: { onChange, onBlur, value } }) => (
        <BoterSelect
          options={options}
          value={props.values[id]}
          width={240}
          id='id'
          label='name'
          onChange={(e) => handleChange(e)}
        />
      )}
    />
  </>
}