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
import { Box, Grid } from "@mui/material";
import SideBar from "navigations/SideBar";
import NavBar from "navigations/NavBar";
import NavigationRoute from "navigations/NavigationRoute";

const DefaultLayout = () => {
  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item xs={3}>
        <SideBar />
      </Grid>
      <Grid item xs={9}>
        <Box>
          <NavBar />
          <NavigationRoute />
        </Box>
      </Grid>
    </Grid>
  );
};

export default DefaultLayout;
