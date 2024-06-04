import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { CircularProgress, Grid, Typography, makeStyles, Button } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      marginTop: '20px',
    },
  },
}));

const Confirmation = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const app = useSelector((state) => state.app);

  const handleReset = () => {
    router.reload();
  };

  const classes = useStyles();
  return (
    <>
      <Grid container item className={classes.root}>
        {app.orderPlaced ? (
          <>
            <CheckCircleIcon fontSize="large" color="primary" />
            <Typography variant="h5">
              Zamówienie nr <strong>{app.orderId}</strong> zostało złożone!
            </Typography>
            <Typography>Przejdź do listy zamówień, aby je opłacić lub wgrać pliki.</Typography>
            <Link href="/konto">
              <span>
                <Button variant="contained" color="primary">
                  Lista zamówień
                </Button>
              </span>
            </Link>
            <Button onClick={handleReset} variant="contained">
              Konfiguruj następny kaseton
            </Button>
          </>
        ) : (
          <>
            <CircularProgress size={40} />
            <Typography variant="h5">Składanie zamówienia, proszę czekać.</Typography>
          </>
        )}
      </Grid>
    </>
  );
};

export default Confirmation;
