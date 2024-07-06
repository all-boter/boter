import { mainTheme } from "@/components/basics/mainColor"
import { Box } from "@mui/system"
import { FieldWarnning, StyledCell, StyledFormItem, StyledLabel } from "../stgDrawer/editStg"
import { Input } from "@/components/basics/input"
import { useContext, useEffect, useState } from "react"
import { addNotifier, editNotifier, INotifier, NotifierType } from "@/services/botApi"
import { BoterSelect } from "@/components/basics/select"
import { Button } from "@/components/basics/button"
import { SUCCESS } from "@/common/constants"
import { useDrawerContext } from "@/components/basics/drawer/drawerContext"
import { ToastContext, ToastType } from "@/components/basics/toast/toastContext"

interface Props {
  onClose?: () => void
  notifier: INotifier
}

const typeOptions = [
  {
    value: 'Telegram',
    label: 'Telegram'
  },
  {
    value: 'Discord',
    label: 'Discord'
  },
  {
    value: 'Slack',
    label: 'Slack'
  },
  {
    value: 'Dingtalk',
    label: 'Dingtalk'
  },
  {
    value: 'Feishu',
    label: 'Feishu'
  },
  // {
  //   value: 'Email',
  //   label: 'Email'
  // },
]

interface FormState {
  notiName: string;
  type: NotifierType | null;
  description: string;
  keyWords: string;
  webhookUrl: string;
}

const initialFormState: FormState = {
  notiName: '',
  type: null,
  description: '',
  keyWords: '',
  webhookUrl: '',
};

export const NotifierDrawer: React.FC<Props> = ({ onClose, notifier }) => {
  const { closeDrawer, drawers } = useDrawerContext();
  const { showToast } = useContext(ToastContext)!;
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<any>({});
  const drawerOpen = drawers['NotifierDrawer'];

  const handleInputChange = (field: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev: any) => ({ ...prev, [field]: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!formState.notiName) newErrors.notiName = 'Please enter name';
    if (formState.notiName.length > 5) newErrors.notiName = 'Maximum length: 40 characters';
    if (!formState.type) (newErrors as any).type = 'Please select notifier type';
    if (formState.description.length > 400) newErrors.description = 'Maximum length: 400 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (notifier.id) {
        const res = await editNotifier({
          id: notifier.id,
          name: formState.notiName,
          type: formState.type!,
          config: {
            keyWords: formState.keyWords,
            webhookUrl: formState.webhookUrl,
          },
          description: formState.description
        });

        if (res.code === SUCCESS) {
          showToast(`Edit notifier ${res.msg}`, { type: ToastType.success, duration: 2000 });
          closeDrawer('NotifierDrawer');
          onClose && onClose();
        } else {
          showToast(res.msg, { type: ToastType.error });
        }
      } else {
        const res = await addNotifier({
          name: formState.notiName,
          type: formState.type!,
          config: {
            keyWords: formState.keyWords,
            webhookUrl: formState.webhookUrl,
          },
          description: formState.description
        });

        if (res.code === SUCCESS) {
          showToast(`Add notifier ${res.msg}`, { type: ToastType.success, duration: 2000 });
          closeDrawer('NotifierDrawer');
          onClose && onClose();
        } else {
          showToast(res.msg, { type: ToastType.error });
        }
      }
    } catch (error) {
      showToast('An error occurred', { type: ToastType.error });
    }
  };

  useEffect(() => {
    setFormState({
      notiName: notifier.name,
      type: notifier.type,
      description: notifier.description,
      keyWords: (notifier.config as any)?.keyWords || '',
      webhookUrl: (notifier.config as any)?.webhookUrl || '',
    })
  }, [notifier.id]);

  useEffect(() => {
    if (!drawerOpen) {
      setErrors({})
    }
  }, [drawerOpen])

  return (
    <Box sx={{ color: mainTheme.white, pt: '10px', mx: '20px' }}>
      <Box sx={{ mb: '16px', fontSize: '20px', fontWeight: '500px' }}>
        Add notification channel
      </Box>

      <FormField
        label="Notifier type:"
        error={errors.type}
        component={
          <BoterSelect
            options={typeOptions}
            value={formState.type}
            width={240}
            onChange={(val: NotifierType) => setFormState((prev) => ({ ...prev, type: val }))}
          />
        }
      />

      <FormField
        label="Name:"
        error={errors.notiName}
        component={
          <Input
            value={formState.notiName}
            width={300}
            onChange={handleInputChange('notiName')}
          />
        }
      />

      <FormField
        label="KeyWords:"
        component={
          <Input
            value={formState.keyWords}
            width={300}
            onChange={handleInputChange('keyWords')}
          />
        }
      />

      <FormField
        label="WebhookUrl:"
        component={
          <Input
            value={formState.webhookUrl}
            width={300}
            onChange={handleInputChange('webhookUrl')}
          />
        }
      />

      <FormField
        label="Description (optional):"
        error={errors.description}
        component={
          <Input
            value={formState.description}
            width={300}
            onChange={handleInputChange('description')}
          />
        }
      />

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        pt: '20px'
      }}>
        <Button padding='6px 20px' onClick={onSubmit}>Submit</Button>
      </Box>
    </Box>
  );
};

const FormField: React.FC<{
  label: string;
  error?: string;
  component: React.ReactNode;
}> = ({ label, error, component }) => (
  <StyledFormItem>
    <StyledCell>
      <StyledLabel>{label}</StyledLabel>
    </StyledCell>
    <Box>
      {component}
      {error && <FieldWarnning>{error}</FieldWarnning>}
    </Box>
  </StyledFormItem>
);
