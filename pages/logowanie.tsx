import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Grid, makeStyles } from '@material-ui/core';

import Layout from '../src/Layout';
import Login from '../src/configurator/components/Login';
import { setJwt } from '../store/slices/userSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '80vh',
    maxWidth: '1200px',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '300px',
    },
  },
}));

const Logowanie = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt !== null) {
      jwt !== null ? dispatch(setJwt(jwt)) : '';
    }
  }, []);

  const redirect = () => {
    router.push('/konto');
  };

  return (
    <Layout titlePart="Logowanie / Rejestracja" noindexFollow>
      <Grid container item sm={12} className={classes.root} alignContent="flex-start">
        <>{!user.isLoggedIn ? <Login /> : redirect()} </>
      </Grid>
    </Layout>
  );
};

export default Logowanie;
