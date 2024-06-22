import { useContext, useEffect, useMemo, useState } from "react"
import { DynamicFormProvider, FormItem, FormSchema } from "@/components/basics/DynamicFormProvider"
import { Button } from "@/components/basics/button"
import { IStrategy, createBot, getRunners } from "@/services/stgApi"
import { Box, styled } from "@mui/system"
import { useForm } from "react-hook-form"
import { SUCCESS } from "@/common/constants"
import { ToastContext, ToastType } from "@/components/basics/toast/toastContext"
import { mainTheme } from "@/components/basics/muiColor"

const formSchemaDefault: FormSchema[] = [
  {
    type: 'Select',
    id: 'runnerId',
    label: 'Runner:',
    dataSourceFn: getRunners,
    control: {
      id: 'id',
      label: 'name',
      value: '',
      defaultValue: '',
      placeholder: 'Type name',
    },
  },
]

interface FormValues {
  [key: string]: string;
}

const StyledButton = styled(Button)(`margin-top: 10px;`)

interface Props {
  stg: IStrategy
  onClose: () => void
  drawerOpen: boolean
}

export const StgDrawer = ({ drawerOpen, stg, onClose }: Props) => {
  const { showToast } = useContext(ToastContext)!;
  const [formValues, setFormValuesState] = useState<FormValues>({})

  const { handleSubmit } = useForm({
    defaultValues: {
      interval: "",
    }
  });

  const { formSchema, defaultFormValues } = useMemo<{ formSchema: FormSchema[], defaultFormValues: any }>(() => {
    const newSchema = [...formSchemaDefault, ...stg.paramsSchema]

    const formValues: FormValues = newSchema.reduce((obj: FormValues, item) => {
      obj[item.id] = "";
      return obj;
    }, {});

    setFormValuesState(formValues)

    return { formSchema: newSchema, defaultFormValues: { ...formValues } }
  }, [stg])

  const renderFormItem = (
    formItem: FormItem,
    values: { [key: string]: any },
  ) => {

    return DynamicFormProvider.of(formItem, values, setFormValuesState)
  };

  const onSubmit = async () => {

    console.log('%c=', 'color:red', {
      strategyId: stg.id,
      name: stg.name,
      params: formValues
    })

    if (!formValues['runnerId']) {
      showToast('Please select runner', { type: ToastType.info, duration: 2000 })
      return
    }

    const res = await createBot({
      strategyId: stg.id,
      name: stg.name,
      params: formValues
    })

    if (res.code === SUCCESS) {
      showToast(`Create ${stg.name} bot ${res.msg}`, { type: ToastType.success, duration: 2000 })
      onClose()
    } else {
      showToast(`Create ${stg.name} bot error: ${res.msg}`, { type: ToastType.error, duration: 2000 })
      onClose()
    }
  }

  useEffect(() => {
    if (!drawerOpen) {
      setFormValuesState(defaultFormValues)
    }
  }, [drawerOpen]);

  return <Box sx={{ p: '20px' }}>
    <Box sx={{mb: '10px',fontWeight: '500',color: mainTheme.golden}}>
      Create <span>{stg.name}</span> Bot
    </Box>
    <form onSubmit={handleSubmit(onSubmit)}>
      {formSchema.map((formItem, index) => {

        return (
          <div key={index}>
            {renderFormItem(formItem, formValues)}
          </div>
        )
      })}

      <StyledButton type='submit'>Create a strategy</StyledButton>
    </form>
  </Box>
}