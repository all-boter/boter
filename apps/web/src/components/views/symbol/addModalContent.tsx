import { SUCCESS } from "@/common/constants";
import { Button } from "@/components/basics/button";
import { DynamicFormProvider, FormItem, FormSchema } from "@/components/basics/DynamicFormProvider";
import { ToastContext, ToastType } from "@/components/basics/toast/toastContext";
import { addSymbol, ISymbol } from "@/services/botApi";
import { Box, styled } from "@mui/system"
import { useCallback, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const formSchema: FormSchema[] = [
  {
    type: 'Input',
    id: 'symbol',
    label: 'Symbol:',
    value: '',
    placeholder: 'Please enter symbol,like BTC,ETH',
    width: 300
  },
  {
    type: 'Input',
    id: 'name',
    label: 'Name:',
    value: '',
    placeholder: 'Please enter name,like XXXUSDT',
    width: 300
  },
]

const StyledButton = styled(Button)(`margin-top: 10px;`)

const formValuesInit = {
  name: '',
  symbol: ''
}

interface IModal {
  handleClose: () => void
}

export const AddModalContent = ({ handleClose }: IModal) => {
  const { t } = useTranslation();
  const [formValues, setFormValuesState] = useState<ISymbol>(formValuesInit)
  const { showToast } = useContext(ToastContext)!;

  const { handleSubmit } = useForm({
    defaultValues: formValuesInit
  });

  const onSubmit = async () => {
    if (!formValues.name) {
      showToast(`Name required`, { type: ToastType.error, duration: 2000 })
      return
    }

    if (!formValues.symbol) {
      showToast(`Symbol required`, { type: ToastType.error, duration: 2000 })
      return
    }

    const res = await addSymbol(formValues)
    if (res.code === SUCCESS) {
      showToast(`Add symbol ok`, { type: ToastType.success, duration: 2000 })
      handleClose()
    } else {
      showToast(`Add symbol error: ${res.msg}`, { type: ToastType.error, duration: 2000 })
    }
  }

  const renderFormItem = useCallback(
    (
      formItem: FormItem,
      values: { [key: string]: any },
    ) => {
      return DynamicFormProvider.of(formItem, values, setFormValuesState)
    },
    [],
  )

  return <Box>
    <form onSubmit={handleSubmit(onSubmit)}>
      {formSchema.map((formItem, index) => {

        return (
          <div key={index}>
            {renderFormItem(formItem, formValues)}
          </div>
        )
      })}

      <StyledButton padding='6px 8px' type='submit'>
        {t('addSymbol')}
      </StyledButton>
    </form>
  </Box>
}
