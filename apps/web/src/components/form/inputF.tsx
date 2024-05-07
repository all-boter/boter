import { FormItem } from "../basics/DynamicFormProvider";
import { Field, useField, useFormikContext } from 'formik'
import { Input } from "../basics/input";
import { Box } from "@mui/system";

interface Props extends FormItem { }

export const InputF = (props: Props) => {
  const formik = useFormikContext<any>()
  const { control, id } = props
  const [field, , helpers] = useField(id)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    helpers.setValue(value)
  }

  console.log('%c=input F', 'color:red', control)

  return <>
    <Box sx={{ mb: '8px' }}>{props.label}</Box>
    <Field
      as={Input}
      {...field}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
      value={formik.values[id] as string}
      maxLength={control?.maxLength}
      placeholder={control?.placeholder}
      width={control.width}
    />
  </>
}