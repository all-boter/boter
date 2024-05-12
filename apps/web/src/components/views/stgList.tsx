import { Box, styled } from "@mui/system"
import { IStrategy } from '@/services/stgApi';
import { useEffect, useState } from "react";
import { Button } from "../basics/button";
import { DeletePop } from "./deletePop";
import { mainColor } from "../basics/muiColor";
import { Drawer } from "../basics/drawer/indenx";
import { StgDrawer } from "./stgDrawer";
import { AppDispatch, stgListState, useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { fetchStrategies } from "@/store/appSlice";

const StyledButton = styled(Button)(`margin-left: 6px;`)

export const StgList = () => {
  const dispatch: AppDispatch = useDispatch();
  const stgList = useAppSelector(stgListState)

  const [currentStg, setCurrentStg] = useState<IStrategy>({
    name: "",
    id: '',
    uid: '',
    isPublic: false,
    paramsSchema: []
  })
  const [drawerOpen, setDrawer] = useState(false);

  const onCreate = (stg: IStrategy) => {
    setDrawer(!drawerOpen)
    setCurrentStg(stg)
  }

  useEffect(() => {
    dispatch(fetchStrategies());
  }, [])

  console.log('%c=stgList', 'color:red', stgList)

  return <Box sx={{
    display: 'grid',
    width: '100%',
    gridGap: '20px',
    // gridTemplateRows: '200px 200px',
    gridTemplateColumns: {
      mobile: 'repeat(1, minmax(0px, 1fr))',
      tablet: 'repeat(1, minmax(0px, 1fr))',
      md: 'repeat(2, minmax(0px, 1fr))',
      desktop: 'repeat(3, minmax(0px, 1fr))',
      xl: 'repeat(4, minmax(0px, 1fr))'
    },
  }}>
    {
      stgList && stgList.map((item) => (
        <Box key={item.id} sx={{
          height: '100px',
          borderRadius: '4px',
          p: '20px',
          background: '#334155'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: '20px' }}>
            <Box sx={{ width: '32px', height: '32px', background: '#4b5563', borderRadius: '50%' }}></Box>

            <Box sx={{ pl: '6px' }}>
              <Box sx={{ fontSize: '18px', fontWeight: 700, color: '#f3f4f6' }}>{item.name}</Box>
              <Box component={'span'} sx={{ color: '#9ca3af' }}>
                {item.intro || 'No introduction'}
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ color: '#f3f4f6' }}>Free</Box>
            <Box>
              <DeletePop stg={item} />
              {/* <StyledButton bg="#0ecb81" size="small">Create bot</StyledButton> */}
              <StyledButton onClick={() => onCreate(item)} color={mainColor[103]} bg={mainColor[106]} size={'small'}>Create bot</StyledButton>
            </Box>
          </Box>
        </Box>
      ))
    }

    <Drawer visible={drawerOpen} onClose={() => setDrawer(false)} anchor={"left"}>
      <StgDrawer stg={currentStg} />
    </Drawer>
  </Box>
}