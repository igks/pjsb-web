//===================================================
// Date         : 23 Jan 2022
// Author       : I Gusti Kade Sugiantara
// Description  : Layout display
//===================================================
// Revision History:
// Name             Date            Description
//
//===================================================
import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import SideBar from "navigations/SideBar";
import NavBar from "navigations/NavBar";

const DefaultLayout = () => {
  const history = useHistory();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    history.push("/login");
  }

  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item xs={3}>
        <SideBar />
      </Grid>
      <Grid item xs={9}>
        <Box>
          <NavBar />
        </Box>
      </Grid>
    </Grid>
  );
};

export default DefaultLayout;
