import React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function AppBarExample({
  onDrawerButtonClick,
}: {
  readonly onDrawerButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div>
      <Tooltip title={`<AppBar color="primary">`} placement="left" arrow>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={onDrawerButtonClick}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6">LipersInSlums Wiki</Typography>
          </Toolbar>
        </AppBar>
      </Tooltip>
    </div>
  );
}
