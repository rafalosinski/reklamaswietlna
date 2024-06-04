import React, { useEffect, useState } from 'react';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stepper,
  StepLabel,
  Step as StepperPart,
  Box,
  Typography,
  makeStyles,
} from '@material-ui/core';

import Layout from '../src/Layout';
import Step from '../src/configurator/components/Step';
import Summary from '../src/configurator/components/Summary';
import SingleDibond from '../src/configurator/products/SingleDibond';
import DoubleDibond from '../src/configurator/products/DoubleDibond';
import SingleAluPlex from '../src/configurator/products/SingleAluPlex';
import DoubleAluPlex from '../src/configurator/products/DoubleAluPlex';
import SingleAluStretch from '../src/configurator/products/SingleAluStretch';
import SingleAluShape from '../src/configurator/products/SingleAluShape';
import DoubleAluShape from '../src/configurator/products/DoubleAluShape';
import Address from '../src/configurator/components/Address';
import Order from '../src/configurator/components/Order';
import Shipping from '../src/configurator/components/Shipping';
import Confirmation from '../src/configurator/components/Confirmation';

import { useSelector, useDispatch } from 'react-redux';
import { resetPrices, setPrices } from '../store/slices/pricesSlice';
import { resetApp, setProduct } from '../store/slices/appSlice';
import {
  resetConfig,
  setColor,
  setColorCode,
  setMaxDouble,
  setMaxSingle,
  setThickness,
} from '../store/slices/configSlice';
import { setTimeout } from 'timers';
import Placeholder from '../src/configurator/components/Placeholder';
import { productsData } from '../src/configurator/productsData';
import { priceCalc } from '../src/configurator/utils/priceCalc';
import { resetAddress } from '../store/slices/addressSlice';
import { resetShipping } from '../store/slices/shippingSlice';
import Link from 'next/link';
import { setHomeProduct } from '../store/slices/homeSlice';
import { PRODUCTS } from '../src/configurator/utils/constants';
import Image from 'next/image';
import { axiosInstance } from '../src/configurator/utils/axiosInstance';
const publicIp = require('public-ip');

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '80vh',
    maxWidth: '1200px',
    paddingBottom: '100px',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '50px',
    },
  },
  infoBox: {
    width: '100%',
    backgroundColor: theme.palette.grey[100],
    borderRadius: '5px',
    opacity: '0.8',
    paddingTop: '20px',
    '& h1': {
      fontSize: '1.2rem',
      fontWeight: 'normal',
      marginBottom: '0px',
      marginLeft: '35px',
    },
  },
  menuItem: {
    whiteSpace: 'normal',
  },
  menuSeparator: {
    marginBottom: '10px',
  },
  stepper: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    opacity: '0.8',
  },
  colorType: {
    fontWeight: 'lighter',
    marginLeft: '5px',
    marginRight: '5px',
  },
  alert: {
    marginTop: '10px',
  },
  colorCmykInput: {
    width: '55px',
    marginLeft: '5px',
  },
  inputWide: {
    width: '370px',
  },
  inputShort: {
    width: '300px',
  },
  inputSize: {
    width: '130px',
    marginRight: '15px',
  },
  pricePart: {
    marginTop: '9px',
    color: '#868686',
  },
  stepPrice: {
    width: '100%',
    fontWeight: 'lighter',
    fontSize: '0.9rem',
  },
}));

const Konfigurator = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { app, config, prices, shipping, home, user } = useSelector((state) => state);

  const [loader, setLoader] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(
    productsData.find((el) => el.name === app.currentProduct)
  );

  useEffect(() => {
    dispatch(resetApp());
    dispatch(resetConfig());
    dispatch(resetAddress());
    dispatch(resetShipping());
    dispatch(resetPrices());
    if (app.currentProduct !== home.homeProduct) {
      handleProductChange(home.homeProduct);
    }
    return () => {
      setHomeProduct(PRODUCTS.SINGLE_DIBOND);
    };
  }, []);

  useEffect(() => {
    const newPrices = priceCalc({ app, config, prices, shipping, user });
    dispatch(setPrices(newPrices));
  }, [
    config.sizeWidth,
    config.sizeHeight,
    config.color,
    config.lighting,
    config.effect3D,
    config.override,
    config.duskSensor,
    config.project,
    config.fastProduction,
    config.shape,
    config.revision,
    config.discountTotal,
    user.discount,
    shipping,
    app.currentProduct,
    shipping.countryDeliveryPrice,
  ]);

  useEffect(() => {
    const sendIp = async () => {
      const response = await publicIp.v4();
      await axiosInstance.post('/calcs', { ipAddress: response });
    };
    if (config.sizeChanged) {
      sendIp();
    }
  }, [config.sizeChanged]);

  useEffect(() => {
    const currentProduct = productsData.find((el) => el.name === app.currentProduct);
    setCurrentProduct(currentProduct);
  }, [app.currentProduct]);

  const handleProductChange = (productName) => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1100);
    dispatch(setProduct(productName));
    dispatch(resetConfig());

    // set defaults
    const currentProduct = productsData.find((el) => el.name === productName);
    dispatch(setThickness(currentProduct.thickness[0]));
    dispatch(setColor(currentProduct.colorOptions[0]));
    dispatch(setColorCode(currentProduct.defaults.colorCode));
    dispatch(setMaxSingle(currentProduct.defaults.sizeMaxSingle));
    dispatch(setMaxDouble(currentProduct.defaults.sizeMaxDouble));
  };

  const productSteps = (product) => {
    switch (product) {
      case PRODUCTS.SINGLE_DIBOND:
        return <SingleDibond />;
      case PRODUCTS.SINGLE_ALU_PLEX:
        return <SingleAluPlex />;
      case PRODUCTS.SINGLE_ALU_STRETCH:
        return <SingleAluStretch />;
      case PRODUCTS.SINGLE_ALU_SHAPE:
        return <SingleAluShape />;
      case PRODUCTS.DOUBLE_DIBOND:
        return <DoubleDibond />;
      case PRODUCTS.DOUBLE_ALU_PLEX:
        return <DoubleAluPlex />;
      case PRODUCTS.DOUBLE_ALU_SHAPE:
        return <DoubleAluShape />;
      default:
        return <>Empty</>;
    }
  };

  const stepNames = ['Produkt', 'Wysyłka', 'Twoje dane', 'Podsumowanie'];

  return (
    <Layout titlePart="Konfigurator">
      <Grid sm={12} container item className={classes.root} alignContent="flex-start" spacing={1}>
        <Grid container item sm={8} alignItems="center">
          <Box className={classes.infoBox}>
            <Typography variant="h1">Konfigurator kasetonów</Typography>
            <Stepper alternativeLabel activeStep={app.activeStep} className={classes.stepper}>
              {stepNames.map((step) => (
                <StepperPart key={step}>
                  <StepLabel>{step}</StepLabel>
                </StepperPart>
              ))}
            </Stepper>
          </Box>

          {app.activeStep === 0 && (
            <>
              {/* Product */}
              <Step
                header="1. Rodzaj kasetonu"
                description={
                  <Box>
                    Wybierz formę reklamy. Jeśli potrzebujesz pomocy w wyborze zajrzyj do zakładki{' '}
                    <Link href="/realizacje">
                      <a>Realizacje</a>
                    </Link>{' '}
                    oraz do{' '}
                    <Link href="/porownanie-kasetonow">
                      <a>Porównania Kasetonów</a>
                    </Link>{' '}
                    dostępnego w dziale Pomoc.
                  </Box>
                }
              >
                <FormControl variant="outlined" margin="dense">
                  <InputLabel htmlFor="age-native-helper">Kaseton</InputLabel>
                  <Select
                    className={classes.inputWide}
                    id="age-native-helper"
                    value={app.currentProduct}
                    required
                    onChange={(e) => handleProductChange(e.target.value)}
                  >
                    {productsData.map(({ name, label, doubleSide }, index) => (
                      <MenuItem
                        key={name}
                        value={name}
                        className={`${classes.menuItem} ${index === 3 && classes.menuSeparator}`}
                      >
                        {doubleSide ? (
                          <span>Dwustronny {label}</span>
                        ) : (
                          <span>Jednostronny {label}</span>
                        )}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Image
                  src={currentProduct.imgSrc}
                  alt={`Kaseton ${currentProduct.label}`}
                  width={854}
                  height={371}
                />
              </Step>
              {loader ? <Placeholder /> : productSteps(app.currentProduct)}
            </>
          )}
          {app.activeStep === 1 && <Shipping />}
          {app.activeStep === 2 && <Address />}
          {app.activeStep === 3 && <Order />}
          {app.activeStep === 4 && <Confirmation />}
        </Grid>
        <Summary />
      </Grid>
    </Layout>
  );
};

export default Konfigurator;
