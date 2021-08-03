import React from "react";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

export default function TopAppBar({
  handleDrawerOpen,
  handleDrawerClose,
  isSideBarOpen,
}) {
  const classes = useStyles();
  return (
    <AppBar
      position="static"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isSideBarOpen,
      })}
    >
      <Toolbar>
        {isSideBarOpen || (
          <>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h5" className={classes.title}>
              LogMan
            </Typography>
          </>
        )}

        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
}
