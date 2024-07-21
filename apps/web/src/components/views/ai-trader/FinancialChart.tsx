import { useEffect, useRef } from "react"
import { createChart, SeriesMarker } from 'lightweight-charts'
import { CandleForChart, ChartConfig, IOrder, OperationType } from "@/services/botApi"
import { ONE_HOUR } from "@/common/constants"
import { TA, TAMethods } from "@/common/ta"

export interface Props {
  candles: CandleForChart[]
  orders: IOrder[]
  chartConfig: ChartConfig
}

interface RestIndicators {
  [key: string]: number[] | undefined;
}

const { Entry, Exit, Increase } = OperationType

const colors = ['purple', 'orange', 'yellowgreen']

const mode = 'light'

function getMarkText(order: IOrder): string {
  if (order.operationType === Entry) return 'Entry';
  if (order.operationType === Increase) return 'Increase';
  if (order.operationType === Exit) return 'Exit';

  return order.side === 'BUY' ? 'Buy' : 'Sell';
}

export const FinancialChart = ({ candles, orders, chartConfig }: Props) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return
    const { candle, volume, rsi, roc, kdj, bb, ...rest } = chartConfig
    const restIndicators = rest as RestIndicators

    const handleResize = () => {
      if (!chartContainerRef.current) return
      chart.applyOptions({ width: chartContainerRef.current.clientWidth })
    }

    const chart = createChart(chartContainerRef.current, {
      height: 500,
    })

    chart.applyOptions({
      layout: {
        background: {
          color: mode === 'light' ? '#FFFFFF' : 'rgba(0,0,0,0)',
        },
      },
      watermark: {
        color: 'rgba(0, 0, 0, 0)',
      },
      grid: {
        vertLines: {
          color: mode === 'light' ? '#f0f3fa' : '#2B2B43',
        },
        horzLines: {
          color: mode === 'light' ? '#f0f3fa' : '#2B2B43',
        },
      },
      timeScale: {
        visible: true,
        timeVisible: true,
      },
      localization: {
        dateFormat: 'yyyy-MM-dd',
      },
    })

    /** K-line chart */
    if (candle) {
      const candlestickSeries = chart.addCandlestickSeries()
      candlestickSeries.setData(candles as any)

      const markers = orders.map(
        (o) =>
        ({
          time: (new Date(o.time).valueOf() + ONE_HOUR * 8) / 1000,
          position: 'aboveBar',
          color: o.side === 'BUY' ? 'green' : 'red',
          shape: 'arrowDown',
          text: getMarkText(o),
        } as SeriesMarker<any>),
      )

      candlestickSeries.setMarkers(markers)
    }

    /** Trading volume */
    if (volume) {
      const volumes = candles.map((i) => ({
        time: i.time,
        value: i.volume,
        color: i.close > i.open ? '#26a69a' : '#f05350',
      }));
    
      // Add the volume series to a separate scale
      const volumeChart = chart.addHistogramSeries({
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: 'volume',
      });
    
      // Set the scale margins for the volume series to prevent overlapping
      chart.priceScale('volume').applyOptions({
        scaleMargins: {
          top: 0.8,  // Set top margin for the volume chart
          bottom: 0,
        },
      });
    
      volumeChart.setData(volumes as any);
    }

    /** Indicator chart */
    const ta = new TA(candles)
    for (const taName of Object.keys(restIndicators) as (keyof TAMethods)[]) {
      if (!restIndicators[taName]) continue
      const arr: number[] = restIndicators[taName]!
      arr.forEach((period, i) => {
        const line = chart.addLineSeries({
          lineWidth: 1,
          color: colors[i],
        })

        line.setData(ta[taName](period) as any)
      })
    }

    if (bb) {
      const data = ta.bb(bb[0], bb[1])
      data.forEach((d, i) => {
        const line = chart.addLineSeries({
          lineWidth: 1,
          color: colors[i],
        })
        line.setData(d)
      })
    }

    if (rsi) {
      const data = ta.rsi(rsi)

      const rsiChart = chart.addHistogramSeries({
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: '',
      })

      rsiChart.setData(data)
    }

    if (roc) {
      const data = ta.roc(roc)

      const rocChart = chart.addHistogramSeries({
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: '',
      })

      rocChart.setData(data)
    }

    if (kdj) {
      const data = ta.kdj(kdj)

      data.forEach((item, i) => {
        const kdjChart = chart.addLineSeries({
          lineWidth: 1,
          color: colors[i],
          priceScaleId: '',
        })

        kdjChart.setData(item)
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [candles, chartConfig, orders])

  return <div ref={chartContainerRef} style={{ width: '100%', height: '1000px' }} />
}