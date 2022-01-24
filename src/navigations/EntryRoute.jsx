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
import DefaultLayout from "layouts/DefaultLayout";
import Login from "pages/authentication/Login";

const EntryRoute = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/" component={DefaultLayout} />
      </Switch>
    </Router>
  );
};

export default EntryRoute;
