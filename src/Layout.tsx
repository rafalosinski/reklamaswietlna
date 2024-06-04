import Head from 'next/head';
import { Grid } from '@material-ui/core';

import Header from './layout/Header';
import Footer from './layout/Footer';

interface LayoutProps {
  children: React.ReactNode;
  titlePart: string;
  noindexFollow?: boolean;
  metaDescription?: boolean;
}

const Layout = ({
  children,
  titlePart,
  noindexFollow = false,
  metaDescription = false,
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{titlePart} | reklamaswietlna.com</title>
        {noindexFollow && <meta name="robots" content="noindex,follow" />}
        {metaDescription && (
          <meta
            name="description"
            content="Skorzystaj ze specjalnego konfiguratora, aby zaprojektować, wycenić oraz zamówić kasetony reklamowe dla swojej firmy! Sprawdź naszą wyjątkową ofertę."
          />
        )}
      </Head>
      <Grid container justify="center">
        <Header />
        {children}
        <Footer />
      </Grid>
    </>
  );
};

export default Layout;
