import { DrawerProvider } from "@/components/basics/drawer/drawerContext"
import { Layout } from "@/components/views/layout"
import { Notifier } from "@/components/views/notifier"

export const NotifierPage = () => {
  return <Layout>
    <DrawerProvider>
      <Notifier />
    </DrawerProvider>
  </Layout>
}