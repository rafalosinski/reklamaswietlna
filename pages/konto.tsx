import { Grid, makeStyles } from '@material-ui/core';

import Layout from '../src/Layout';
import UserInfo from '../src/account/UserInfo';
import OrderList from '../src/account/OrderList';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '80vh',
    maxWidth: '1200px',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '300px',
    },
  },
}));

const Konto = () => {
  const classes = useStyles();

  return (
    <Layout titlePart="Twoje konto">
      <Grid container item sm={12} className={classes.root}>
        <Grid container item sm={4}>
          <UserInfo />
        </Grid>
        <Grid container item sm={8}>
          <OrderList />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Konto;
