import React from "react";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "redux/actions/alert";
import { logout } from "services/auth-services";
import { logoutSuccess } from "redux/actions/auth";

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const onLogout = async () => {
    const result = await logout();
    if (result.success) {
      dispatch(logoutSuccess());
      dispatch(showAlert("success", "Logout berhasil"));
      history.push("/login");
    }
  };

  return (
    <>
      <Box sx={{ minWidth: "100%" }} p={1}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: 60 }}
          px={5}
        >
          <Typography>{authState?.user?.name ?? ""}</Typography>
          <IconButton onClick={onLogout}>
            <Logout color="warning" sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
        <Divider />
      </Box>
    </>
  );
};

export default NavBar;
