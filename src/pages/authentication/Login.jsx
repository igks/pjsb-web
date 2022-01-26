//===================================================
// Date         : 04 Nov Sep 2021
// Author       : I Gusti Kade Sugiantara
// Description  : Login form user interface
//===================================================
// Revision History:
// Name             Date            Description
//
//===================================================
import React from "react";
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { login } from "services/auth-services";
import { showAlert } from "redux/actions/alert";
import { loginSuccess } from "redux/actions/auth";
import Spacer from "components/shared/commons/Spacer";
import Logo from "assets/images/logo.png";
import * as Color from "constants/colors";
import ErrorMessage from "components/shared/commons/ErrorMessage";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (credential) => {
    const result = await login(credential);
    if (result.success) {
      let payload = {
        user: result.data.data,
        token: result.data.token,
      };

      localStorage.setItem("token_secret", result.data.token);
      dispatch(loginSuccess(payload));
      dispatch(showAlert("success", "Login berhasil!"));
      history.push("/");
    } else {
      dispatch(
        showAlert("error", "Email atau password yang dimasukkan salah!")
      );
    }
  };

  return (
    <Container sx={{ height: "100%" }}>
      {/* <Box sx={{ p: 1, backgroundColor: Color.primary }}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Spacer width={20} />
          <Typography
            variant="h2"
            sx={{ color: "white", fontSize: 30, fontWeight: "bold" }}
          >
            E-Pasraman
          </Typography>
        </Box>
      </Box> */}

      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Paper elevation={5} sx={{ width: "30%", px: 3, py: 5 }}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItem="center"
            mb={5}
          >
            <img src={Logo} alt="" width={120} />
          </Box>
          <Box width="100%" display="flex" flexDirection="column">
            <Controller
              name={"email"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  defaultValue={value}
                  label={"Email"}
                  variant="standard"
                  // inputProps={{ style: { textTransform: "uppercase" } }}
                />
              )}
              rules={{ required: "Email harus diisi!" }}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
            <Box sx={{ marginBottom: 2 }} />
            <Controller
              name={"password"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  defaultValue={value}
                  label={"Password"}
                  variant="standard"
                  type="password"
                />
              )}
              rules={{ required: "Password harus diisi!" }}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}

            <Button
              sx={{
                marginTop: 3,
                bgcolor: Color.primary,
                ":hover": {
                  bgcolor: Color.light,
                  color: Color.primary,
                },
              }}
              onClick={handleSubmit(onSubmit)}
              variant="contained"
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
