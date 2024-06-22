import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Sidebar } from "@/components/views/Sidebar";
import { IStrategy, editStg, getStgById } from "@/services/stgApi";
import { Box, styled } from "@mui/system"
import { useParams } from "react-router-dom";
import { SUCCESS } from "@/common/constants";
import { mainTheme } from "@/components/basics/muiColor";
import { Input } from "@/components/basics/input";
import { Textarea } from "@/components/basics/input/textarea";
import { Switch } from "@/components/basics/switch";
import { Button } from "@/components/basics/button";
import { ToastContext, ToastType } from "@/components/basics/toast/toastContext";

const StyledFormItem = styled('div')(`
  display: flex;
  margin-bottom: 10px;
`)

const FieldWarnning = styled('div')(`
  font-size: 14px;
  color: ${mainTheme.warning};
  height: 18px;
  line-height: 18px;
`)

const StyledCell = styled('div')(`
  display: inline-block;
  width: 130px;
`)

const StyledLabel = styled('label')(`
  display: inline-flex;
  align-items: center;
  height: 32px;
`)

export const StgDetail = () => {
  const { stgId } = useParams();
  const [strategy, setStrategy] = useState<IStrategy>()
  const { showToast } = useContext(ToastContext)!;
  const [schemaWarnning, setSchemaWarnning] = useState('')
  const [schemaStr, setSchemaStr] = useState('')
  const [stgName, setStgName] = useState('')

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
      fetchStgUtil(stgId as string)
    } else {
      showToast(res.msg, { type: ToastType.success })
    }
  }

  const fetchStgUtil = async (stgId: string) => {
    const res = await getStgById(stgId)
    if (res.code === SUCCESS) {
      setStrategy(res.data)
      setStgName(res.data.name)
      if (res.data?.paramsSchema?.length) {
        setSchemaStr(JSON.stringify(res.data.paramsSchema))
      }
    }
  }

  useEffect(() => {
    fetchStgUtil(stgId as string)
  }, [stgId])

  return <div className="page-box">
    <Sidebar />
    <Box sx={{ color: mainTheme.white, mx: '20px', mt: '20px' }}>
      {strategy ? <>
        <Box>
          <Box sx={{ mb: '16px', fontSize: '20px', fontWeight: '500px' }}>
            <Box component={'span'} sx={{color: mainTheme.golden,fontSize: '22px'}}>
              {strategy.name}&nbsp;
            </Box>
            Strategy Detail
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
                width={400}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setStgName(event.target.value)}
              />
              {!strategy.name && <FieldWarnning>
                Please enter Name
              </FieldWarnning>}
            </Box>
          </StyledFormItem>

          <StyledFormItem>
            <StyledCell>
              <StyledLabel>
                introduce:
              </StyledLabel>
            </StyledCell>
            <Textarea
              value={strategy.intro}
              width={400}
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
                width={400}
                height={200}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleTextChange(e, 2)}
                placeholder="Enter your text here"
              />
              {schemaWarnning && <FieldWarnning>
                {schemaWarnning}
              </FieldWarnning>}
            </Box>
          </StyledFormItem>

          <StyledFormItem sx={{ height: '32px' }}>
            <StyledCell>
              <StyledLabel>
                Customize UI:
              </StyledLabel>
            </StyledCell>

            <Switch isChecked={strategy.enableUI as boolean} onCheckedChange={(status) => setStrategy({
              ...strategy,
              enableUI: status
            } as IStrategy)} />
          </StyledFormItem>

          <StyledFormItem sx={{ height: '32px' }}>
            <StyledCell>
              <StyledLabel>
                Public:
              </StyledLabel>
            </StyledCell>

            <Switch isChecked={strategy.isPublic as boolean} onCheckedChange={(status) => setStrategy({
              ...strategy,
              isPublic: status
            } as IStrategy)} />
          </StyledFormItem>

          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Button width="160" onClick={() => onSubmit()}>Submit</Button>
          </Box>
        </Box>
      </>
        :
        <>loading</>
      }
    </Box>
  </div>
}