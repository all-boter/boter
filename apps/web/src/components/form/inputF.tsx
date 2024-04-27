import { FormItem } from "../basics/DynamicFormProvider";
import { Field, useField, useFormikContext } from 'formik'
import { Input } from "../basics/input";

interface Props extends FormItem { }

export const InputF = (props: Props) => {
  const formik = useFormikContext<any>()
  const { control, id } = props
  const [field, , helpers] = useField(id)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    console.log('%c=handleChange','color:red',value)
    helpers.setValue(value)
  }

  return <Field
    as={Input}
    {...field}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
    value={control.value as string}
    maxLength={control?.maxLength}
    placeholder={control?.placeholder}
  />
}