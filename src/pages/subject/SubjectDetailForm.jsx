import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Box, TextField, Typography } from "@mui/material";
import { List, Folder } from "@mui/icons-material";
import IconLabelButton from "components/shared/commons/IconLabelButton";
import ErrorMessage from "components/shared/commons/ErrorMessage";
import * as Colors from "constants/colors";
import { create, update } from "services/content-detail-services";
import { showAlert } from "redux/actions/alert";

const SubjectDetailForm = () => {
  const history = useHistory();
  const fileInput = useRef();
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const content = history.location.state?.content;
  const detail = history.location.state?.detail ?? null;

  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    control,
  } = useForm();

  const createNewRecord = async (formData) => {
    let formsData = new FormData();
    formsData.append("section", formData.section);
    formsData.append("title", formData.title);
    formsData.append("video_url", formData.video_url);
    formsData.append("content_id", formData.content_id);
    formsData.append("thumbnail", file);
    let response = await create(formsData);
    if (response?.success) {
      dispatch(showAlert("success", "New record added successfully."));
      history.push("/content-details", {
        levelId: content.level,
        contentId: content.id,
      });
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
    let formsData = new FormData();
    formsData.append("section", formData.section);
    formsData.append("title", formData.title);
    formsData.append("video_url", formData.video_url);
    formsData.append("content_id", formData.content_id);
    formsData.append("thumbnail", file);
    formsData.append("_method", "put");
    let response = await update(detail.id, formsData);
    if (response.success) {
      dispatch(showAlert("success", "Record updated successfully."));
      history.push("/content-details", {
        levelId: content.level,
        contentId: content.id,
      });
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

  const onFileChange = (e) => {
    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 2) {
      dispatch(
        showAlert("error", "File size more than 2MB, please select other file.")
      );
      return;
    }
    setFile(e.target.files[0]);
    setValue("thumbnail", e.target.files[0].name);
  };

  const onSubmit = async (formData) => {
    if (detail == null) {
      formData.content_id = content.id;
      createNewRecord(formData);
    } else {
      formData.id = detail.id;
      formData.content_id = detail.content_id;
      updateExistingRecord(formData);
    }
  };

  useEffect(() => {
    if (detail != null) {
      setValue("section", detail.section);
      setValue("title", detail.title);
      setValue("thumbnail", detail.thumbnail);
      setValue("video_url", detail.video_url);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
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
          {detail != null ? "Edit Existing" : "Add New"} Content to Subject{" "}
          {content.title}
          {history.location.state.levelId === 0
            ? " PAUD"
            : " Level " + history.location.state.levelId}
        </Typography>

        <Box>
          <Box mb={3}>
            <Controller
              name={"section"}
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
                  label={"Section"}
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
            {errors.section && (
              <ErrorMessage>{errors.section.message}</ErrorMessage>
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

          <Box mb={3} display="flex" flexDirection="row">
            <Controller
              name={"thumbnail"}
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
                  label={"Thumbnail"}
                  variant="standard"
                  value={value}
                  onChange={onChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
            <Box>
              <IconLabelButton
                icon={<Folder />}
                text={"Browse"}
                color="info"
                action={() => fileInput?.current?.click()}
              />
            </Box>
            <input
              accept="image/png, image/jpeg, image/jpg"
              type="file"
              onChange={onFileChange}
              hidden
              ref={fileInput}
            />
          </Box>

          <Box mb={3}>
            <Controller
              name={"video_url"}
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
                  label={"Video URL"}
                  variant="standard"
                  onChange={onChange}
                  value={value}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />

            {errors.video_url && (
              <ErrorMessage>{errors.video_url.message}</ErrorMessage>
            )}
          </Box>

          <Box display="flex" alignItems="start" justifyContent="end">
            <Box>
              <IconLabelButton
                icon={<List />}
                text={detail != null ? "Update" : "Add"}
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

export default SubjectDetailForm;
