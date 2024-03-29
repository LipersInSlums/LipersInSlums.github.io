import type { FC } from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";

export const Copyright: FC = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <MuiLink color="inherit" href="/">
        LipersInSlums
      </MuiLink>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
};
