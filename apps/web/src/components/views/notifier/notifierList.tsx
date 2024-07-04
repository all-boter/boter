import { SUCCESS } from "@/common/constants"
import { mainTheme } from "@/components/basics/mainColor"
import { ToastContext, ToastType } from "@/components/basics/toast/toastContext"
import { getNotifiers, INotifier, NotifierType } from "@/services/botApi"
import { Box } from "@mui/system"
import { Pencil } from "lucide-react"
import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react"
import dingtalk from "@assets/channel/dingtalk.svg"
import discord from "@assets/channel/discord.svg"
import feishu from "@assets/channel/feishu.svg"
import slack from "@assets/channel/slack.svg"
import telegram from "@assets/channel/telegram.svg"
import { Drawer } from "@/components/basics/drawer"
import { NotifierDrawer } from "./notifierDrawer"
import { useDrawerContext } from "@/components/basics/drawer/drawerContext"
import { DeletePop } from "./deletePop"

const notifierTypeToImage: { [key in NotifierType]: string } = {
  [NotifierType.Telegram]: telegram,
  [NotifierType.Discord]: discord,
  [NotifierType.Slack]: slack,
  [NotifierType.Dingtalk]: dingtalk,
  [NotifierType.Feishu]: feishu,
};

export interface NotifierListRef {
  refreshNotifiers: () => void;
  toggleDrawerUtil: () => void;
}

const initialNotifier: INotifier = {
  id: '',
  uid: '',
  name: '',
  type: null,
  config: {
    keyWords: "",
    webhookUrl: ""
  },
  description: ''
};


interface Props { }

export const NotifierList = forwardRef<NotifierListRef, Props>((props, ref) => {
  const [notifiers, setNotifiers] = useState<INotifier[]>([])
  const { showToast } = useContext(ToastContext)!;
  const { toggleDrawer } = useDrawerContext();

  const [seletedNotifier, setSeletedNotifier] = useState<INotifier>(initialNotifier)

  const fetchNotifiers = async () => {
    const res = await getNotifiers();
    if (res.code === SUCCESS) {
      setNotifiers(res.data);
    } else {
      showToast(`${res.msg}`, { type: ToastType.error, duration: 2000 });
    }
  };

  const onEdit = (notifier: INotifier) => {
    setSeletedNotifier(notifier)
    toggleDrawer('NotifierDrawer');
  }

  const toggleDrawerUtil = () => {
    setSeletedNotifier(initialNotifier)
    toggleDrawer('NotifierDrawer');
  }

  const onClose = () => {
    fetchNotifiers()
  }

  useImperativeHandle(ref, () => ({
    refreshNotifiers: fetchNotifiers,
    toggleDrawerUtil: toggleDrawerUtil
  }));

  useEffect(() => {
    fetchNotifiers();
  }, []);

  return <Box sx={{ mx: '20px' }}>
    <Box sx={{
      display: 'grid',
      width: '100%',
      gridGap: '20px',
      gridTemplateColumns: {
        mobile: 'repeat(1, minmax(0px, 1fr))',
        tablet: 'repeat(1, minmax(0px, 1fr))', md: 'repeat(2, minmax(0px, 1fr))',
        desktop: 'repeat(3, minmax(0px, 1fr))',
        xl: 'repeat(4, minmax(0px, 1fr))'
      },
    }}>
      {
        notifiers.map((item) => (
          <Box key={item.id} sx={{
            height: '100px',
            borderRadius: '4px',
            p: '20px',
            background: '#334155',
            color: mainTheme.white
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '20px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '20px', fontWeight: 700 }}>
                <Box component={'img'} src={notifierTypeToImage[item.type as NotifierType]} sx={{ width: 28, height: 28, pr: '6px' }} />
                {item.name}
                <Box component={Pencil} onClick={() => onEdit(item)} size={16} sx={{ ml: '6px', cursor: 'pointer' }} />
              </Box>
              <Box>
                {/* <Box component={Trash2} onClick={() => onDelete(item)} size={20} sx={{ cursor: 'pointer' }} /> */}
                <DeletePop id={item.id} callback={fetchNotifiers} />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', pb: '10px' }}>
              key: &nbsp;<Box>{(item.config as any)?.keyWords}</Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', pb: '10px' }}>
              WebhookUrl: &nbsp;<Box>{(item.config as any)?.webhookUrl}</Box>
            </Box>
            {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
              Info: &nbsp;<Box>{item.description || 'none'}</Box>
            </Box> */}
          </Box>
        ))
      }
    </Box>

    <Drawer anchor={"left"} id="NotifierDrawer">
      <NotifierDrawer notifier={seletedNotifier} onClose={() => onClose()} />
    </Drawer>
  </Box>
});
