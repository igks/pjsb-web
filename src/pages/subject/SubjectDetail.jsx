import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Typography, Paper, Alert, Box, Button, Grid } from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";
import { getByContent, remove } from "services/content-detail-services";
import Spinner from "components/shared/commons/Spinner";
import Spacer from "components/shared/commons/Spacer";
import { showAlert } from "redux/actions/alert";
import ConfirmationDialog from "components/shared/pop-up-dialog/ConfirmationDialog";

const SubjectDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const levelId = history.location.state.levelId;
  const contentId = history.location.state.contentId;

  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const loadContentDetail = async () => {
    const res = await getByContent(contentId);
    if (res?.success) {
      setDetails(res.data.data.data);
    }
    setIsLoading(false);
  };

  const onEdit = (id) => {
    // history.push("/subject-form", { levelId: classId, contentId: id });
  };

  const onDelete = (id) => {
    setDeleteId(id);
    setIsOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (deleteId == null) return;

    const response = await remove(deleteId);
    if (response?.success) {
      setDeleteId(null);
      setIsOpenDialog(false);
      dispatch(showAlert("success", "Record delete successfully!"));
      loadContentDetail();
    }
  };

  useEffect(() => {
    loadContentDetail();
    // eslint-disable-next-line
  }, []);

  const contentCard = (content) => {
    return (
      <Paper
        key={`subject-${content.id}`}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 1,
          marginBottom: 2,
          ":hover": { boxShadow: 5 },
          cursor: "pointer",
        }}
      >
        <Typography variant="h6">{content.title}</Typography>
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
    );
  };

  const goToSubjectForm = (idClass) => {
    history.push("/subject-form", { levelId: idClass });
  };

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography mb={3} variant="h4">
          {levelId === 0 ? "PAUD" : "Level " + levelId}{" "}
          {details.length > 0 ? `- ${details[0].content.title}` : ""}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              goToSubjectForm(levelId);
            }}
          >
            Add Detail
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
      ) : details.length > 0 ? (
        <Grid container spacing={3}>
          {details.map((content, i) => (
            <Grid key={`subject-${i}`} item xs={3}>
              {contentCard(content)}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert severity="info">No Details Found!</Alert>
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

export default SubjectDetail;
