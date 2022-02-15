import React from "react";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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
            <div>
              <div>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div />
          </Toolbar>
        </AppBar>
      </Tooltip>
    </div>
  );
}
