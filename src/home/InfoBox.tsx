import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  background: {
    minHeight: '300px',
    backgroundColor: '#f6f6f6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '0px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px',
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    '& img': {
      width: '50px',
    },
    '& > div': {
      padding: '20px',
    },
    '& p': {
      color: '#525252',
      fontSize: '0.9rem',
    },
    '& h3': {
      fontSize: '1.1rem',
    },
  },
}));

const InfoBox = () => {
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
        <Grid item xs={12} md={4}>
          <img src="/img/ico_custom.png" alt="Nie znalazłeś produktu? Skontaktuj się z nami!" />
          <Typography variant="h6" component="h3">
            Nie znalazłeś produktu?
          </Typography>
          <Typography variant="body2">
            Jeśli potrzebujesz innej reklamy świetlnej niż te wyszczególnione w konfiguratorze,
            nietypowego kształtu lub dodatkowych opcji, napisz do nas lub zadzwoń!
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <img src="/img/ico_montaz.png" alt="Montaż" />
          <Typography variant="h6" component="h3">
            Montaż
          </Typography>
          <Typography variant="body2">
            Oferujemy montaż na terenie Warszawy i okolic, a także w całej Polsce. Każde zlecenie
            jest wyceniane indywidualnie na podstawie zdjęć miejsca montażu oraz lokalizacji. W
            razie pytań skontaktuj się z nami!
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <img src="/img/ico_termin.png" alt="Termin realizacji" />
          <Typography variant="h6" component="h3">
            Termin realizacji
          </Typography>
          <Typography variant="body2">
            Standardowy termin realizacji na zamówienia złożone za pośrednictwem konfiguratora
            wynosi 5-10 dni roboczych. Dostępny jest również tryb ekspresowy realizacji.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InfoBox;
