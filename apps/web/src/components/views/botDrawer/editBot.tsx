import { SUCCESS } from "@/common/constants"
import { DynamicFormProvider, FormItem, FormSchema } from "@/components/basics/DynamicFormProvider"
import { mainTheme } from "@/components/basics/mainColor"
import { ToastContext, ToastType } from "@/components/basics/toast/toastContext"
import { Bot, getStgById } from "@/services/stgApi"
import { Box } from "@mui/system"
import { useContext, useEffect, useState } from "react"
import { botFormSchemaDefault, BotFormValues, StyledButton } from "../stgDrawer"
import { useForm } from "react-hook-form"
import { editBot } from "@/services/botApi"
import { useDrawerContext } from "@/components/basics/drawer/drawerContext"
import { useTranslation } from "react-i18next"

interface Props {
  bot: Bot
  onClose?: () => void
}

export const EditBot = ({ bot, onClose }: Props) => {
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext)!;
  const [botFormSchema, setBotFormSchema] = useState<FormSchema[]>([])
  const [botFormValues, setbotFormValues] = useState<BotFormValues>({})
  const { closeDrawer } = useDrawerContext();

  useEffect(() => {
    getStgById(bot.strategyId).then((res) => {
      if (res.code === SUCCESS) {
        const strategy = res.data
        const newSchema = [...botFormSchemaDefault, ...strategy.paramsSchema]

        const formValues: BotFormValues = newSchema.reduce((obj: BotFormValues, item) => {
          obj[item.id] = bot.params[item.id] || '';
          return obj;
        }, {});

        setbotFormValues(formValues)
        setBotFormSchema(newSchema)
      } else {
        showToast(`error: ${res.msg}`, { type: ToastType.error, duration: 2000 })
      }
    })
  }, [bot.strategyId])

  const { handleSubmit } = useForm({
    defaultValues: {
      interval: "",
    }
  });

  const renderFormItem = (
    formItem: FormItem,
    values: { [key: string]: any },
  ) => {

    return DynamicFormProvider.of(formItem, values, setbotFormValues)
  };

  const onSubmit = async () => {
    const res = await editBot({ id: bot.id, params: botFormValues })
    if (res.code === SUCCESS) {
      showToast(`Edit ${bot?.name} bot ${res.msg}`, { type: ToastType.success, duration: 2000 })
      closeDrawer('BotDrawer')
      onClose && onClose()
    } else {
      showToast(`Edit ${bot?.name} bot error: ${res.msg}`, { type: ToastType.error, duration: 2000 })
      closeDrawer('BotDrawer')
      onClose && onClose()
    }
  }

  if (!botFormSchema.length) {
    return null
  }

  return <Box sx={{ color: mainTheme.white, pt: '10px', mx: '20px' }}>
    <Box sx={{ mb: '16px', fontSize: '20px', fontWeight: '500px' }}>
      {t('edit')}&nbsp;<Box component={'span'} sx={{ color: mainTheme.golden, fontSize: '22px' }}>
        {bot?.name}
      </Box>
      &nbsp;{t('bot')}
    </Box>

    <form onSubmit={handleSubmit(onSubmit)}>
      {botFormSchema.map((formItem, index) => {

        return (
          <div key={index}>
            {renderFormItem(formItem, botFormValues)}
          </div>
        )
      })}

      <StyledButton type='submit' padding="6px 20px">
        {t('editBot')}
      </StyledButton>
    </form>
  </Box>
}