import Link from 'next/link';
import { Grid, Button, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  background: {
    minHeight: '300px',
    backgroundColor: '#f6f6f6',
    backgroundImage: 'url(/back1.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '0px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px 10px',
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'center',
  },
  header: {
    flexBasis: '100%',
    fontWeight: 'bolder',
    lineHeight: '1',
    marginBottom: '10px',
    fontSize: '2rem',
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.3rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem',
      textAlign: 'center',
    },
  },
  subheader: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'lighter',
    lineHeight: '1.2',
    marginBottom: '10px',
    color: '#000',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      textAlign: 'left',
      color: '#383838',
    },
  },
  help: {
    borderTop: '1px solid #ccc',
    width: '100%',
    fontSize: '1rem',
    marginTop: '25px',
    paddingTop: '10px',
    color: '#000',
    fontWeight: 'lighter',
    lineHeight: '1.2',
    textAlign: 'center',

    [theme.breakpoints.up('md')]: {
      width: '50%',
      textAlign: 'left',
      color: '#474747',
      fontSize: '0.9rem',
    },
  },
  buttonWrapper: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
}));

const Baner = () => {
  const classes = useStyles();

  return (
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
        <Typography variant="h4" component="h3" className={classes.header}>
          Wyceń i zamów kaseton <br />
          korzystając z naszego konfiguratora!
        </Typography>
        <Typography className={classes.subheader}>
          W kilku prostych krokach wybierzesz rozmiar, kolory i dodatkowe opcje swojej reklamy
          świetlnej z aktualną ceną końcową.
        </Typography>
        <Box className={classes.buttonWrapper}>
          <Link href="/konfigurator">
            <span>
              <Button color="primary" variant="contained">
                Konfigurator
              </Button>
            </span>
          </Link>
        </Box>

        <Typography className={classes.help}>
          Jeżeli masz pytania albo potrzebujesz pomocy z konfiguratorem, prosimy o kontakt
          telefoniczny lub mailowy - chętnie poprowadzimy przez proces zamówienia oraz doradzimy
          najkorzystniejsze rozwiązanie.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Baner;
