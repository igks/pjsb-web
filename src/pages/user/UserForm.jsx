//===================================================
// Date         : 22 Apr 2022
// Author       : I Gusti Kade Sugiantara
// Description  : User form component
//===================================================
// Revision History:
// Name             Date            Description
//
//===================================================
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  Box,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import { List } from "@mui/icons-material";
import IconLabelButton from "components/shared/commons/IconLabelButton";
import ErrorMessage from "components/shared/commons/ErrorMessage";
import * as Colors from "constants/colors";
import { create, update, getOne } from "services/user-services";
import { showAlert } from "redux/actions/alert";

const MasterForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);

  const loadUser = async (id) => {
    const response = await getOne(id);
    if (response?.success) {
      console.log(response);
      setValue("name", response.data.name);
      setValue("email", response.data.email);
      setValue("is_active", response.data.is_active);
      setValue("role", response.data.role);
    }
  };

  const createNewRecord = async (formData) => {
    let response = await create(formData);
    if (response?.success) {
      dispatch(showAlert("success", "New record added successfully."));
      history.push("/user");
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
    let response = await update(currentId, formData);
    if (response.success) {
      dispatch(showAlert("success", "Record updated successfully."));
      history.push("/user");
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
    if (currentId == null) {
      createNewRecord(formData);
    } else {
      formData.id = currentId;
      updateExistingRecord(formData);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    setValue,
  } = useForm();

  useEffect(() => {
    let id = history.location.state?.id;
    if (id !== null && id !== undefined) {
      setCurrentId(id);
      loadUser(id);
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
          Add New User
        </Typography>

        <Box>
          <Box mb={3}>
            <TextField
              fullWidth
              label={"Name"}
              variant="standard"
              {...register("name", {
                required: {
                  value: true,
                  message: "Field is required!",
                },
              })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {errors.name && <ErrorMessage message={errors.name.message} />}
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              label={"Email"}
              variant="standard"
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Field is required!",
                },
              })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              label={"Password"}
              variant="standard"
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Field is required!",
                },
              })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
          </Box>

          <Box mb={3}>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  color="success"
                  {...register("is_active", {})}
                />
              }
              label="Is Active"
            />
          </Box>

          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Role
              </InputLabel>
              <NativeSelect
                defaultValue={0}
                inputProps={{
                  name: "role",
                  id: "uncontrolled-native",
                }}
                {...register("role", {})}
              >
                <option value={0}>Admin</option>
                <option value={1}>Teacher</option>
                <option value={2}>Student</option>
              </NativeSelect>
            </FormControl>
          </Box>

          <Box display="flex" alignItems="start" justifyContent="end">
            <Box>
              <IconLabelButton
                icon={<List />}
                text={currentId ? "Update" : "Add"}
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

export default MasterForm;
