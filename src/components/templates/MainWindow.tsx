import React, { useEffect } from "react";
import { AppBar, Box, Tabs, Tab, Tooltip } from "@mui/material";
import AppBarExample from "../../components/templates/materials/AppBar";
import DrawerExample from "../../components/templates/materials/Drawer";
import Breadcrumbs from "../../components/templates/materials/Breadcrumbs";
import Copyright from "./materials/Copyright";
import Link from "next/link";
import { useRouter } from "next/router";

interface TabPanelProps {
  readonly children?: React.ReactNode;
  readonly index: number;
  readonly value: number;
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const previewNavTabsId = "preview-nav-tabs";
const tabs = [
  { label: "HOME", href: "/" },
  { label: "DOCS", href: "/docs" },
  { label: "BLOG", href: "/blog" },
];

const MainWindow = (props: { readonly children?: React.ReactNode }) => {
  const { children } = props;
  const router = useRouter();
  const [tabIndex, setTabIndex] = React.useState(0);

  // FIXME: 汚い
  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      if (linkPath.includes("blog") || linkPath.includes("posts"))
        setTabIndex(2);
      else if (linkPath.includes("docs")) setTabIndex(1);
      else setTabIndex(0);
    }
  }, [router]);

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
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="scrollable"
              scrollButtons={true}
              aria-label="preview-window-tabs"
            >
              {tabs.map((tab, index) => (
                <Link href={tab.href} key={tab.label} passHref>
                  <Tab label={tab.label} {...a11yProps(index)} />
                </Link>
              ))}
            </Tabs>
          </Box>
        </AppBar>
      </Tooltip>

      <div>
        <DrawerExample open={drawerOpen} onClose={handleCloseDrawer} />
        <Breadcrumbs />
        {tabs.map((tab, index) => (
          <TabPanel key={tab.label} value={tabIndex} index={index}>
            {children}
          </TabPanel>
        ))}
      </div>
      <Copyright />
    </>
  );
};

export default MainWindow;
