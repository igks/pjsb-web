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
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Typography, Paper, Alert, Box, Button } from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";
import { getByClass, remove } from "services/content-services";
import Spinner from "components/shared/commons/Spinner";
import Spacer from "components/shared/commons/Spacer";
import { showAlert } from "redux/actions/alert";
import ConfirmationDialog from "components/shared/pop-up-dialog/ConfirmationDialog";

const ClassContent = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [classId, setClassId] = useState(null);
  const [contents, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const loadContent = async () => {
    const id = history.location.state.id;
    const res = await getByClass(id);
    if (res?.success) {
      setContent(res.data.data.data);
    }
    setIsLoading(false);
  };

  const onEdit = (id) => {
    history.push("/subject-form", { levelId: classId, contentId: id });
  };

  const onDelete = (id) => {
    setDeleteId(id);
    setIsOpenDialog(true);
  };

  const goToDetail = (contentId) => {
    history.push("/content-details", { levelId: classId, contentId });
  };

  const confirmDelete = async () => {
    if (deleteId == null) return;

    const response = await remove(deleteId);
    if (response?.success) {
      setDeleteId(null);
      setIsOpenDialog(false);
      dispatch(showAlert("success", "Record delete successfully!"));
      loadContent();
    }
  };

  useEffect(() => {
    setClassId(history.location.state.id);
    loadContent();
    // eslint-disable-next-line
  }, []);

  const contentCard = (content) => {
    return (
      <Box
        key={`subject-${content.id}`}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 1,
          marginBottom: 2,
        }}
      >
        <Paper
          sx={{
            width: "90%",
            padding: 1,
            ":hover": { boxShadow: 5 },
            cursor: "pointer",
          }}
          onClick={() => goToDetail(content.id)}
        >
          <Typography variant="h6">{content.title}</Typography>
        </Paper>
        <Paper
          sx={{
            padding: 1,
            ":hover": { boxShadow: 5 },
            cursor: "pointer",
          }}
        >
          <Box display="flex" flexDirection="row">
            <Edit color="info" onClick={() => onEdit(content.id)} />
            <Spacer width={15} height={0} />
            <DeleteForever
              color="error"
              onClick={() => {
                onDelete(content.id);
              }}
            />
          </Box>
        </Paper>
      </Box>
    );
  };

  const goToSubjectForm = (idClass) => {
    history.push("/subject-form", { levelId: idClass });
  };

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography mb={3} variant="h4">
          {classId === 0 ? "PAUD" : "Level " + classId}
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

      {isLoading === true ? (
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

      <ConfirmationDialog
        isOpen={isOpenDialog}
        onCancel={() => {
          setDeleteId(null);
          setIsOpenDialog(false);
        }}
        onConfirm={confirmDelete}
        message="Do you want to delete this record?"
      />
    </>
  );
};

export default ClassContent;
