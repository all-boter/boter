import { Sidebar } from "@/components/views/Sidebar";
import { IStrategy, getStgById } from "@/services/stgApi";
import { Box } from "@mui/system"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SUCCESS } from "@/common/constants";

export const StgDetail = () => {
  const { stgId } = useParams();
  const [strategy,setStrategy] = useState<IStrategy>()

  useEffect(()=>{
    const fetchStg = async(stgId:string)=>{
      const res = await getStgById(stgId)
      if (res.code === SUCCESS) {
        setStrategy(res.data)
      }
    }

    fetchStg(stgId as string)
  },[stgId])

  return <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', width: '100%', background: '#1e293b' }}>
    <Sidebar />
    <Box>
      { strategy && strategy.id}
    </Box>
  </Box>
}