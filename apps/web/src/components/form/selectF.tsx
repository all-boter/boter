import { FormItem } from "../basics/DynamicFormProvider";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { SUCCESS } from "@/common/constants";
import { Select2 } from "../basics/select/select2";
import { useForm, Controller } from "react-hook-form"

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

  const handleChange = (_e: any) => {
    if (control.id && _e.target.value) {
      setFormValuesState({
        ...props.values,
        [id]: _e.target.value
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
        <Select2
          options={options}
          id={control?.id}
          label={control?.label}
          placeholder={control?.placeholder}
          value={props.values[id]}
          onChange={(e) => handleChange(e)}
        />
      )}
    />
  </>
}