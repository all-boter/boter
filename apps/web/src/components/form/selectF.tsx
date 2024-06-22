import { FormItem } from "../basics/DynamicFormProvider";
import { Box, styled } from "@mui/system";
import { useEffect, useState } from "react";
import { SUCCESS } from "@/common/constants";
import { useForm, Controller } from "react-hook-form"
import { BoterSelect, SelectItem } from "../basics/select";
import { ItemText } from "@radix-ui/react-select";
import { mainColor, mainTheme } from "../basics/muiColor";

interface Props extends FormItem {
  values: any
  setFormValuesState: (val: any) => void
}

const ItemContainer = styled('div') <{ status: boolean }>`
  display: flex;
  justify-content: space-between;
  cursor: ${props => props.status ? 'pointer' : 'not-allowed'};
  height: 100%;
`

const StatusStyled = styled('div') <{ status: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  font-size: 12px;
  text-align: center;
  border-radius: 8px;
  background: ${props => props.status ? mainTheme.golden : mainColor[102]};
  color: ${props => props.status ? 'black' : mainTheme.white};
`;

export const SelectF = (props: Props) => {
  const { control, id, setFormValuesState } = props
  const [options, setOptions] = useState<any[]>([])
  const { control: controlF } = useForm();

  const dataSourceFnUtil = async () => {
    if (props.dataSourceFn) {
      const res = await props.dataSourceFn()
      if (res.code === SUCCESS) {
        setOptions(res.data)
      } else {
        alert(res.msg)
      }
    }
  }

  const handleChange = (value: any) => {
    if (control.id) {
      setFormValuesState({
        ...props.values,
        [id]: value
      })
    }
  }

  useEffect(() => {
    dataSourceFnUtil()
  }, [props.dataSourceFn])

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
                <SelectItem key={item['id']} value={item['id']} disabled={!item.status}>
                  <ItemText>
                    <ItemContainer status={item.status}>
                      {item['name']}
                      <StatusStyled status={item.status}>
                        {item.status ? 'Online' : 'Offline'}
                      </StatusStyled>
                    </ItemContainer>
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
