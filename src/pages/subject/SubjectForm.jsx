import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Box, TextField, Typography, Breadcrumbs, Link } from "@mui/material";
import { List } from "@mui/icons-material";
import IconLabelButton from "components/shared/commons/IconLabelButton";
import ErrorMessage from "components/shared/commons/ErrorMessage";
import * as Colors from "constants/colors";
import { create, update, getOne } from "services/content-services";
import { showAlert } from "redux/actions/alert";

const SubjectForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const contentId = history.location.state?.contentId;
  const levelId = history.location.state?.levelId;

  const loadSubject = async (id) => {
    const response = await getOne(id);
    if (response?.success) {
      setValue("chapter", response.data.data.chapter);
      setValue("title", response.data.data.title);
    }
  };

  const createNewRecord = async (formData) => {
    let response = await create(formData);
    if (response?.success) {
      dispatch(showAlert("success", "New record added successfully."));
      history.push("/content", { id: history.location.state.levelId });
    } else {
      if (response?.errors != null) {
        Object.keys(response.errors).forEach((key) => {
          setError(key, {
            type: "manual",
            message: response.errors[key][0],
          });
        });
      }
    }
  };

  const updateExistingRecord = async (formData) => {
    let response = await update(contentId, formData);
    if (response.success) {
      dispatch(showAlert("success", "Record updated successfully."));
      history.push("/content", { id: history.location.state.levelId });
    } else {
      if (response?.errors != null) {
        Object.keys(response.errors).forEach((key) => {
          setError(key, {
            type: "manual",
            message: response.errors[key][0],
          });
        });
      }
    }
  };

  const onSubmit = async (formData) => {
    formData.level = levelId;
    if (contentId == null) {
      createNewRecord(formData);
    } else {
      formData.id = contentId;
      updateExistingRecord(formData);
    }
  };

  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    control,
  } = useForm();

  useEffect(() => {
    if (contentId !== null && contentId !== undefined) {
      loadSubject(contentId);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box my={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            color="inherit"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              history.push("/subject");
            }}
          >
            Subject
          </Link>
          <Link
            color="inherit"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              history.push("/content", { id: levelId });
            }}
          >
            Level
          </Link>
          <Typography color="textPrimary">
            {contentId !== null && contentId !== undefined ? "Edit " : "Add "}{" "}
            Subject
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          p: 1,
          border: "1px solid",
          borderColor: Colors.secondary,
          borderRadius: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: "bold",
            color: Colors.textPrimary,
            mb: 2,
          }}
        >
          {contentId !== null && contentId !== undefined
            ? "Edit Existing"
            : "Add New"}{" "}
          Subject For{" "}
          {history.location.state?.levelId === 0
            ? "PAUD"
            : "Level " + history.location.state?.levelId}
        </Typography>

        <Box>
          <Box mb={3}>
            <Controller
              name={"chapter"}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Field is required!",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  label={"Chapter"}
                  variant="standard"
                  type="number"
                  onChange={onChange}
                  value={value}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
            {errors.chapter && (
              <ErrorMessage>{errors.chapter.message}</ErrorMessage>
            )}
          </Box>
          <Box mb={3}>
            <Controller
              name={"title"}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Field is required!",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  label={"Title"}
                  variant="standard"
                  onChange={onChange}
                  value={value}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />

            {errors.title && (
              <ErrorMessage>{errors.title.message}</ErrorMessage>
            )}
          </Box>

          <Box display="flex" alignItems="start" justifyContent="end">
            <Box>
              <IconLabelButton
                icon={<List />}
                text={contentId ? "Update" : "Add"}
                color="primary"
                action={handleSubmit(onSubmit)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SubjectForm;
