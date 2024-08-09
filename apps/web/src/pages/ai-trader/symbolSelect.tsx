import { SUCCESS } from "@/common/constants"
import { Button } from "@/components/basics/button"
import { BoterSelect } from "@/components/basics/select"
import { getSymbols } from "@/services/botApi"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"

const intervals = [
  // '1m',
  { id: '3m' },
  { id: '5m' },
  { id: '15m' },
  { id: '1h' },
  { id: '1d' },
  { id: '1w' },
]

export const SymbolSelect = () => {

  const [options, setOptions] = useState<any[]>([])
  const [symbol, setSymbol] = useState<string>('')
  const [interval, setInterval] = useState<string>('')

  const handleChange = (value: any, type: 1 | 2) => {
    if (type === 1) {
      const symbolObj = options.find((item) => item.id === value)
      setSymbol(symbolObj.name)
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

  useEffect(() => {
    dataSourceFnUtil()
  }, [])

  return <Box sx={{
    display: 'flex',
    mb: '8px'
  }}>
    <BoterSelect
      options={options} onChange={(e) => handleChange(e, 1)}
      id='id'
      label='name'
      width={160}
    />

    <Box sx={{
      mr: '10px',
      ml: '10px'
    }}>
      <BoterSelect options={intervals} onChange={(e) => handleChange(e, 2)}
        id='id'
        label='id'
        width={160}
      />
    </Box>

    <Button padding='0px 12px'>
      <span>
        Query
      </span>
    </Button>
  </Box>
}