import { InputF } from "../form/inputF"
import { SelectF } from "../form/selectF"

export interface FormItem extends Control {
  id: string
  type: 'Input' | 'Number' | 'Radio' | 'Select' | 'Switch' | 'Checkbox' | 'Upload' | 'textArea'
  label?: string
  dataSourceFn?: () => Promise<any>;
}

export interface FormSchema extends FormItem {
}

export enum FormItemType {
  Number = 'Number',
  Radio = 'Radio',
  Select = 'Select',
  Input = 'Input',
  Switch = 'Switch',
  Checkbox = 'Checkbox',
  Upload = 'Upload',
  TextArea = 'textArea',
}

interface Control {
  controlId?: string
  controlLabel?: string
  value: number | string | string[]
  defaultValue?: number | string
  maxLength?: number
  minLength?: number
  placeholder?: string
  width?: number
}

export class DynamicFormProvider {
  static of(formItem: FormItem, values: any, setFormValuesState: (val: any) => void) {
    switch (formItem.type) {
      case FormItemType.Input:
        return <InputF {...formItem} values={values} setFormValuesState={setFormValuesState} />

      case FormItemType.Select:
        return <SelectF {...formItem} values={values} setFormValuesState={setFormValuesState} />

      default:
        return <div>unknow component:{formItem.type}</div>
    }
  }
}
