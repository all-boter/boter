import { DrawerProvider } from "@/components/basics/drawer/drawerContext"
import { Notifier } from "@/components/views/notifier"
import { Sidebar } from "@/components/views/Sidebar"

export const NotifierPage = () => {
  return <div className="page-box">
    <Sidebar />
    <DrawerProvider>
      <Notifier />
    </DrawerProvider>
  </div>
}