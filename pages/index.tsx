import React from 'react';
import Grid from '@material-ui/core/Grid';

import Baner from '../src/home/Baner';
import ProductList from '../src/home/ProductList';
import InfoBox from '../src/home/InfoBox';
import Layout from '../src/Layout';
import Warranty from '../src/home/Warranty';

export default function Index() {
  return (
    <Layout titlePart="Reklama świetlna producent Warszawa, produkcja kasetonów" metaDescription>
      <Grid container justify="center">
        <Baner />
        <Warranty />
        <ProductList />
        <InfoBox />
      </Grid>
    </Layout>
  );
}
