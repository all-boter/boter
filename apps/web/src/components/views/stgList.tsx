import { Box, styled } from "@mui/system"
import { IStrategy } from '@/services/stgApi';
import { useEffect, useState } from "react";
import { Button } from "../basics/button";
import { DeletePop } from "./deletePop";
import { mainTheme, muiGreen } from "../basics/mainColor";
import { Drawer } from "../basics/drawer";
import { StgDrawer } from "./stgDrawer";
import { AppDispatch, stgListState, useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { fetchStrategies } from "@/store/appSlice";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import { useDrawerContext } from "../basics/drawer/drawerContext";
import { EditStg } from "./stgDrawer/editStg";

enum EditerType {
  Code = 1,
  Config = 2
}

const StyledButton = styled(Button)(`margin-left: 6px;`)

export const StgList = () => {
  const dispatch: AppDispatch = useDispatch();
  const stgList = useAppSelector(stgListState)
  const { toggleDrawer } = useDrawerContext();
  const [currentStg, setCurrentStg] = useState<IStrategy>({
    name: "",
    id: '',
    uid: '',
    isPublic: false,
    paramsSchema: []
  })
  const navigate = useNavigate();

  const onEdit = (strategy: IStrategy, editerType: EditerType) => {
    switch (editerType) {
      case EditerType.Code:
        navigate(`/editor/server/${strategy.id}`);
        break;

      case EditerType.Config:
        setCurrentStg(strategy)
        toggleDrawer('editStg');
        break;

      default:
        break;
    }
  }

  const onCreate = (stg: IStrategy) => {
    setCurrentStg(stg)
    toggleDrawer('createBot');
  }

  useEffect(() => {
    dispatch(fetchStrategies());
  }, [])

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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '20px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '32px', height: '32px', background: '#4b5563', borderRadius: '50%' }}></Box>

              <Box sx={{ pl: '6px' }}>
                <Box sx={{ fontSize: '18px', fontWeight: 700, color: mainTheme.white }}>
                  {item.name}
                  <Box component={Pencil} onClick={() => onEdit(item, EditerType.Config)} size={16} sx={{ ml: '6px', cursor: 'pointer' }} />
                </Box>
                <Box component={'span'} sx={{ color: '#9ca3af' }}>
                  {item.intro || 'No introduction'}
                </Box>
              </Box>
            </Box>

            <Box>
              <StyledButton onClick={() => onEdit(item, EditerType.Code)} color={'#fff1f1'} bg={muiGreen.seaFoam} size={'small'}>coding</StyledButton>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ color: mainTheme.white }}>Free</Box>
            <Box>
              <DeletePop stg={item} />
              <StyledButton onClick={() => onCreate(item)} color={mainTheme[103]} bg={mainTheme[106]} size={'small'}>Create bot</StyledButton>
            </Box>
          </Box>
        </Box>
      ))
    }

    <Drawer anchor={"left"} id="createBot">
      <StgDrawer stg={currentStg} />
    </Drawer>

    <Drawer anchor={"left"} id="editStg">
      <EditStg stg={currentStg}  />
    </Drawer>
  </Box>
}