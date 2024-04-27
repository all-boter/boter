import { InputF } from "../form/inputF"

export interface FormItem {
  id: string
  type: 'Input' | 'Number' | 'Radio' | 'Select' | 'Switch' | 'Checkbox' |  'Upload' |'textArea'
  label?: string
  control: Control
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
  value: number | string | string[]
  defaultValue?: number | string
  maxLength?: number
  minLength?: number
  placeholder?: string
}

export class DynamicFormProvider {
  static of(formItem: FormItem) {
    switch (formItem.type) {
      case FormItemType.Input:
        return <InputF {...formItem} />

      default:
        console.log('unknow component', formItem.type)
        return <div>unknow component:{formItem.type}</div>
    }
  }
}
