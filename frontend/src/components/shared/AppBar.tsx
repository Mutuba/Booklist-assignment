import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Avatar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { useCoverPhotoURL } from "../../../useCoverPhotoURL";

export default function ElloAppBar() {
  const avatarSrc = useCoverPhotoURL("ElloLogo.svg");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "white", boxShadow: 1 }}>
        <Toolbar variant="dense">
          <Avatar
            src={avatarSrc}
            alt="coverPhoto"
            sx={{ width: 56, height: 56, marginRight: 2 }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
