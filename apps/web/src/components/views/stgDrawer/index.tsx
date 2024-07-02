import { useContext, useEffect, useMemo, useState } from "react"
import { DynamicFormProvider, FormItem, FormSchema } from "@/components/basics/DynamicFormProvider"
import { Button } from "@/components/basics/button"
import { IStrategy, createBot, getRunners } from "@/services/stgApi"
import { Box, styled } from "@mui/system"
import { useForm } from "react-hook-form"
import { SUCCESS } from "@/common/constants"
import { ToastContext, ToastType } from "@/components/basics/toast/toastContext"
import { mainTheme } from "@/components/basics/mainColor"
import { useDrawerContext } from "@/components/basics/drawer/drawerContext"

export const botFormSchemaDefault: FormSchema[] = [
  {
    type: 'Select',
    id: 'runnerId',
    label: 'Runner:',
    dataSourceFn: getRunners,
    value: '',
    placeholder: 'Type name',
    controlId: 'id',
    controlLabel: 'name',
  },
  {
    type: 'Input',
    id: 'name',
    label: 'bot name',
    value: '',
    defaultValue: '',
    placeholder: 'Type name',
    width: 200,
  },
]

export interface BotFormValues {
  [key: string]: string;
}

export const StyledButton = styled(Button)(`margin-top: 20px;`)

interface Props {
  stg: IStrategy
  onClose?: () => void
}

export const StgDrawer = ({ stg, onClose }: Props) => {
  const { showToast } = useContext(ToastContext)!;
  const [formValues, setFormValuesState] = useState<BotFormValues>({})
  const { drawers, closeDrawer } = useDrawerContext();
  const drawerOpen = drawers['BotDrawer'];

  const { handleSubmit } = useForm({
    defaultValues: {
      interval: "",
    }
  });

  const { formSchema, defaultFormValues } = useMemo<{ formSchema: FormSchema[], defaultFormValues: any }>(() => {
    const newSchema = [...botFormSchemaDefault, ...stg.paramsSchema]

    const formValues: BotFormValues = newSchema.reduce((obj: BotFormValues, item) => {
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
    if (!formValues['runnerId']) {
      showToast('Please select a runner', { type: ToastType.info, duration: 2000 })
      return
    }

    const res = await createBot({
      strategyId: stg.id,
      stgName: stg.name,
      params: formValues
    })

    if (res.code === SUCCESS) {
      showToast(`Create ${formValues?.name} bot ${res.msg}`, { type: ToastType.success, duration: 2000 })
      closeDrawer('BotDrawer')
      onClose && onClose()
    } else {
      showToast(`Create ${formValues?.name} bot error: ${res.msg}`, { type: ToastType.error, duration: 2000 })
      closeDrawer('BotDrawer')
      onClose && onClose()
    }
  }

  useEffect(() => {
    if (!drawerOpen) {
      setFormValuesState(defaultFormValues)
    }
  }, [drawerOpen]);

  return <Box sx={{ p: '20px' }}>
    <Box sx={{ mb: '10px', fontWeight: '500', color: mainTheme.golden }}>
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

      <StyledButton padding='6px 8px' type='submit'>Create bot</StyledButton>
    </form>
  </Box>
}