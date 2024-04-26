import { Box } from "@mui/system"
import { useParams } from "react-router-dom";

export const Detail = () => {
  const { slug } = useParams();

  console.log('%c=detail slug:', 'color:red', slug)

  return <Box>
    Detail
  </Box>
}