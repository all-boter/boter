import { BotStatus, ONE_HOUR, SUCCESS } from "@/common/constants"
import { DrawerProvider } from "@/components/basics/drawer/drawerContext"
import { FinancialChart } from "@/components/views/ai-trader/FinancialChart"
import { Menubar } from "@/components/views/ai-trader/Menubar"
import { Layout } from "@/components/views/layout"
import { CandleForChart, ChartConfig, getAiTrader, getCandles, IAiTraderParams, IOrder } from "@/services/botApi"
import { useEffect, useMemo, useState } from "react"
import { AppDispatch, botStorageState, useAppSelector } from "@/store"
import { useDispatch } from "react-redux"
import { appSlice } from "@/store/appSlice"
import { SymbolSelect } from "./symbolSelect"

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

/*
  {
    orderId: 1,
    symbol: 'BTCUSDT',
    side: 'BUY',
    status: 'FILLED' as OrderStatus,
    price: 65135.9,
    qty: 100,
    quoteQty: 6513590,
    realizedProfit: 0,
    commission: null,
    commissionAsset: null,
    isBuyer: false,
    isMaker: true,
    time: 1721394000000,
    type: 'MARKET',
    operationType: 'ENTRY' as OperationType,
    id: 1,
    clientOrderId: '1'
  }
*/

export interface IQueryArgs {
  interval: string,
  symbol: string
}

export const AiTrader = () => {
  const [candles, setCandles] = useState<CandleForChart[]>([])
  const botStorage = useAppSelector(botStorageState)

  const [queryArgs, setQueryArgs] = useState<IQueryArgs>({
    interval: '1h',
    symbol: 'BTCUSDT'
  })

  const dispatch: AppDispatch = useDispatch();

  const [aiTraderParams, setAiTraderParams] = useState<IAiTraderParams>({
    id: '',
    botId: '',
    runnerId: '',
    status: BotStatus.Stopped,
    paramsSchema: []
  })

  const getAiTraderUtil = async () => {
    const res = await getAiTrader()
    if (res.code === SUCCESS) {
      setAiTraderParams(res.data)
      const { botId, status } = res.data
      dispatch(appSlice.actions.setBotStatus({ id: botId, status }));
    }
  }

  const getCandlesUtil = ({ symbol, interval }: IQueryArgs) => {
    getCandles(symbol, interval).then((res) => {
      if (res.code === SUCCESS) {
        const candleData = res.data.map((i) => {
          return {
            ...i,
            time: (i.openTime + ONE_HOUR * 8) / 1000,
          }
        })

        setCandles(candleData)
      }
    })
  }


  const orders = useMemo<IOrder[]>(() => {
    if (aiTraderParams.botId) {
      const bot = botStorage[aiTraderParams.botId]
      return Array.isArray(bot?.data) ? bot.data : []
    } else {
      return []
    }
  }, [aiTraderParams, botStorage])

  const onQuery = (symbol: string, interval: string) => {
    setQueryArgs({
      symbol,
      interval
    })

    getCandlesUtil({
      symbol,
      interval
    })
  }

  useEffect(() => {
    getCandlesUtil(queryArgs)
    getAiTraderUtil()
  }, [])

  return <Layout>
    <SymbolSelect callback={onQuery} queryArgs={queryArgs} />
    <DrawerProvider>
      <Menubar
        isMobile={false}
        aiTraderParams={aiTraderParams}
        menubarCallback={() => getAiTraderUtil()}
      />
    </DrawerProvider>
    <FinancialChart candles={candles} orders={orders} chartConfig={defaultChartConfig} />
  </Layout>
}