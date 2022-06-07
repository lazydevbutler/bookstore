import React, { useEffect } from "react";
import AppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Box from "@mui/material/Box";
import { styled, createTheme } from "@mui/material/styles";

import { drawerWidth, PageInfomationContext } from "../..";

const cssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const ModifiedAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: "rgb(18, 18, 18)",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const TopBar: React.FC = () => {
  return (
    <ModifiedAppBar position="fixed" open={false}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </ModifiedAppBar>
  );
};

export default TopBar;
