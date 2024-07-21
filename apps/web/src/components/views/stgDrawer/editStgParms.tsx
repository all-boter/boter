import { useContext, useEffect, useMemo, useState } from "react"
import { DynamicFormProvider, FormItem, FormSchema } from "@/components/basics/DynamicFormProvider"
import { Button } from "@/components/basics/button"
import { getRunners, stgEditParams } from "@/services/stgApi"
import { Box, styled } from "@mui/system"
import { useForm } from "react-hook-form"
import { ToastContext, ToastType } from "@/components/basics/toast/toastContext"
import { mainTheme } from "@/components/basics/mainColor"
import { useDrawerContext } from "@/components/basics/drawer/drawerContext"
import { IJsonValue, SUCCESS } from "@/common/constants"
import { getValidInterval } from "@/common"
import { useTranslation } from "react-i18next"

export const botFormSchemaDefault: FormSchema[] = [
  {
    type: 'Select',
    id: 'runnerId',
    label: 'Runner server:',
    dataSourceFn: getRunners,
    value: '',
    placeholder: 'Type name',
    controlId: 'id',
    controlLabel: 'name',
  },
]

export interface BotFormValues {
  [key: string]: string | number;
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

export enum EditParamsType {
  stgParams = 1,
  aiParams = 2
}

interface Props {
  paramsSchema: IJsonValue[]
  stgId: string
  runnerId: string
  editType: EditParamsType
  onClose?: () => void
}

export const EditStgParms = ({ paramsSchema, runnerId, stgId, editType, onClose }: Props) => {
  const { t } = useTranslation();
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
    const runnerId = formValues['runnerId'] as string
    if (!runnerId) {
      showToast('Please select a runner', { type: ToastType.info, duration: 2000 })
      return
    }

    const interval = formValues['interval']
    const newFormValues = {
      ...formValues,
      interval: getValidInterval(interval)
    }

    const updatedParamsSchema = updateParamsSchema(newFormValues, paramsSchema as unknown as FormSchema[]);
    const res = await stgEditParams({
      id: stgId,
      runnerId,
      editType,
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
      {t('editStgParam')}
    </Box>
    <form onSubmit={handleSubmit(onSubmit)}>
      {formSchema.map((formItem, index) => {

        return (
          <div key={index}>
            {renderFormItem(formItem, formValues)}
          </div>
        )
      })}

      <StyledButton padding='6px 20px' type='submit'>
        {t('save')}
      </StyledButton>
    </form>
  </Box>
}