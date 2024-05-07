import { FormItem } from "../basics/DynamicFormProvider";
import { useField, useFormikContext } from 'formik'
import { Box } from "@mui/system";
import { Select } from "../basics/select";
import { useEffect } from "react";

interface Props extends FormItem { }

const options = [
  {
    name: 'test',
    id: 123
  },
  {
    name: 'test 2',
    id: 1234
  },
]

export const SelectF = (props: Props) => {
  const formik = useFormikContext<any>()
  const { control, id } = props
  const [field, , helpers] = useField(id)

  const handleChange = (_e: any, val: any) => {
    // helpers.setValue(value)
    console.log('%c=handleChange', 'color:red', val)
  }

  useEffect(()=>{

  },[])

  return <>
    <Box sx={{ mb: '8px' }}>{props.label}</Box>
    <Select
      {...field}
      onChange={handleChange}
      options={options}
      label='name'
      id='id'
      placeholder={control?.placeholder}
    />
  </>
}