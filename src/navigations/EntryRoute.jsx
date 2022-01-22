//===================================================
// Date         : 04 Nov 2021
// Author       : I Gusti Kade Sugiantara
// Description  : Entry point router
//===================================================
// Revision History:
// Name             Date            Description
//
//===================================================import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationRoute from "../navigations/NavigationRoute";
import Login from "../pages/authentication/Login";
import MasterForm from "../pages/master/MasterForm";
import MasterList from "../pages/master/MasterList";

const EntryRoute = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/master" component={MasterList} />
          <Route exact path="/master-form" component={MasterForm} />
          <Route component={NavigationRoute} />
        </Switch>
      </Router>
    </>
  );
};

export default EntryRoute;
