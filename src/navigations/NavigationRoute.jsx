//===================================================
// Date         : 04 Nov 2021
// Author       : I Gusti Kade Sugiantara
// Description  : Navigation router
//===================================================
// Revision History:
// Name             Date            Description
//
//===================================================
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import routes from "navigations/routes";

const NavigationRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Switch>
      {routes.map((route, index) => {
        return route.private ? (
          <PrivateRoute
            key={index}
            path={route.path}
            component={route.component}
            auth={isAuthenticated}
          />
        ) : (
          <Route key={index} path={route.path} component={route.component} />
        );
      })}
      <Redirect from="/" to="/dashboard" />
    </Switch>
  );
};

export default NavigationRoute;
