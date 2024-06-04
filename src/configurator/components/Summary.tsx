import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { Grid, Box, Typography, Button, makeStyles, Hidden } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SummaryPart from './SummaryPart';
import { decrementStep, incrementStep, setOrderPlaced } from '../../../store/slices/appSlice';
import { setDiscount } from '../../../store/slices/userSlice';
import { axiosInstance } from '../utils/axiosInstance';
import { productsData } from '../productsData';

const useStyles = makeStyles((theme) => ({
  summary: {
    boxShadow: '0px 0px 6px #cccccc',
    border: '1px solid #ccc',
    backgroundColor: '#F5F5F5',
    padding: '20px 10px',
    borderRadius: '3px',
    width: '290px',
    position: 'fixed',
    marginTop: '0px',
    [theme.breakpoints.down('sm')]: {
      bottom: '0',
      zIndex: '999',
      width: '100%',
      position: 'fixed',
    },
  },
  priceCaption: {
    fontWeight: 'lighter',
    fontSize: '0.9rem',
  },
  netPrice: {
    marginTop: '0px',
    width: '100%',
    fontWeight: 'normal',
    fontSize: '2.5rem',
    marginBottom: '-10px',
    '& span': {
      fontSize: '1.5rem',
    },
  },
  totalPrice: {
    marginTop: '0px',
    width: '100%',
    fontWeight: 'lighter',
    fontSize: '1.6rem',
    marginBottom: '-10px',
    '& span': {
      fontSize: '1.5rem',
    },
  },
  hideDetailsPrice: {
    fontWeight: 'bolder',
  },
  productName: {
    textAlign: 'center',
    fontSize: '1.1rem',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
  productNameMobile: {
    textAlign: 'right',
    fontSize: '1.1rem',
    marginTop: '15px',
    marginBottom: '10px',
  },
}));

const Summary = () => {
  const dispatch = useDispatch();
  const { config, shipping, app, prices, address, user } = useSelector((state) => state);

  const [orderButtonDisabled, setOrderButtonDisabled] = useState(false);
  const [backButtonDisabled, setBackButtonDisabled] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(
    productsData.find((el) => el.name === app.currentProduct)
  );

  useEffect(() => {
    const currentProduct = productsData.find((el) => el.name === app.currentProduct);
    setCurrentProduct(currentProduct);
    app.activeStep === 3 && !app.consent
      ? setOrderButtonDisabled(true)
      : setOrderButtonDisabled(false);
    app.activeStep === 4 ? setOrderButtonDisabled(true) : '';
  }, [app.consent, app.activeStep, app.currentProduct]);

  const placeOrder = async () => {
    setOrderButtonDisabled(true);
    setBackButtonDisabled(true);
    try {
      const response = await axiosInstance.post(
        '/orders',
        {
          config,
          shipping,
          app,
          address,
          prices,
          user,
        },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
      dispatch(setOrderPlaced(response.data.orderId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextStep = () => {
    if (app.activeStep === 2 && !user.isLoggedIn) {
      return;
    }
    app.activeStep < 4 && !app.stepError ? dispatch(incrementStep()) : '';
    app.activeStep === 3 ? placeOrder() : '';
  };

  useEffect(() => {
    if (user.isLoggedIn) {
      fetchUserInfo();
    }
  }, [app.activeStep]);

  const fetchUserInfo = async () => {
    try {
      const { data } = await axiosInstance('/users/me', {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
      });
      dispatch(setDiscount(data.discount));
    } catch (error) {
      console.log(error);
    }
  };

  const classes = useStyles();

  return (
    <Grid container item md={4} sm={12} justify="flex-end">
      <Box className={classes.summary}>
        <Hidden mdUp>
          {showDetails ? (
            <>
              <Grid container justify="space-between" alignItems="center">
                <Grid item sm={4}>
                  {' '}
                </Grid>
                <Grid item sm={8}>
                  <Button variant="outlined" onClick={() => setShowDetails(!showDetails)}>
                    <ExpandMoreIcon />
                    Ukryj szczegóły
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Grid container justify="space-between" alignItems="center">
                <Grid item sm={4}>
                  {' '}
                  <Typography className={classes.hideDetailsPrice}>
                    {prices.totalNet.toFixed(2)} <span>zł netto</span>
                  </Typography>
                </Grid>
                <Grid item sm={8}>
                  <Button variant="outlined" onClick={() => setShowDetails(!showDetails)}>
                    <ExpandLessIcon />
                    Szczegóły wyceny
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Hidden>
        <Hidden mdDown>
          <>
            <Box className={classes.productName}>
              Kaseton {currentProduct.doubleSide ? 'dwustronny' : 'jednostronny'}{' '}
              {currentProduct.label}
            </Box>
            {user.discount ||
            config.colorPremium ||
            config.lightingPremium ||
            shipping.currentPrice ||
            config.duskSensor ||
            config.effect3D ||
            config.override ||
            config.revisionPremium ||
            config.fastProduction ||
            config.project ? (
              <SummaryPart name="Rozmiar" price={prices.size.toFixed(2)} />
            ) : null}
            {config.colorPremium && (
              <SummaryPart name="Kolor obudowy" price={prices.color.toFixed(2)} />
            )}
            {config.lightingPremium && (
              <SummaryPart name="Kolor pleksy" price={prices.lighting.toFixed(2)} />
            )}
            {config.duskSensor && <SummaryPart name="Czujnik" price={prices.duskSensor} />}
            {config.effect3D && <SummaryPart name="Efekt 3D" price={prices.effect3D.toFixed(2)} />}
            {config.override && (
              <SummaryPart name="Przysłonięcie" price={prices.override.toFixed(2)} />
            )}
            {config.revisionPremium && (
              <SummaryPart name="Rewizja" price={prices.revision.toFixed(2)} />
            )}
            {config.fastProduction && (
              <SummaryPart name="Ekspres" price={prices.fastProduction.toFixed(2)} />
            )}
            {config.project && <SummaryPart name="Projekt" price={prices.project} />}
            {shipping.currentPrice > 0 && (
              <SummaryPart name="Dostawa" price={shipping.currentPrice} />
            )}
            {user.discount > 0 && (
              <SummaryPart
                name={`Rabat ${user.discount}%`}
                price={`-${prices.discountTotal.toFixed(2)}`}
              />
            )}
            <Typography id="netPrice" className={classes.netPrice} align="right">
              {prices.totalNet.toFixed(2)} <span>zł</span>
            </Typography>
            <Typography className={classes.priceCaption} align="right">
              całkowity koszt netto
            </Typography>
            <Typography className={classes.totalPrice} align="right">
              {prices.totalGross.toFixed(2)} <span>zł</span>
            </Typography>
            <Typography className={classes.priceCaption} align="right">
              brutto (23% VAT)
            </Typography>
          </>
        </Hidden>
        {showDetails && (
          <>
            <Box className={classes.productNameMobile}>
              Kaseton {currentProduct.doubleSide ? 'dwustronny' : 'jednostronny'}{' '}
              {currentProduct.label}
            </Box>
            {config.colorPremium ||
            config.lightingPremium ||
            shipping.currentPrice ||
            config.duskSensor ||
            config.effect3D ||
            config.override ||
            config.revisionPremium ||
            config.fastProduction ||
            config.project ? (
              <SummaryPart name="Rozmiar" price={prices.size.toFixed(2)} />
            ) : null}
            {config.colorPremium && (
              <SummaryPart name="Kolor obudowy" price={prices.color.toFixed(2)} />
            )}
            {config.lightingPremium && (
              <SummaryPart name="Kolor pleksy" price={prices.lighting.toFixed(2)} />
            )}
            {config.duskSensor && <SummaryPart name="Czujnik" price={prices.duskSensor} />}
            {config.effect3D && <SummaryPart name="Efekt 3D" price={prices.effect3D.toFixed(2)} />}
            {config.override && (
              <SummaryPart name="Przysłonięcie" price={prices.override.toFixed(2)} />
            )}
            {config.revisionPremium && (
              <SummaryPart name="Rewizja" price={prices.revision.toFixed(2)} />
            )}
            {config.fastProduction && (
              <SummaryPart name="Ekspres" price={prices.fastProduction.toFixed(2)} />
            )}
            {config.project && <SummaryPart name="Projekt" price={prices.project} />}
            {shipping.currentPrice > 0 && (
              <SummaryPart name="Dostawa" price={shipping.currentPrice} />
            )}
            <Typography className={classes.netPrice} align="right">
              {prices.totalNet.toFixed(2)} <span>zł</span>
            </Typography>
            <Typography className={classes.priceCaption} align="right">
              całkowity koszt netto
            </Typography>
            <Typography className={classes.totalPrice} align="right">
              {prices.totalGross.toFixed(2)} <span>zł</span>
            </Typography>
            <Typography className={classes.priceCaption} align="right">
              brutto (23% VAT)
            </Typography>
          </>
        )}

        <Grid item container sm={12} spacing={1} justify="space-between">
          <Grid item sm={4}>
            <Button
              variant="contained"
              color="secondary"
              style={{ width: '100%', marginTop: '20px', opacity: '0.4' }}
              onClick={() => dispatch(decrementStep())}
              disabled={app.activeStep === 0 || backButtonDisabled}
            >
              Wstecz
            </Button>
          </Grid>
          <Grid item sm={8}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: '100%', marginTop: '20px' }}
              onClick={handleNextStep}
              disabled={orderButtonDisabled}
            >
              {app.activeStep < 3 ? 'Dalej' : 'Zamów'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Summary;
