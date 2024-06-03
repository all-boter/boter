import { Sidebar } from "@/components/views/Sidebar";
import { IStrategy, getStgById } from "@/services/stgApi";
import { Box } from "@mui/system"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SUCCESS } from "@/common/constants";
import { mainTheme } from "@/components/basics/muiColor";

export const StgDetail = () => {
  const { stgId } = useParams();
  const [strategy, setStrategy] = useState<IStrategy>()

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
        {strategy.id}
      </>
        :
        <>loading</>
      }
    </Box>
  </Box>
}