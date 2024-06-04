import Image from 'next/image';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { SRLWrapper } from 'simple-react-lightbox';

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

const images = [
  { label: 'Kasetony z dibondu', type: 'dibond', amount: 23 },
  { label: 'Kasetony na ramie aluminiowej z frontem z pleksy', type: 'alu_pleksa', amount: 12 },
  { label: 'Kasetony na ramie aluminiowej z napinanym frontem', type: 'alu_napinany', amount: 3 },
  { label: 'Kasetony z taśmy aluminiowej - nietypowy kształt', type: 'alu_ksztalt', amount: 15 },
  {
    label: 'Litery przestrzenne ze styroduru / pleksy - niepodświetlane',
    type: 'przestrzenne',
    amount: 4,
  },
  { label: 'Inne', type: 'inne', amount: 4 },
];

const generatePaths = (type, amount) => {
  const paths = [];
  for (let i = 1; i < amount + 1; i++) {
    paths.push(`/img/gallery/${type}/${type}_${i}.jpg`);
  }
  return paths;
};

const Konto = () => {
  const classes = useStyles();

  return (
    <Layout titlePart="Realizacje kasetonów i innych reklam świetlnych">
      <Grid container item sm={12} className={classes.root} alignContent="flex-start">
        <Grid item sm={12}>
          <Typography className={classes.header} variant="h4" component="h1">
            Realizacje
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <SRLWrapper options={options}>
            {images.map(({ label, type, amount }) => (
              <Box className={classes.section} key={label}>
                <Typography className={classes.subheader} variant="h5" component="h2">
                  {label}
                </Typography>
                <Grid container spacing={1}>
                  {generatePaths(type, amount).map((path) => (
                    <Grid item xs={6} md={2} className={classes.imgItem} key={path}>
                      <Image src={path} alt={label} width={220} height={100} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
          </SRLWrapper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Konto;
