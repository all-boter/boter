import { FormItem } from "../basics/DynamicFormProvider";
import { Field, useField, useFormikContext } from 'formik'
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { SUCCESS } from "@/common/constants";
import { Select2 } from "../basics/select/select2";

interface Props extends FormItem { }

export const SelectF = (props: Props) => {
  const formik = useFormikContext<any>()
  const { control, id } = props
  const [field, , helpers] = useField(id)
  const [options, setOptions] = useState<any[]>([])

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

  const handleChange = (_e: any, val: any) => {
    if (control.id && _e.target.value) {
      helpers.setValue(_e.target.value)
    }
  }

  useEffect(() => {
    dataSourceFnUtil()
  }, [props.dataSourceFn])

  return <>
    <Box sx={{ mb: '8px' }}>{props.label}</Box>

    <Field
      as={Select2}
      options={options}
      id={control?.id}
      label={control?.label}
      placeholder={control?.placeholder}
      {...field}
      value={formik.values[id] as string}
      onChange={handleChange}
    />
  </>
}