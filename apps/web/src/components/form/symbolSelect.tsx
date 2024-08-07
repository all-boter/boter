import { FormItem } from "../basics/DynamicFormProvider";
import { Box, styled } from "@mui/system";
import { useEffect, useState } from "react";
import { SUCCESS } from "@/common/constants";
import { useForm, Controller } from "react-hook-form"
import { BoterSelect, SelectItem } from "../basics/select";
import { ItemText } from "@radix-ui/react-select";
import { mainTheme } from "../basics/mainColor";
import { useDrawerContext } from "../basics/drawer/drawerContext";
import { getSymbols } from "@/services/botApi";

interface Props extends FormItem {
  values: any
  setFormValuesState: (val: any) => void
}

export const SelectItemContainer = styled('div') <{ status: boolean }>`
  display: flex;
  justify-content: space-between;
  cursor: ${props => props.status ? 'pointer' : 'not-allowed'};
  height: 100%;
`

export const SymbolSelect = (props: Props) => {
  const { id, setFormValuesState } = props
  const [options, setOptions] = useState<any[]>([])
  const { control: controlF } = useForm();
  const { drawers } = useDrawerContext();
  const drawerOpen = drawers['BotDrawer'];

  const dataSourceFnUtil = async () => {
    const res = await getSymbols()
    console.log('%c=getSymbols','color:red',res)
    if (res.code === SUCCESS) {
      setOptions(res.data)
    } else {
      alert(res.msg)
    }
  }

  const handleChange = (value: any) => {
    setFormValuesState({
      ...props.values,
      [id]: value
    })
  }

  useEffect(() => {
    if (drawerOpen) {
      dataSourceFnUtil()
    }
  }, [drawerOpen])

  return <>
    <Box sx={{ my: '8px', color: '#FFF' }}>{props.label}</Box>

    <Controller
      name={id}
      control={controlF}
      render={({ field: { onChange, onBlur, value } }) => (
        <BoterSelect
          options={options}
          value={props.values[id]}
          width={240}
          id='id'
          label='name'
          onChange={(e) => handleChange(e)}
        >
          <Box>
            {options.map((item) => {

              return (
                <SelectItem key={item['id']} value={item['id']}>
                  <ItemText>
                    <SelectItemContainer status={item.status}>
                      {item['name']}
                    </SelectItemContainer>
                  </ItemText>
                </SelectItem>
              );
            })}
          </Box>
        </BoterSelect>
      )}
    />
  </>
}
