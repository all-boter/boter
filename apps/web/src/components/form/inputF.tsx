import { FormItem } from "../basics/DynamicFormProvider";
import { Input } from "../basics/input";
import { Box } from "@mui/system";
import { useForm, Controller } from "react-hook-form"
import { ChangeEvent, forwardRef } from "react";

interface Props extends FormItem {
  values: any
  setFormValuesState: (val: any) => void
}

export const InputF = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { control: controlF } = useForm();
  const { maxLength = 200, placeholder, width = 250, id, setFormValuesState } = props

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setFormValuesState({
      ...props.values,
      [id]: value
    })
  }

  return <>
    <Box sx={{ my: '8px' }}>{props.label}</Box>
    <Controller
      name={id}
      control={controlF}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          maxLength={maxLength}
          placeholder={placeholder}
          width={width}
          value={props.values[id]}
        />
      )}
    />
  </>
});
