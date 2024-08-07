import { SUCCESS } from "@/common/constants";
import { Button } from "@/components/basics/button"
import { Modal, ModalContent } from "@/components/basics/modal";
import { AddModalContent } from "@/components/views/symbol/addModalContent";
import { getSymbols, ISymbol } from "@/services/botApi";
import { Box } from "@mui/system"
import { useEffect, useState } from "react";
import Table from 'rc-table';

const columns = [
  {
    title: 'ID', dataIndex: 'id', key: 'id',
    align: 'center' as const,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    align: 'center' as const
  },
  {
    title: 'Symbol', dataIndex: 'symbol', key: 'symbol', width: 150,
    align: 'center' as const
  }
]

export const Symbol = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [symbols, setSymbols] = useState<ISymbol[]>([])

  const handleClose = () => {
    getSymbolsUtil()
    setAddOpen(false)
  }

  const getSymbolsUtil = async () => {
    const res = await getSymbols()
    if (res.code === SUCCESS) {
      setSymbols(res.data)
      console.log('%c=symobol res', 'color:red', res)
    }
  }

  useEffect(() => {
    getSymbolsUtil()
  }, [])

  return <Box sx={{
    mx: '20px',
    mt: '20px',
  }}>
    <Box>
      <Button padding="6px 20px" onClick={() => setAddOpen(true)}>
        Add
      </Button>
    </Box>

    <Box sx={{ mt: '20px', background: 'grey' }}>
      <Table rowKey="id" columns={columns} data={symbols} />
    </Box>

    <Modal isOpen={addOpen} handleClose={() => handleClose()}>
      <ModalContent sx={{ width: 400 }}>
        <AddModalContent handleClose={handleClose} />
      </ModalContent>
    </Modal>
  </Box>
}