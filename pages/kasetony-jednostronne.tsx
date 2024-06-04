import Image from 'next/image';
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { SRLWrapper } from 'simple-react-lightbox';
import Link from 'next/link';

import Layout from '../src/Layout';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '80vh',
    maxWidth: '1200px',
    '& img': {
      borderRadius: '5px',
      cursor: 'pointer',
    },
  },
  header: { marginBottom: '10px' },
  imgItem: {},
  imgButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subheader: {
    fontWeight: 'bolder',
    marginBottom: '20px',
  },
  section: {
    backgroundColor: '#f1f1f1',
    padding: '20px 20px',
    marginTop: '10px',
    marginBottom: '30px',
    borderLeft: '3px solid #FBA82C',
    boxShadow: '2px 2px 4px #dbdbdb',
  },
  description: {
    textAlign: 'justify',
    margin: '15px 0px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '40px',
    '& h5': {
      marginBottom: '20px',
    },
  },
}));

const options = {
  settings: {
    overlayColor: 'rgb(245,245,245)',
    autoplaySpeed: 3500,
    transitionSpeed: 900,
  },
  buttons: {
    backgroundColor: '#FBA82C',
    iconColor: 'rgba(0,0,0, 0.8)',
  },
  caption: {
    captionColor: '#000000',
  },
};

const KasetonyJednostronne = () => {
  const classes = useStyles();

  return (
    <Layout titlePart="Kasetony jednostronne Warszawa producent">
      <Grid container item sm={12} className={classes.root} alignContent="flex-start">
        <Grid item sm={12}>
          <Typography className={classes.header} variant="h4" component="h1">
            Kasetony jednostronne
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography className={classes.description} variant="body1">
            Klasyczne kasetony jednostronne dostosowane są do montażu tylną powierzchnią do ściany.
            Dzięki temu w prosty sposób wskażesz swoim klientom miejsce Twojej firmy, aby łatwo i
            szybko mogli ją odnaleźć pośród wielu innych.
          </Typography>
          <Typography className={classes.description} variant="body1">
            Wśród propozycji znajdziesz rozwiązania dopasowane do swoich potrzeb: może to być
            nowoczesna reklama z dibondu montowanego bezpśrednio na ścianie, ramy aluminiowej z
            frontem napinanym lub z pleksy, a także każdy inny, nietypowy kształt. Skorzystaj z
            naszego konfiguratora i samodzielnie stwórz unikalny projekt swojego własnego
            podświetlanego panelu, który będzie wizytówką Twojej firmy!
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <SRLWrapper options={options}>
            <Box className={classes.section}>
              <Typography className={classes.subheader} variant="h5" component="h2">
                Przykładowe realizacje kasetonów jednostronnych
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6} md={3} className={classes.imgItem}>
                  <Image
                    src="/img/gallery/dibond/dibond_9.jpg"
                    alt="Kasetony jednostronne"
                    width={330}
                    height={140}
                  />
                </Grid>
                <Grid item xs={6} md={3} className={classes.imgItem}>
                  <Image
                    src="/img/gallery/dibond/dibond_1.jpg"
                    alt="Kasetony jednostronne"
                    width={330}
                    height={140}
                  />
                </Grid>
                <Grid item xs={6} md={3} className={classes.imgItem}>
                  <Image
                    src="/img/gallery/alu_pleksa/alu_pleksa_3.jpg"
                    alt="Kasetony jednostronne"
                    width={330}
                    height={140}
                  />
                </Grid>
                <Grid item xs={6} md={3} className={classes.imgButton}>
                  <Link href="/realizacje">
                    <Button color="secondary" variant="contained">
                      Wszystkie realizacje
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </SRLWrapper>
        </Grid>
        <Grid container item sm={12} justify="center" className={classes.wrapper}>
          <Grid item sm={12}>
            <Typography variant="h5" align="center">
              Wyceń i zamów kaseton korzystając z naszego konfiguratora!
            </Typography>
          </Grid>
          <Grid item sm={12} justify="center">
            <Link href="/konfigurator">
              <Button color="primary" variant="contained">
                Konfigurator
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default KasetonyJednostronne;
