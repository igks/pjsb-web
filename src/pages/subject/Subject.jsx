//===================================================
// Date         : 04 Nov 2021
// Author       : I Gusti Kade Sugiantara
// Description  : Main page to show main activity
//===================================================
// Revision History:
// Name             Date            Description
//
//===================================================
import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, Grid, Paper, Box, Breadcrumbs } from "@mui/material";

const Subject = () => {
  const history = useHistory();

  const classList = Array.from(Array(13).keys()).map((i) => (
    <Grid key={`subject-${i}`} item xs={3}>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 100,
          ":hover": { boxShadow: 20 },
          cursor: "pointer",
        }}
        onClick={() => goToClassContent(i)}
      >
        <Typography variant="h3">{i === 0 ? "PAUD" : i}</Typography>
      </Paper>
    </Grid>
  ));

  const goToClassContent = (id) => {
    history.push("/content", { id });
  };

  return (
    <>
      <Box my={2}>
        <Breadcrumbs>
          <Typography color="textPrimary">Subject</Typography>
        </Breadcrumbs>
      </Box>
      <Typography mb={3} variant="h4">
        Select Class
      </Typography>
      <Grid container spacing={3}>
        {classList}
      </Grid>
    </>
  );
};

export default Subject;
