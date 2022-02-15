import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import Filter3Icon from "@mui/icons-material/Filter3";

const DrawerExample = ({
  open,
  onClose,
}: {
  readonly open: boolean;
  readonly onClose: () => void;
}) => {
  const drawerRef = React.useRef<HTMLDivElement | null>(null);

  const getParent = () => drawerRef.current?.parentElement;

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ref={drawerRef}
      ModalProps={{
        container: getParent(),
        disablePortal: true,
      }}
      style={{ position: "absolute" }}
    >
      <Toolbar />
      <List>{listItems}</List>
    </Drawer>
  );
};

export default DrawerExample;

export const listItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <Filter1Icon />
      </ListItemIcon>
      <ListItemText primary="Item 1" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Filter2Icon />
      </ListItemIcon>
      <ListItemText primary="Item 2" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Filter3Icon />
      </ListItemIcon>
      <ListItemText primary="Item 3" />
    </ListItem>
  </div>
);
