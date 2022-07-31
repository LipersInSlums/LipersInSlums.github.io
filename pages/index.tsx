import { Fragment, useState } from "react";
import type { FC, ReactNode, SetStateAction, SyntheticEvent } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Copyright } from "@/components/templates/materials";
import { Tabs, Tab } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";

type TabPanelProps = {
  readonly children: ReactNode;
  readonly value: number;
  readonly index: number;
};

const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

type A11yProps = (index: number) => {
  readonly id: string;
  readonly "aria-controls": string;
};

const a11yProps: A11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const Index: NextPage = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    newValue: SetStateAction<number>
  ) => {
    setValue(newValue);
  };
  const title = "Home - LipersInSlums Wiki";

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            LipersInSlums Wiki
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <Copyright />
        </Box>
      </Container>
    </Fragment>
  );
};

export default Index;
