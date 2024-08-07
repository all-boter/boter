import { styled } from '@mui/system';
import { DynamicFormProvider, FormItem, FormSchema } from '@/components/basics/DynamicFormProvider';
import { useForm } from "react-hook-form"
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/basics/button';
import { createStg } from '@/services/stgApi';
import { SUCCESS } from '@/common/constants';
import { Modal, ModalContent } from '@/components/basics/modal';
import { useTranslation } from 'react-i18next';

interface IModal {
  isOpen: boolean
  handleOpen?: () => void
  handleClose: () => void
}

const formSchema: FormSchema[] = [
  {
    type: 'Input',
    id: 'name',
    label: 'Strategy name:',
    value: '',
    placeholder: 'Type name',
  },
]

const formValuesInit = {
  name: ''
}

const StyledButton = styled(Button)(`margin-top: 10px;`)

export const CreateStg = ({isOpen,handleClose}: IModal) => {
  const { t } = useTranslation();
  const [formValues, setFormValuesState] = useState<{ name: string }>(formValuesInit)

  const { handleSubmit } = useForm({
    defaultValues: formValuesInit
  });

  const renderFormItem = useCallback(
    (
      formItem: FormItem,
      values: { [key: string]: any },
    ) => {
      return DynamicFormProvider.of(formItem, values, setFormValuesState)
    },
    [],
  )

  const onSubmit = async () => {
    if (!formValues.name) {
      alert('name required')
      return
    }

    const res = await createStg(formValues)
    if (res.code === SUCCESS) {
      handleClose()
    } else {
      console.error(res.msg)
    }
  }

  useEffect(() => {
    if (isOpen && formValues.name) {
      setFormValuesState(formValuesInit)
    }
  }, [isOpen])

  return <Modal isOpen={isOpen} handleClose={handleClose}>
    <ModalContent sx={{ width: 400 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formSchema.map((formItem, index) => {

          return (
            <div key={index}>
              {renderFormItem(formItem, formValues)}
            </div>
          )
        })}

        <StyledButton padding='6px 8px' type='submit'>
          {t('createStg')}
        </StyledButton>
      </form>
    </ModalContent>
  </Modal>
}