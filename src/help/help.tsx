import React from 'react';
import Link from 'next/link';
import { Box, Grid, makeStyles } from '@material-ui/core';

import Layout from '../Layout';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '80vh',
    maxWidth: '1200px',
  },
  header: {},
  left: {
    [theme.breakpoints.down('sm')]: {
      borderBottom: '2px solid #ccc',
      width: '100%',
    },
    '& a': {
      fontSize: '1.05rem',
      display: 'block',
      marginBottom: '9px',
      textDecoration: 'none',
      color: '#4d4d4d',
      paddingLeft: '13px',
      [theme.breakpoints.down('sm')]: {
        paddingLeft: '16px',
      },
    },
    '& a:hover': {
      color: '#000',
    },
    '& .current': {
      color: '#000',
      fontWeight: 'bolder',
      paddingLeft: '10px',
      borderLeft: '3px solid #FBA82C',
      [theme.breakpoints.down('sm')]: {
        borderLeft: '6px solid #FBA82C',
      },
    },
  },
  right: {
    padding: '10px 15px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '20px',
    },
  },
  fixed: {
    position: 'fixed',
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
    },
  },
}));

const Help = ({ children, current, titlePart = 'Pomoc' }) => {
  const classes = useStyles();

  return (
    <Layout titlePart={titlePart}>
      <Grid container item sm={12} className={classes.root} alignContent="flex-start">
        <Grid item sm={3} className={classes.left}>
          <Box className={classes.fixed}>
            <Link href="/faq">
              <a className={current === 'faq' ? 'current' : ''}>Pytania i odpowiedzi</a>
            </Link>
            <Link href="/porownanie-kasetonow">
              <a className={current === 'porownanie-kasetonow' ? 'current' : ''}>
                Porównanie kasetonów
              </a>
            </Link>
            <Link href="/proces-zamowienia">
              <a className={current === 'proces-zamowienia' ? 'current' : ''}>
                Proces składania zamówień
              </a>
            </Link>
            <Link href="/regulamin">
              <a className={current === 'regulamin' ? 'current' : ''}>Regulamin</a>
            </Link>
            <Link href="/polityka-prywatnosci">
              <a className={current === 'polityka-prywatnosci' ? 'current' : ''}>
                Polityka prywatności
              </a>
            </Link>
          </Box>
        </Grid>
        <Grid item sm={9} className={classes.right}>
          {children}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Help;
