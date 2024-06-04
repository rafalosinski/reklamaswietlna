import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { Container } from 'next/app';
import React from 'react';
import Layout from '../src/Layout';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    minHeight: '80vh',
    maxWidth: '1200px',
    textAlign: 'center',
  },
  subheader: {
    marginTop: '25px',
    marginBottom: '55px',
  },
  personalInfo: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.1rem',
    '& a': {
      textDecoration: 'none',
      color: '#e68d0b',
    },
    '& a:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
    '& span': {
      fontSize: '1.3rem',
      fontWeight: 'bolder',
    },
  },
  companyInfo: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  contactInfo: {
    marginTop: '30px',
    padding: '30px 0px',
    borderRadius: '5px',
    width: '100%',
  },
}));

const Konto = () => {
  const classes = useStyles();

  return (
    <Layout titlePart="Kontakt">
      <Grid container item sm={12} className={classes.root}>
        <Typography variant="h5" component="h1">
          Kontakt
        </Typography>
        <Typography variant="h4" component="p" className={classes.subheader}>
          Masz pytania? Chętnie pomożemy!
        </Typography>

        <Box style={{ width: '100%' }}>
          <Grid sm={12} container item justify="center">
            <Grid item sm={12} md={3} className={classes.personalInfo}>
              <span>Daniel Chechłowski</span>
              <a href="tel:+48500067868">500 067 868</a>
              <a href="mailto:daniel@reklamaswietlna.com">daniel@reklamaswietlna.com</a>
            </Grid>
            <Grid item sm={12} md={3} className={classes.personalInfo}>
              <span>Adam Bręk</span>
              <a href="tel:+48602679173">602 679 173</a>
              <a href="mailto:adam@reklamaswietlna.com">adam@reklamaswietlna.com</a>
            </Grid>
            <Grid item sm={12} md={3} className={classes.personalInfo}>
              <span>Maciej Chechłowski</span>
              <a href="tel:+48509467369">509 467 369</a>
              <a href="mailto:maciek@reklamaswietlna.com">maciek@reklamaswietlna.com</a>
            </Grid>
            <Grid item sm={12} md={3} className={classes.personalInfo}>
              <span>Adam Biźnia</span>
              <a href="tel:+48533567432">533 567 432</a>
              <a href="mailto:a.biznia@reklamaswietlna.com">a.biznia@reklamaswietlna.com</a>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.contactInfo}>
          <Grid sm={12} container item justify="center">
            <Grid item sm={12} md={5} className={classes.personalInfo}>
              <span>biuro / pliki / faktury</span>
              <a href="mailto:biuro@reklamaswietlna.com">biuro@reklamaswietlna.com</a>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.companyInfo}>
          Godziny otwarcia:
          <br />
          pon. - pt. 6-16
          <br />
          sob. - niedz. nieczynne
          <br />
          <br />
          Hermes Chechłowski Bręk S. C.
          <br />
          ul. Anecińska 14, 03-106 Warszawa
          <br />
          NIP: 5242896557
        </Box>
        <Box>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9753.170916112975!2d20.9637354!3d52.3288354!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1a38c64cea6f785a!2sHermes+Printing+Solutions!5e0!3m2!1spl!2spl!4v1555605216541!5m2!1spl!2spl"
            width="100%"
            height="450"
            allowFullScreen
            style={{ border: '0px' }}
          />
        </Box>
      </Grid>
    </Layout>
  );
};

export default Konto;
