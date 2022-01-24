import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Divider,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Logo from "assets/images/logo.png";
import { Dashboard, Person } from "@mui/icons-material";

const SideBar = () => {
  const history = useHistory();
  const [selectedMenu, setSelectedMenu] = useState(0);

  // const authorizedRole = {
  //   dashboard: [0, 1],
  //   user: [1, 2],
  // };

  const handleMenuClick = (event, value, target) => {
    setSelectedMenu(value);
    history.push(`/${target}`);
  };

  return (
    <>
      <Box sx={{ minHeight: "100%" }} p={1}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          sx={{ height: 60 }}
        >
          <img src={Logo} alt="" width={50} />
          <Typography variant="h5">E-Pasraman</Typography>
        </Box>
        <Divider />

        <Box>
          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton
              selected={selectedMenu === 0}
              onClick={(event) => handleMenuClick(event, 0, "dashboard")}
            >
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </List>

          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton
              selected={selectedMenu === 1}
              onClick={(event) => handleMenuClick(event, 1, "user")}
            >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="User" />
            </ListItemButton>
          </List>
        </Box>
      </Box>
    </>
  );
};

export default SideBar;
