import { menbarTheme } from "@/components/basics/mainColor";
import { styled } from "@mui/system";


export const MenubarItem = styled('div')(`
  display: flex;
  height: 100%;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  font-weight: 400;
  box-sizing: border-box;
  border: none;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  padding: 0px 12px;
  border-radius: 0px;
  min-width: 40px;
  background-color: ${menbarTheme.blackBg};
  color: ${menbarTheme.blackColor};
  height: 100%;
  user-select: none;
  :hover {
    background-color: ${menbarTheme.blackHover};
    color: ;
  }
  :active {
    background-color: ${menbarTheme.blackHover};
    color: ${menbarTheme.blackColor};
  }
  `
)