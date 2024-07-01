import { useContext, useEffect, useMemo, useState } from "react"
import { DynamicFormProvider, FormItem, FormSchema } from "@/components/basics/DynamicFormProvider"
import { Button } from "@/components/basics/button"
import { IJsonValue, getRunners, stgEditParams } from "@/services/stgApi"
import { Box, styled } from "@mui/system"
import { useForm } from "react-hook-form"
import { ToastContext, ToastType } from "@/components/basics/toast/toastContext"
import { mainTheme } from "@/components/basics/mainColor"
import { useDrawerContext } from "@/components/basics/drawer/drawerContext"
import { SUCCESS } from "@/common/constants"

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

function updateParamsSchema(form: BotFormValues, paramsSchema: FormSchema[]) {
  return paramsSchema.map(param => {
    const formValue = form[param.id];
    if (formValue !== undefined && formValue !== '' && formValue !== null) {
      return { ...param, value: formValue };
    }
    return param;
  });
}

interface Props {
  paramsSchema: IJsonValue[]
  stgId: string
  runnerId: string
  onClose?: () => void
}

export const EditStgParms = ({ paramsSchema, runnerId, stgId, onClose }: Props) => {
  const { closeDrawer } = useDrawerContext();
  const { showToast } = useContext(ToastContext)!;
  const [formValues, setFormValuesState] = useState<BotFormValues>({})
  const { drawers } = useDrawerContext();
  const drawerOpen = drawers['BotDrawer'];

  const { handleSubmit } = useForm({
    defaultValues: {
      interval: "",
    }
  });

  const { formSchema, defaultFormValues } = useMemo<{ formSchema: FormSchema[], defaultFormValues: any }>(() => {
    const newSchema = [...botFormSchemaDefault, ...(paramsSchema as unknown as FormSchema[])]
    const formValues: BotFormValues = newSchema.reduce((obj: BotFormValues, item) => {
      obj[item?.id] = item.value as string || "";
      return obj;
    }, {});

    setFormValuesState({ ...formValues, runnerId })

    return { formSchema: newSchema, defaultFormValues: { ...formValues } }
  }, [stgId, paramsSchema])

  const renderFormItem = (
    formItem: FormItem,
    values: { [key: string]: any },
  ) => {

    return DynamicFormProvider.of(formItem, values, setFormValuesState)
  };

  const onSubmit = async () => {
    const runnerId = formValues['runnerId']
    if (!runnerId) {
      showToast('Please select a runner', { type: ToastType.info, duration: 2000 })
      return
    }

    const updatedParamsSchema = updateParamsSchema(formValues, paramsSchema as unknown as FormSchema[]);
    const res = await stgEditParams({
      id: stgId,
      runnerId,
      paramsSchema: updatedParamsSchema
    })
    if (res.code === SUCCESS) {
      showToast(`Edit Params schema: ${res.msg}`, { type: ToastType.success, duration: 2000 })
      closeDrawer('BotDrawer')
      onClose && onClose()
    } else {
      showToast(`Edit Params schema bot error: ${res.msg}`, { type: ToastType.error, duration: 2000 })
      closeDrawer('BotDrawer')
      onClose && onClose()
    }
  }

  useEffect(() => {
    if (!drawerOpen) {
      setFormValuesState(defaultFormValues)
    } else {
      setFormValuesState({ ...formValues, runnerId })
    }
  }, [drawerOpen]);

  return <Box sx={{ p: '20px' }}>
    <Box sx={{ mb: '10px', fontWeight: '500', color: mainTheme.golden }}>
      Edit params schema
    </Box>
    <form onSubmit={handleSubmit(onSubmit)}>
      {formSchema.map((formItem, index) => {

        return (
          <div key={index}>
            {renderFormItem(formItem, formValues)}
          </div>
        )
      })}

      <StyledButton type='submit'>Save</StyledButton>
    </form>
  </Box>
}