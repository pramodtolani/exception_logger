import { Container } from "@material-ui/core";
import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import AppBar from "../layout/AppBar";
import SideBar from "../layout/SideBar";
import ExceptionDetails from "./exceptions/ExceptionDetails";
import ExceptionsList from "./exceptions/ExceptionsList";

export default function Main() {
  const [sideBarOpen, setSideBarOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setSideBarOpen(true);
  };

  const handleDrawerClose = () => {
    setSideBarOpen(false);
  };
  return (
    <>
      <AppBar
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        isSideBarOpen={sideBarOpen}
      />
      <SideBar
        handleOpen={handleDrawerOpen}
        handleClose={handleDrawerClose}
        isOpen={sideBarOpen}
      />
      <Container maxWidth="lg" m={2}>
        <Switch>
          <Route path="/exceptions/details">
            <ExceptionDetails />
          </Route>
          <Route path="/exceptions">
            <ExceptionsList />
          </Route>
          <Route path="/">
            <ExceptionsList />
          </Route>
        </Switch>
      </Container>
    </>
  );
}
