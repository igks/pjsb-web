import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Alert,
  Box,
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { DeleteForever, Edit, Preview } from "@mui/icons-material";
import { getByContent, remove } from "services/content-detail-services";
import { getOne } from "services/content-services";
import Spinner from "components/shared/commons/Spinner";
import Spacer from "components/shared/commons/Spacer";
import { showAlert } from "redux/actions/alert";
import ConfirmationDialog from "components/shared/pop-up-dialog/ConfirmationDialog";

const SubjectDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const levelId = history.location.state.levelId;
  const contentId = history.location.state.contentId;

  const [content, setContent] = useState(null);
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const loadContentDetail = async () => {
    const resDetail = await getByContent(contentId);
    if (resDetail?.success) {
      setDetails(resDetail.data.data.data);
    }
    const resContent = await getOne(contentId);
    if (resContent?.success) {
      setContent(resContent.data.data);
    }
    setIsLoading(false);
  };

  const onEdit = (detail) => {
    history.push("/subject-detail-form", {
      levelId: levelId,
      detail,
      content: details[0].content,
    });
  };

  const onView = (content) => {};

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
      <Card>
        <CardMedia
          component="img"
          height="250"
          image={`${process.env.REACT_APP_ASSETS_DOMAIN}storage/thumbnail/${content.thumbnail}`}
          alt="Thumbnail"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {content.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Box display="flex" flexDirection="row">
            <Preview color="success" onClick={() => onView(content)} />
            <Spacer width={15} height={0} />
            <Edit color="info" onClick={() => onEdit(content)} />
            <Spacer width={15} height={0} />
            <DeleteForever
              color="error"
              onClick={() => {
                onDelete(content.id);
              }}
            />
          </Box>
        </CardActions>
      </Card>
    );
  };

  const goToSubjectForm = (content) => {
    history.push("/subject-detail-form", {
      levelId: levelId,
      content,
    });
  };

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography mb={3} variant="h4">
          {levelId === 0 ? "PAUD" : "Level " + levelId}{" "}
          {content && content.title}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              goToSubjectForm(content);
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
            <Grid key={`subject-${i}`} item xs={4}>
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
