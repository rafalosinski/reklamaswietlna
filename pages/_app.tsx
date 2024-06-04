import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import type { AppProps /*, AppContext */ } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/store';
import { AnimatePresence } from 'framer-motion';
import SimpleReactLightbox from 'simple-react-lightbox';
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'GTM-5GJ4NFV',
};

export default function MyApp(props) {
  const { Component, pageProps }: AppProps = props;

  React.useEffect(() => {
    // TagManager.initialize(tagManagerArgs);
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Provider store={store}>
        <Head>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <AnimatePresence exitBeforeEnter>
            <SimpleReactLightbox>
              <Component {...pageProps} key={props.router.route} />
            </SimpleReactLightbox>
          </AnimatePresence>
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
