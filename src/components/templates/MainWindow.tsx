import React from "react";
import { AppBar, Box, Tabs, Tab, Tooltip } from "@mui/material";
import AppBarExample from "../../components/templates/materials/AppBar";
import DrawerExample from "../../components/templates/materials/Drawer";
import Copyright from "./materials/Copyright";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const previewNavTabsId = "preview-nav-tabs";

const MainWindow = () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleChange = (_: React.SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  return (
    <>
      <AppBarExample onDrawerButtonClick={handleOpenDrawer} />
      <Tooltip title={`<AppBar color="primary">`} placement="left" arrow>
        <AppBar position="static" id={previewNavTabsId}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="scrollable"
              scrollButtons={true}
              aria-label="preview-window-tabs"
            >
              <Tab label="HOME" {...a11yProps(0)} />
              <Tab label="DOCS" {...a11yProps(1)} />
              <Tab label="Blog" {...a11yProps(2)} />
            </Tabs>
          </Box>
        </AppBar>
      </Tooltip>

      <div>
        <DrawerExample open={drawerOpen} onClose={handleCloseDrawer} />
        <TabPanel value={tabIndex} index={0}>
          <div>HomeInSlums</div>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <div>DocsInSlums</div>
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <div>BlogInSlums</div>
        </TabPanel>
      </div>
      <Copyright />
    </>
  );
};

export default MainWindow;
