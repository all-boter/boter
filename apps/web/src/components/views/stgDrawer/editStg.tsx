import { useDrawerContext } from "@/components/basics/drawer/drawerContext";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { IStrategy, editStg } from "@/services/stgApi";
import { Box, styled } from "@mui/system"
import { SUCCESS } from "@/common/constants";
import { mainTheme } from "@/components/basics/mainColor";
import { Input } from "@/components/basics/input";
import { Textarea } from "@/components/basics/input/textarea";
import { Switch } from "@/components/basics/switch";
import { Button } from "@/components/basics/button";
import { ToastContext, ToastType } from "@/components/basics/toast/toastContext";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { fetchStrategies } from "@/store/appSlice";

export const StyledFormItem = styled('div')(`
  margin-bottom: 10px;
`)

export const FieldWarnning = styled('div')(`
  font-size: 14px;
  color: ${mainTheme.warning};
  height: 18px;
  line-height: 18px;
`)

export const StyledCell = styled('div')(`
  display: inline-block;
`)

export const StyledLabel = styled('label')(`
  display: inline-flex;
  align-items: center;
  height: 32px;
`)

interface Props {
  stg: IStrategy
}

export const EditStg = ({ stg }: Props) => {
  const { closeDrawer } = useDrawerContext();
  const [strategy, setStrategy] = useState<IStrategy>()
  const { showToast } = useContext(ToastContext)!;
  const [schemaWarnning, setSchemaWarnning] = useState('')
  const [schemaStr, setSchemaStr] = useState('')
  const [stgName, setStgName] = useState('')

  const dispatch: AppDispatch = useDispatch();

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>, type: 1 | 2) => {
    if (type === 1) {
      setStrategy({
        ...strategy,
        intro: event.target.value,
      } as IStrategy)
    } else if (type === 2) {
      if (event.target.value) {
        setSchemaStr(event.target.value)
      } else {
        setSchemaWarnning('Please enter paramsSchema')
      }
    }
  }

  const onSubmit = async () => {
    if (!strategy || !stgName) {
      return
    }

    let paramsSchema = []
    try {
      paramsSchema = JSON.parse(schemaStr)
      schemaWarnning && setSchemaWarnning('')
    } catch (error) {
      setSchemaWarnning('ParamsSchema format error,Must be an array of objects')
      return
    }

    const res = await editStg({ ...strategy, paramsSchema, name: stgName })
    if (res.code === SUCCESS) {
      showToast(res.msg, { type: ToastType.success, duration: 2000 })
      closeDrawer('editStg')
      dispatch(fetchStrategies());
    } else {
      showToast(res.msg, { type: ToastType.error })
    }
  }

  useEffect(() => {
    setStrategy({ ...stg, intro: stg.intro || '' })
    setStgName(stg.name)
    if (stg?.paramsSchema?.length) {
      setSchemaStr(JSON.stringify(stg?.paramsSchema))
    }
  }, [stg])

  return <Box sx={{ color: mainTheme.white, pt: '10px', mx: '20px' }}>
    <Box sx={{ mb: '16px', fontSize: '20px', fontWeight: '500px' }}>
      Edit&nbsp;
      <Box component={'span'} sx={{ color: mainTheme.golden, fontSize: '22px' }}>
        {strategy?.name}
      </Box>
    </Box>

    <StyledFormItem>
      <StyledCell>
        <StyledLabel>
          Name:
        </StyledLabel>
      </StyledCell>
      <Box>
        <Input
          value={stgName}
          width={300}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setStgName(event.target.value)}
        />
        {!strategy?.name && <FieldWarnning>
          Please enter name
        </FieldWarnning>}
      </Box>
    </StyledFormItem>

    <StyledFormItem>
      <StyledCell>
        <StyledLabel>
          Introduce:
        </StyledLabel>
      </StyledCell>
      <Textarea
        value={strategy?.intro}
        width={300}
        height={100}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleTextChange(e, 1)}
        placeholder="Enter your text here"
      />
    </StyledFormItem>

    <StyledFormItem>
      <StyledCell>
        <StyledLabel>
          Params schema:
        </StyledLabel>
      </StyledCell>
      <Box>
        <Textarea
          value={schemaStr}
          width={300}
          height={200}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleTextChange(e, 2)}
          placeholder="Enter your text here"
        />
        {schemaWarnning && <FieldWarnning>
          {schemaWarnning}
        </FieldWarnning>}
      </Box>
    </StyledFormItem>

    <StyledFormItem>
      <StyledCell>
        <StyledLabel>
          Customize UI:
        </StyledLabel>
      </StyledCell>

      <Switch isChecked={strategy?.enableUI as boolean} onCheckedChange={(status) => setStrategy({
        ...strategy,
        enableUI: status
      } as IStrategy)} />
    </StyledFormItem>

    <StyledFormItem>
      <StyledCell>
        <StyledLabel>
          Public:
        </StyledLabel>
      </StyledCell>

      <Switch isChecked={strategy?.isPublic as boolean} onCheckedChange={(status) => setStrategy({
        ...strategy,
        isPublic: status
      } as IStrategy)} />
    </StyledFormItem>

    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      pt: '20px'
    }}>
      <Button padding='6px 20px' onClick={() => onSubmit()}>Submit</Button>
    </Box>
  </Box>
}