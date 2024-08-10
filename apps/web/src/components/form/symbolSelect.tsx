import { FormItem } from "../basics/DynamicFormProvider";
import { Box } from "@mui/system";
import { useEffect, useMemo, useState } from "react";
import { SUCCESS } from "@/common/constants";
import { BoterSelect } from "../basics/select";
import { useDrawerContext } from "../basics/drawer/drawerContext";
import { getSymbols } from "@/services/botApi";

interface Props extends FormItem {
  values: any
  setFormValuesState: (val: any) => void
}

export const SymbolSelect = (props: Props) => {
  const { id, setFormValuesState } = props
  const [options, setOptions] = useState<any[]>([])
  const { drawers } = useDrawerContext();
  const drawerOpen = drawers['BotDrawer'];

  const dataSourceFnUtil = async () => {
    const res = await getSymbols()
    if (res.code === SUCCESS) {
      setOptions(res.data)
    } else {
      alert(res.msg)
    }
  }

  const handleChange = (value: any) => {
    if (value) {
      const symbolObj = options.find((item) => item.id === value)
      setFormValuesState({
        ...props.values,
        [id]: symbolObj.name
      })
    }
  }

  const selectValue = useMemo(() => {
    const name = props.values[id]
    if (name && options.length) {
      return options.find((item) => item.name === name)?.id
    }

    return ''
  }, [props.values, id, options])

  useEffect(() => {
    if (drawerOpen) {
      dataSourceFnUtil()
    }
  }, [drawerOpen])

  return <>
    <Box sx={{ my: '8px', color: '#FFF' }}>{props.label}</Box>
    <BoterSelect
      options={options}
      value={selectValue}
      width={240}
      id='id'
      label='name'
      onChange={(e) => handleChange(e)}
    />
  </>
}
