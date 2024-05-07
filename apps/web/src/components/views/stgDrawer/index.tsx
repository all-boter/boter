import { useCallback, useEffect, useState } from "react"
import { SUCCESS } from "@/common/constants"
import { DynamicFormProvider, FormItem, FormSchema } from "@/components/basics/DynamicFormProvider"
import { Button } from "@/components/basics/button"
import { IRunner, IStrategy, getRunners } from "@/services/stgApi"
import { Box, styled } from "@mui/system"
import { Form, Formik } from 'formik';

const formSchema: FormSchema[] = [
  {
    type: 'Select',
    id: 'runner',
    label: 'Runner:',
    control: {
      value: '',
      defaultValue: '',
      placeholder: 'Type name',
    },
  },
  {
    type: 'Input',
    id: 'name',
    label: 'Strategy name:',
    control: {
      value: '',
      defaultValue: '',
      placeholder: 'Type name',
      width: 200
    },
  },
]

const formValuesInit = {
  name: ''
}

const StyledButton = styled(Button)(`margin-top: 10px;`)

interface Props {
  stg: IStrategy
}

export const StgDrawer = ({stg}:Props) => {
  const [runners, setRunners] = useState<IRunner[]>([])

  const renderFormItem = useCallback(
    (
      formItem: FormItem,
      values: { [key: string]: any },
    ) => {
      return DynamicFormProvider.of(formItem)
    },
    [],
  )

  const onSubmit = async (values: any) => {
    console.log('%c=onSubmit', 'color:red', values)
    // const res = await createStg({ name: values.name })
    // if (res.code === SUCCESS) {
    //   props.handleClose()
    // } else {
    //   console.error(res.msg)
    // }
  }

  const getRunnersUtil = async () => {
    const res = await getRunners()
    if (res.code === SUCCESS) {
      setRunners(res.data)
    } else {
      alert(res.msg)
    }
  }

  useEffect(() => {
    getRunnersUtil()
  }, [])

  console.log('%c=runners', 'color:red', runners)

  return <Box sx={{p: '20px'}}>
    <Box>
    Create <span>{stg.name}</span> Bot
    </Box>
    <Formik
      initialValues={formValuesInit}
      // validationSchema={validationSchema}
      validateOnMount
      onSubmit={onSubmit}
    >
      {({ values, errors, isValid }) => (
        <Form>
          {formSchema.map((formItem, index) => {
            return (
              <div key={index}>
                {renderFormItem(formItem, values)}
              </div>
            )
          })}

          <StyledButton type='submit'>Create a strategy</StyledButton>
        </Form>
      )}
    </Formik>
  </Box>
}