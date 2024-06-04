import { Button, CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';

import Layout from '../src/Layout';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { axiosInstance } from '../src/configurator/utils/axiosInstance';
import { setStepError } from '../store/slices/appSlice';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '80vh',
    maxWidth: '1200px',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '300px',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      marginTop: '20px',
    },
  },
}));

const Płatność = () => {
  const classes = useStyles();
  const router = useRouter();

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let statusCheck;

    const fetchOrder = async () => {
      try {
        const { data } = await axiosInstance.get(`/orders/${router.query.payment}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
          },
        });
        if (data.paymentStatus === 'completed') {
          setPaymentSuccess(true);
          clearInterval(statusCheck);
        }
      } catch (error) {
        console.log(error);
        setError(true);
        setErrorMessage(error.message);
        clearInterval(statusCheck);
      }
    };
    if (router.query.payment) {
      statusCheck = setInterval(() => {
        fetchOrder();
      }, 2000);
    }
    return () => {
      clearInterval(statusCheck);
    };
  }, [router.query.payment]);

  return (
    <Layout titlePart="Status płatności">
      <Grid container item sm={12} className={classes.root}>
        {error && <Alert severity="error">{errorMessage}</Alert>}
        {paymentSuccess ? (
          <>
            <CheckCircleIcon fontSize="large" color="primary" />
            <Typography variant="h5">Płatność za zamówienie potwierdzona!</Typography>
            <Link href="/konto">
              <span>
                <Button variant="contained" color="primary">
                  Lista zamówień
                </Button>
              </span>
            </Link>
          </>
        ) : (
          <>
            {!error && (
              <>
                <CircularProgress size={30} />
                <Typography variant="h5"> Płatność oczekuje na potwierdzenie</Typography>
                <Typography variant="body1">Może to potrwać kilka minut.</Typography>
              </>
            )}
          </>
        )}
      </Grid>
    </Layout>
  );
};

export default Płatność;
