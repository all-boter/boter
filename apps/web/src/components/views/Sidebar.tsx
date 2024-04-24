import { NavLink } from "react-router-dom";
import { Box } from "@mui/system"

export const Sidebar = () => {
  return <Box>
    <NavLink
      to="/dashbord/bots"
      className={({ isActive, isPending }) =>
        isPending ? "pendingNavLink" : isActive ? "activeNavLink" : ""
      }
    >
      Bots
    </NavLink>;

    <NavLink
      to="/dashbord/strategies"
      className={({ isActive, isPending }) =>
        isPending ? "pendingNavLink" : isActive ? "activeNavLink" : ""
      }
    >
      My strategies
    </NavLink>;
  </Box>
}
