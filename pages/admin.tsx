import { Box, Grid, makeStyles, Tab, Tabs, Typography } from '@material-ui/core';

import Layout from '../src/Layout';
import AdminInfo from '../src/account/AdminInfo';
import AdminOrderList from '../src/account/AdminOrderList';
import AdminUserList from '../src/account/AdminUserList';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '80vh',
    maxWidth: '1200px',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '300px',
    },
  },
}));

const TabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Grid container item sm={12}>
          <Box>{children}</Box>
        </Grid>
      )}
    </div>
  );
};

const Konto = () => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  return (
    <Layout titlePart="Admin">
      <Grid container item sm={12} className={classes.root}>
        <Grid container item sm={4}>
          <AdminInfo />
        </Grid>
        <Grid container item sm={8}>
          <Grid container item sm={12}>
            <Box>
              <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
                <Tab label="Zamówienia" />
                <Tab label="Użytkownicy" />
              </Tabs>
            </Box>
          </Grid>
          <TabPanel value={value} index={0}>
            <AdminOrderList />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AdminUserList />
          </TabPanel>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Konto;
