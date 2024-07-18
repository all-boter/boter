import { ONE_HOUR, SUCCESS } from "@/common/constants"
import { FinancialChart } from "@/components/views/backtest/FinancialChart"
import { Layout } from "@/components/views/layout"
import { CandleForChart, ChartConfig, getCandles, ICandle, IOrder } from "@/services/botApi"
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

export const Backtest = () => {
  const [candles, setCandles] = useState<CandleForChart[]>([])
  const [orders, setOrders] = useState<IOrder[]>([])

  useEffect(() => {
    getCandles('BTCUSDT').then((res) => {
      if (res.code === SUCCESS) {
        // TODO 
        let candleData = res.data.map((i) => {
          return {
            ...i,
            // TODO: Time zone
            // time: (i.openTime + ONE_HOUR * 8) / 1000,
            time: (i.openTime) / 1000,
            // time: i.time / 1000,
          }
        })

        setCandles(candleData)
      }
    })
  }, [])

  // console.log('%c=','color:red',orders)

  return <Layout>
    Backtest
    <FinancialChart candles={candles} orders={orders} chartConfig={defaultChartConfig} />
  </Layout>
}