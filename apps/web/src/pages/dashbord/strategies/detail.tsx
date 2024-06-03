import { ChangeEvent, useEffect, useState } from "react";
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

const StyledFormItem = styled('div')(`
  display: flex;
  margin-bottom: 10px;
`)

const StyledCell = styled('div')(`
  display: inline-block;
  width: 120px;
`)

const StyledLabel = styled('label')(`
  display: inline-flex;
  align-items: center;
  height: 32px;
`)


export const StgDetail = () => {
  const { stgId } = useParams();
  const [strategy, setStrategy] = useState<IStrategy>()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrategy({
      ...strategy,
      name: event.target.value,
    } as IStrategy)
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStrategy({
      ...strategy,
      intro: event.target.value,
    } as IStrategy)
  }

  const onSubmit = async () => {
    console.log('%c=onSubmit==>', 'color:red', strategy)
    if (strategy) {
      const res = await editStg(strategy)
      if (res.code === SUCCESS) {
        alert(res.msg)
      } else {
        alert(res.msg)
      }
    }
  }

  useEffect(() => {
    const fetchStg = async (stgId: string) => {
      const res = await getStgById(stgId)
      if (res.code === SUCCESS) {
        setStrategy(res.data)
      }
    }

    fetchStg(stgId as string)
  }, [stgId])

  return <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', width: '100%', background: '#1e293b' }}>
    <Sidebar />
    <Box sx={{ color: mainTheme.white, mx: '20px', mt: '20px' }}>
      {strategy ? <>
        <Box>
          <Box sx={{ mb: '16px', fontSize: '20px', fontWeight: '500px' }}>Strategy Detail</Box>
          <StyledFormItem>
            <StyledCell>
              <StyledLabel>
                Name:
              </StyledLabel>
            </StyledCell>
            <Input
              value={strategy.name}
              width={400}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            />
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
              height={200}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleTextChange(e)}
              placeholder="Enter your text here"
            />
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
            <Button onClick={() => onSubmit()}>Submit</Button>
          </Box>
        </Box>
      </>
        :
        <>loading</>
      }
    </Box>
  </Box>
}