import { SUCCESS } from "@/common/constants"
import { Button } from "@/components/basics/button"
import { BoterSelect } from "@/components/basics/select"
import { ToastContext, ToastType } from "@/components/basics/toast/toastContext"
import { getSymbols } from "@/services/botApi"
import { Box } from "@mui/system"
import { useContext, useEffect, useState } from "react"
import { IQueryArgs } from "."
import { intervals } from "@/components/form/PeriodS"

interface Props {
  callback: (symbol: string, interval: string) => void
  queryArgs: IQueryArgs
}

export const SymbolSelect = ({ queryArgs, callback }: Props) => {
  const { showToast } = useContext(ToastContext)!;
  const [options, setOptions] = useState<any[]>([])
  const [symbol, setSymbol] = useState<string>('')
  const [interval, setInterval] = useState<string>('')

  const handleChange = (value: any, type: 1 | 2) => {
    if (type === 1) {
      setSymbol(value)
    } else {
      setInterval(value)
    }
  }

  const dataSourceFnUtil = async () => {
    const res = await getSymbols()
    if (res.code === SUCCESS) {
      setOptions(res.data)
    } else {
      alert(res.msg)
    }
  }

  const onQuery = () => {
    if (!symbol) {
      showToast(`Symbol required`, { type: ToastType.error, duration: 2000 })
      return
    }

    if (!interval) {
      showToast(`Interval required`, { type: ToastType.error, duration: 2000 })

      return
    }

    const symbolObj = options.find((item) => item.id === symbol)

    callback(symbolObj.name, interval)
  }

  useEffect(() => {
    dataSourceFnUtil()
  }, [])

  useEffect(() => {
    queryArgs?.interval && setInterval(queryArgs.interval)
    if (queryArgs?.symbol && options.length) {
      const symbolObj = options.find((item) => item.name === queryArgs.symbol)
      setSymbol(symbolObj.id)
    }
  }, [queryArgs,options])

  return <Box sx={{
    display: 'flex',
    mb: '8px'
  }}>
    <BoterSelect
      options={options}
      onChange={(e) => handleChange(e, 1)}
      value={symbol}
      id='id'
      label='name'
      width={160}
    />

    <Box sx={{
      mr: '10px',
      ml: '10px'
    }}>
      <BoterSelect
        options={intervals}
        onChange={(e) => handleChange(e, 2)}
        value={interval}
        id='id'
        label='id'
        width={160}
      />
    </Box>

    <Button onClick={() => onQuery()} padding='0px 12px'>
      Query
    </Button>
  </Box>
}