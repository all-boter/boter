import { ONE_HOUR, SUCCESS } from "@/common/constants"
import { DrawerProvider } from "@/components/basics/drawer/drawerContext"
import { FinancialChart } from "@/components/views/ai-trader/FinancialChart"
import { Menubar } from "@/components/views/ai-trader/Menubar"
import { Layout } from "@/components/views/layout"
import { CandleForChart, ChartConfig, getCandles, IOrder, OperationType, OrderStatus } from "@/services/botApi"
import { useEffect, useState } from "react"

const defaultChartConfig: ChartConfig = {
  candle: true,
  volume: true,
  rsi: undefined,
  roc: undefined,
  ma: undefined,
  ema: undefined,
  bb: undefined,
  kdj: undefined
};

export const AiTrader = () => {
  const [candles, setCandles] = useState<CandleForChart[]>([])
  const [orders, setOrders] = useState<IOrder[]>([
    // {
    //   orderId: 1,
    //   symbol: 'BTCUSDT',
    //   side: 'BUY',
    //   status: 'FILLED' as OrderStatus,
    //   price: 65135.9,
    //   qty: 100,
    //   quoteQty: 6513590,
    //   realizedProfit: 0,
    //   commission: null,
    //   commissionAsset: null,
    //   isBuyer: false,
    //   isMaker: true,
    //   time: 1721394000000,
    //   type: 'MARKET',
    //   operationType: 'ENTRY' as OperationType,
    //   id: 1,
    //   clientOrderId: '1'
    // }
  ])

  useEffect(() => {
    getCandles('BTCUSDT', '1h').then((res) => {
      if (res.code === SUCCESS) {
        // TODO 
        let candleData = res.data.map((i) => {
          return {
            ...i,
            time: (i.openTime + ONE_HOUR * 8) / 1000,
          }
        })

        setCandles(candleData)
      }
    })
  }, [])

  const menubarCallback = () => {
    console.log('menubarCallback==>',)
  }

  return <Layout>
    <DrawerProvider>
      <Menubar
        isMobile={false}
        menubarCallback={() => menubarCallback()}
       />
    </DrawerProvider>
    <FinancialChart candles={candles} orders={orders} chartConfig={defaultChartConfig} />
  </Layout>
}