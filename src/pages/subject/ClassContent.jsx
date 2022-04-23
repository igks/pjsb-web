//===================================================
// Date         : 04 Nov 2021
// Author       : I Gusti Kade Sugiantara
// Description  : Main page to show main activity
//===================================================
// Revision History:
// Name             Date            Description
//
//===================================================
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Typography, Grid, Paper, Alert, Box, Button } from "@mui/material";
import { getByClass } from "services/content-services";
import Spinner from "components/shared/commons/Spinner";

const ClassContent = () => {
  const history = useHistory();
  const [classId, setClassId] = useState(null);
  const [contents, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadContent = async () => {
    const id = history.location.state.id;
    const res = await getByClass(id);
    if (res?.success) {
      setContent(res.data.data.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setClassId(history.location.state.id);
    loadContent();
    // eslint-disable-next-line
  }, []);

  const contentCard = (content) => {
    return (
      <Paper
        key={`subject-${content.id}`}
        sx={{
          padding: 1,
          marginBottom: 2,
          ":hover": { boxShadow: 5 },
          cursor: "pointer",
        }}
      >
        <Typography variant="h6">{content.title}</Typography>
      </Paper>
    );
  };

  const goToSubjectForm = (idClass) => {
    history.push("/subject-form", { idClass });
  };

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography mb={3} variant="h4">
          {classId == 0 ? "PAUD" : "Level " + classId}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              goToSubjectForm(classId);
            }}
          >
            Add Subject
          </Button>
        </Box>
      </Box>
      {isLoading == true ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ height: 300 }}
        >
          <Spinner />
        </Box>
      ) : contents.length > 0 ? (
        contents.map((content) => contentCard(content))
      ) : (
        <Alert severity="info">No Subject Found!</Alert>
      )}
    </>
  );
};

export default ClassContent;
