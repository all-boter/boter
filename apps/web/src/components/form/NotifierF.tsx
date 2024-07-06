import { FormItem } from "../basics/DynamicFormProvider";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { SUCCESS } from "@/common/constants";
import { useForm, Controller } from "react-hook-form"
import { SelectItem } from "../basics/select";
import { ItemText } from "@radix-ui/react-select";
import { useDrawerContext } from "../basics/drawer/drawerContext";
import { getNotifiers } from "@/services/botApi";
import { NotifierSelect } from "../basics/select/notifierSelect";
import { SelectItemContainer } from "./selectF";

interface Props extends FormItem {
  values: any
  setFormValuesState: (val: any) => void
}

export const NotifierF = (props: Props) => {
  const { id, setFormValuesState } = props
  const [options, setOptions] = useState<any[]>([])
  const { control: controlF } = useForm();
  const { drawers } = useDrawerContext();
  const drawerOpen = drawers['BotDrawer'];

  const dataSourceFnUtil = async () => {
    const res = await getNotifiers()
    if (res.code === SUCCESS) {
      setOptions(res.data)
    } else {
      alert(res.msg)
    }
  }

  const handleChange = (value: any) => {
    const target = options.find((item) => item.id === value);
    if (!target) {
      return;
    }

    const { values } = props;
    const currentValues = values[id];
    if (!Array.isArray(currentValues)) {
      console.error('handleChange: Current values are not an array');
      return;
    }

    const isDuplicate = currentValues.some((item) => item.id === target.id);

    if (!isDuplicate) {
      setFormValuesState({
        ...values,
        [id]: [...currentValues, target]
      });
    }
  };

  const minus = (nid: string) => {
    const { values } = props;
    const currentValues = values[id];
    if (!Array.isArray(currentValues)) {
      console.error('minus: Current values are not an array');
      return;
    }
    setFormValuesState({
      ...values,
      [id]: currentValues.filter((item: any) => item.id !== nid)
    });
  }

  useEffect(() => {
    if (drawerOpen) {
      dataSourceFnUtil()
    }
  }, [props.dataSourceFn, drawerOpen])

  return <>
    <Box sx={{ my: '8px', color: '#FFF' }}>{props.label}</Box>

    <Controller
      name={id}
      control={controlF}
      render={({ field: { onChange, onBlur, value } }) => (
        <NotifierSelect
          options={options}
          value={props.values[id]}
          width={240}
          id='id'
          label='name'
          onChange={(e) => handleChange(e)}
          minus={minus}
        >
          <Box>
            {options.map((item) => {

              return (
                <SelectItem key={item['id']} value={item['id']}>
                  <ItemText>
                    <SelectItemContainer status={true}>
                      {item['name']}
                    </SelectItemContainer>
                  </ItemText>
                </SelectItem>
              );
            })}
          </Box>
        </NotifierSelect>
      )}
    />
  </>
}
