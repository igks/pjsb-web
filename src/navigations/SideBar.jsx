import React, { useState } from "react";
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
import { Dashboard } from "@mui/icons-material";

const SideBar = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuClick = (event, value) => {
    setSelectedMenu(value);
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
              onClick={(event) => handleMenuClick(event, 0)}
            >
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </List>
        </Box>
      </Box>
    </>
  );
};

export default SideBar;
