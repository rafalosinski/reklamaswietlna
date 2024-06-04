import { useRouter } from 'next/router';
import { Grid, Button, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';

const Footer = () => {
  const router = useRouter();

  const useStyles = makeStyles((theme) => ({
    background: {
      minHeight: '70px',
      backgroundColor: '#D9D9D9',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: '0px',
      padding: '20px 0px',
    },
    background2: {
      minHeight: '70px',
      backgroundColor: '#c7c7c7',
      display: 'flex',
      padding: '20px 0px',
      color: '#696969',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: '0px',
      '& a': {
        textDecoration: 'none',
        color: '#696969',
        fontSize: '0.8rem',
        display: 'inline',
      },
      [theme.breakpoints.down('sm')]: {
        paddingBottom: `${router.pathname === '/konfigurator' ? '160px' : '20px'}`,
      },
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      textAlign: 'center',
      '& button': {
        fontWeight: '300',
        fontSize: '0.8rem',
        margin: '5px',
      },
    },
    author: {
      marginRight: '10px',
    },
  }));

  const classes = useStyles();

  return (
    <>
      {' '}
      <Grid
        container
        item
        justify="center"
        md={12}
        style={{ maxWidth: '100%' }}
        spacing={1}
        className={classes.background}
      >
        <Grid className={classes.wrapper} md={10} container item style={{ maxWidth: '1200px' }}>
          <Link href="/regulamin">
            <span>
              <Button variant="outlined" size="small">
                Regulamin
              </Button>
            </span>
          </Link>
          <Link href="/polityka-prywatnosci">
            <span>
              <Button variant="outlined" size="small">
                Polityka prywatności
              </Button>
            </span>
          </Link>
          <Link href="/porownanie-kasetonow">
            <span>
              <Button variant="outlined" size="small">
                Porównanie kasetonów
              </Button>
            </span>
          </Link>
          <Link href="/faq">
            <span>
              <Button variant="outlined" size="small">
                Pytania i odpowiedzi
              </Button>
            </span>
          </Link>
          <Link href="/proces-zamowienia">
            <span>
              <Button variant="outlined" size="small">
                Proces zamawiania
              </Button>
            </span>
          </Link>
        </Grid>
      </Grid>
      <Grid
        container
        item
        justify="center"
        md={12}
        style={{ maxWidth: '100%' }}
        spacing={1}
        className={classes.background2}
      >
        <Grid className={classes.wrapper} md={10} container item style={{ maxWidth: '1200px' }}>
          Reklamaswietlna.com © 2020-{dayjs().format('YYYY')} <br />
          Hermes Chechłowski Bręk spółka cywilna, ul. Anecińska 14, 03-106 Warszawa, woj.
          mazowieckie, NIP: 5242896557
        </Grid>
        <Grid md={10} container item justify="center" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            style={{ marginLeft: '10px', marginBottom: '20px' }}
          >
            <a href="tel:+48509467369">tel. 509 467 369</a>
          </Button>
          <Button
            variant="outlined"
            size="small"
            style={{ marginLeft: '10px', marginBottom: '20px' }}
          >
            <a href="mailto:biuro@reklamaswietlna.com">biuro@reklamaswietlna.com</a>
          </Button>
        </Grid>
        <Grid md={10} container item justify="center" alignItems="center">
          <Typography className={classes.author}>Projekt i wykonanie: </Typography>
          <Button variant="outlined" size="small">
            <a href="https://reklamizer.pl">Reklamizer.pl</a>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
