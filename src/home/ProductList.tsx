import { useDispatch } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Grid, Button, Typography, Paper, Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { productsData } from '../configurator/productsData';
import { setHomeProduct } from '../../store/slices/homeSlice';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30px',
  },
  headerLink: {
    textDecoration: 'none',
    color: 'black',
  },
  h1: {
    textAlign: 'center',
    fontSize: '2rem',
    marginTop: '30px',
    marginBottom: '20px',
  },
  description: {
    textAlign: 'justify',
    margin: '15px 20px',
  },
  info: {
    marginTop: '15px',
    marginBottom: '20px',
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
  },
  header: {
    textAlign: 'center',
    margin: '30px 0px',
    fontSize: '1.5rem',
    fontWeight: 'lighter',
    flexBasis: '100%',
  },
  paperWrapper: {
    flexBasis: '100%',
    display: 'flex',
    flexWrap: 'wrap',

    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-evenly',
    },
  },
  imgWrapper: {
    marginTop: '15px',
    marginBottom: '5px',
    borderRadius: '4px',
    width: '100%',
    '& img': {
      borderTop: '1px solid #f1f1f1 !important',
      borderBottom: '1px solid #f1f1f1 !important',
    },
  },
  paper: {
    textAlign: 'center',
    padding: '15px 0px',
    flexBasis: '48%',
    marginBottom: '40px',
    borderRadius: '5px',
    boxShadow: '0px 0px 5px #dbdbdb',
    border: '1px solid #dbdbdb',
    '& p': {
      color: '#454545',
      padding: '0px 20px',
      minHeight: '60px',
    },
    '& a': {
      textDecoration: 'none',
      borderBottom: '1px solid black',
      color: '#000',
    },

    [theme.breakpoints.down('sm')]: {
      flexBasis: '95%',
      marginBottom: '20px',
      boxShadow: 'none',
    },
    '& h2': {
      fontWeight: '700',
      lineHeight: '1.2',
      marginBottom: '15px',
      padding: '5px 30px',
    },
    '& button': {
      marginLeft: '10px',
      marginRight: '10px',
      marginTop: '10px',
    },
  },
}));

const Product = ({ name, label, description, doubleSide, visSrc }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Paper elevation={1} className={classes.paper}>
      <Typography variant="h6" component="h2">
        Kaseton {doubleSide ? ` ${'dwustronny '}` : ` ${'jednostronny '}`} <br />
        {label}
      </Typography>
      <Typography variant="body2" component="p">
        {description}
      </Typography>{' '}
      <Box className={classes.imgWrapper}>
        <Image width={825} height={250} src={visSrc} alt={label} />
      </Box>
      <Link href="/konfigurator">
        <span>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => dispatch(setHomeProduct(name))}
          >
            Konfiguruj
          </Button>
        </span>
      </Link>
      <Link href="/realizacje">
        <span>
          <Button size="small" variant="outlined" color="secondary">
            Realizacje
          </Button>
        </span>
      </Link>
    </Paper>
  );
};

const ProductList = () => {
  const classes = useStyles();

  return (
    <Grid container item justify="center">
      <Grid className={classes.wrapper} md={10} container item style={{ maxWidth: '1200px' }}>
        <Grid item md={12}>
          <Typography className={classes.h1} variant="h1">
            Producent reklamy świetlnej w Warszawie
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography className={classes.description} variant="body1">
            Tutaj samodzielnie stworzysz dla swojej firmy niepowtarzalną formę promocji, jaką jest
            reklama świetlna. Producent, którym mamy zaszczyt być zapewnia szeroki wybór kształtów,
            materiałów i wykończeń, które zachwycą nie tylko Ciebie, ale przede wszystkich Twoich
            klientów. Zapraszamy do zapoznania się z pełną ofertą i stworzenia własnoręcznie krok po
            kroku swojego spersonalizowanego panelu promocyjnego.
          </Typography>
          <Typography className={classes.description} variant="body1">
            Wśród możliwości do wyboru jest reklama świetlna jednostronna lub dwustronna. Każda z
            nich może być wykonana z dibondu, ramy aluminiowej z frontem z pleksy lub w formie
            nieregularnego kształtu (koła, krzyża, elipsy lub prostokąta z zaokrąglonymi bokami).
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography className={classes.description} variant="body1">
            Oferowana przez nas produkcja kasetonów reklamowych to także możliwość dopasowania
            rozmiarów, koloru obudowy oraz odcienia świecenia. Elementy graficzne, które chcesz na
            nim umieścić mogą także zostać wykonane w technologii 3D. Skorzystaj z naszego
            konfiguratora, zrób projekt, a my zajmiemy się resztą - produkcja i montaż gwarantowane
            nie tylko na terenie Warszawy, ale całej Polski!
          </Typography>
          <Typography className={classes.description} variant="body1">
            Służymy także profesjonalnymi usługami projektowania - możemy wykonać grafikę, która ma
            znaleźć się na zewnętrznym panelu promocyjnym. Sprawdź i przekonaj się jak działa nasz
            konfigurator, dzięki któremu w jednym miejscu stworzysz swój własny projekt kasetonu i
            to bez wychodzenia z domu!
          </Typography>
        </Grid>
        <Grid item md={12} className={classes.info}></Grid>
        <Typography className={classes.header} variant="h5">
          <Link href="/kasetony-jednostronne">
            <a className={classes.headerLink}>Kasetony jednostronne</a>
          </Link>
        </Typography>
        <Grid className={classes.paperWrapper}>
          {productsData
            .filter((el) => !el.doubleSide)
            .map(({ name, label, description, doubleSide, visSrc }) => (
              <Product
                key={label}
                label={label}
                description={description}
                doubleSide={doubleSide}
                visSrc={visSrc}
                name={name}
              />
            ))}
        </Grid>
        <Typography className={classes.header} variant="h5">
          <Link href="/kasetony-dwustronne">
            <a className={classes.headerLink}>Kasetony dwustronne</a>
          </Link>
        </Typography>
        <Grid className={classes.paperWrapper}>
          {productsData
            .filter((el) => el.doubleSide)
            .map(({ name, label, description, doubleSide, visSrc }) => (
              <Product
                key={label}
                label={label}
                description={description}
                doubleSide={doubleSide}
                visSrc={visSrc}
                name={name}
              />
            ))}
        </Grid>

        <Typography className={classes.header} variant="h5">
          <Link href="/litery-3d">
            <a className={classes.headerLink}>Litery 3D</a>
          </Link>
        </Typography>
        <Grid className={classes.paperWrapper}>
          <Paper elevation={1} className={classes.paper}>
            <Typography variant="h6" component="h2">
              Litery przestrzenne
            </Typography>
            <Typography variant="body2" component="p">
              Litery 3D wykonujemy z różnych materiałów (np. dibond, styrodur, aluminium) w wielu
              opcjach podświetlenia.
            </Typography>{' '}
            <Box className={classes.imgWrapper}>
              <Image
                width={825}
                height={250}
                src="/img/vis/litery3d.jpg"
                alt="Litery Przestrzenne 3D"
              />
            </Box>
            <Typography component="div">
              Obecnie pracujemy nad wprowadzeniem liter 3D do konfiguratora. Do tego czasu prosimy o
              bezpośredni{' '}
              <Link href="/kontakt">
                <a>kontakt</a>
              </Link>
              .
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductList;
