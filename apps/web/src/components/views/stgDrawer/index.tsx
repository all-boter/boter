import { useMemo, useState } from "react"
import { DynamicFormProvider, FormItem, FormSchema } from "@/components/basics/DynamicFormProvider"
import { Button } from "@/components/basics/button"
import { IStrategy, createBot, getRunners } from "@/services/stgApi"
import { Box, styled } from "@mui/system"
import { useForm } from "react-hook-form"
import { SUCCESS } from "@/common/constants"

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
}

export const StgDrawer = ({ stg }: Props) => {
  const [formValues, setFormValuesState] = useState<FormValues>({})

  const { handleSubmit } = useForm({
    defaultValues: {
      interval: "",
    }
  });

  const { formSchema } = useMemo<{ formSchema: FormSchema[] }>(() => {
    const newSchema = [...formSchemaDefault, ...stg.paramsSchema]

    const formValues: FormValues = newSchema.reduce((obj: FormValues, item) => {
      obj[item.id] = "";
      return obj;
    }, {});

    setFormValuesState(formValues)

    return { formSchema: newSchema }
  }, [stg])

  const renderFormItem = (
    formItem: FormItem,
    values: { [key: string]: any },
  ) => {

    return DynamicFormProvider.of(formItem, values, setFormValuesState)
  };

  const onSubmit = async () => {
    const res = await createBot({
      strategyId: stg.id,
      name: stg.name,
      params: formValues
    })

    if (res.code === SUCCESS) {

    } else {
      console.error(res.msg)
    }
  }

  return <Box sx={{ p: '20px' }}>
    <Box>
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