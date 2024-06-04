import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, CircularProgress, makeStyles, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import FieldCheckbox from '../fields/FieldCheckbox';
import Step from './Step';
import { setZipCode, setShippingMethod, setDistance } from '../../../store/slices/shippingSlice';
import { SHIPPING } from '../utils/constants';

const useStyles = makeStyles(() => ({
  shippingCode: {
    width: '150px',
  },
  codeButton: {
    marginLeft: '10px',
    marginTop: '1px',
  },
  codeError: {
    marginTop: '10px',
  },
}));

const ShippingZipCode = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const shipping = useSelector((state) => state.shipping);

  const [zipCodeValid, setZipCodeValid] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [codeError, setCodeError] = useState(false);

  const fetchDistance = async () => {
    setButtonLoader(true);
    try {
      const res = await fetch('https://reklamaswietlna.com/api/distance', {
        method: 'POST',
        body: JSON.stringify(shipping.zipCode),
      });
      setCodeError(false);
      setButtonLoader(false);
      const { response } = await res.json();
      const distance = response.rows[0].elements[0].distance.value;
      dispatch(setDistance(distance));
      shipping.method === SHIPPING.COUNTRY_DELIVERY
        ? dispatch(setShippingMethod(SHIPPING.COUNTRY_DELIVERY))
        : '';
    } catch (error) {
      console.log(error);
      dispatch(setShippingMethod(SHIPPING.PERSONAL));
      setCodeError(true);
    }
  };

  const handleZipCode = (code) => {
    const regex = new RegExp('^[0-9]$');
    const numbersOnly = code.split('').filter((el) => regex.test(el));
    const slicedCode = numbersOnly.slice(0, 5);
    slicedCode.length === 5 ? setZipCodeValid(true) : setZipCodeValid(false);
    slicedCode.length > 1 ? slicedCode.splice(2, 0, '-') : '';
    dispatch(setZipCode(slicedCode.join('')));
  };

  return (
    <Step
      header="5. Dowóz w całej Polsce"
      description="1,20zł/km liczone w obie strony. Wpisz kod pocztowy miejsca docelowego aby zobaczyć wyliczenie."
    >
      <TextField
        id="shippingCode"
        label="Kod pocztowy"
        variant="outlined"
        size="small"
        className={classes.shippingCode}
        value={shipping.zipCode}
        placeholder={'__-___'}
        onChange={(e) => handleZipCode(e.target.value)}
      />
      <Button
        onClick={fetchDistance}
        variant="contained"
        className={classes.codeButton}
        disabled={!zipCodeValid}
      >
        {buttonLoader ? <CircularProgress size="25px" color="secondary" /> : 'Wyceń'}
      </Button>
      {codeError && (
        <Alert severity="error" className={classes.codeError}>
          Nieprawidłowy kod!
        </Alert>
      )}
      {shipping.distance > 0 && !codeError && (
        <FieldCheckbox
          radio
          name="shipping-countryDelivery"
          label={`Dowóz - ${(shipping.distance / 1000).toFixed(0).toString()} km`}
          value={shipping.method === SHIPPING.COUNTRY_DELIVERY}
          onChange={() => dispatch(setShippingMethod(SHIPPING.COUNTRY_DELIVERY))}
          price={shipping.countryDeliveryPrice}
        />
      )}
    </Step>
  );
};

export default ShippingZipCode;
