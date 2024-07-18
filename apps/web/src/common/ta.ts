import { CandleForChart } from '@/services/botApi'
import { SMA, EMA, RSI, ROC, BollingerBands, StochasticOscillator } from 'trading-signals'

interface Result {
  time: any
  value: number
  color?: string
}

export type TAMethods = {
  sma: (period: number) => Result[]
  ma: (period: number) => Result[]
  ema: (period: number) => Result[]
  rsi: (period: number) => Result[]
  roc: (period: number) => Result[]
  bb: (period: number, d: number) => [Result[], Result[], Result[]]
  kdj: (rPeriod: number, kPeriod: number, dPeriod: number) => [Result[], Result[]]
}

export class TA {
  constructor(private candles: CandleForChart[]) {}

  sma(period: number): Result[] {
    const sma = new SMA(period)
    return this.candles.reduce<Result[]>((result, candle) => {
      const value = sma.update(candle.close)
      if (value) result.push({ time: candle.time, value: Number(value.toFixed(2)) })
      return result
    }, [])
  }

  ma(period: number): Result[] {
    return this.sma(period)
  }

  ema(period: number): Result[] {
    const ema = new EMA(period)
    return this.candles.reduce<Result[]>((result, candle) => {
      ema.update(candle.close)
      if (ema.isStable) {
        const value = Number(ema.getResult().toFixed(2))
        result.push({ time: candle.time, value })
      }
      return result
    }, [])
  }

  rsi(period: number): Result[] {
    const rsi = new RSI(period)
    return this.candles.reduce<Result[]>((result, candle) => {
      rsi.update(candle.close)
      if (rsi.isStable) {
        const value = Number(rsi.getResult().toFixed(2))
        result.push({ time: candle.time, value })
      }
      return result
    }, [])
  }

  roc(period: number): Result[] {
    const roc = new ROC(period)
    return this.candles.reduce<Result[]>((result, candle) => {
      roc.update(candle.close)
      if (roc.isStable) {
        const value = Number(roc.getResult().toFixed(6))
        result.push({
          time: candle.time,
          value,
          color: value > 0 ? '#26a69a' : '#f05350',
        })
      }
      return result
    }, [])
  }

  bb(period: number, d = 2): [Result[], Result[], Result[]] {
    const lows: Result[] = []
    const mids: Result[] = []
    const ups: Result[] = []
    const bb = new BollingerBands(period, d)
    for (const { time, close } of this.candles) {
      bb.update(close)
      if (bb.isStable) {
        const { lower, middle, upper } = bb.getResult()
        lows.push({ time, value: Number(lower.toFixed(2)) })
        mids.push({ time, value: Number(middle.toFixed(2)) })
        ups.push({ time, value: Number(upper.toFixed(2)) })
      }
    }
    return [ups, mids, lows]
  }

  kdj(rPeriod = 9, kPeriod = 3, dPeriod = 3): [Result[], Result[]] {
    const dataK: Result[] = []
    const dataD: Result[] = []

    const kdj = new StochasticOscillator(rPeriod, kPeriod, dPeriod)

    for (const candle of this.candles) {
      const stochResult = kdj.update(candle)
      if (kdj.isStable && stochResult) {
        const { stochD, stochK } = stochResult
        const { time } = candle
        dataD.push({ time, value: Number(stochD.toFixed(2)) })
        dataK.push({ time, value: Number(stochK.toFixed(2)) })
      }
    }
    return [dataK, dataD]
  }
}