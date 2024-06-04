import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField, makeStyles, Button, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import Step from './Step';
import Login from './Login';
import { setAddress, toggleInvoice, toggleSameAddress } from '../../../store/slices/addressSlice';
import FieldCheckbox from '../fields/FieldCheckbox';
import { axiosInstance } from '../utils/axiosInstance';
import { SHIPPING } from '../utils/constants';

const useStyles = makeStyles(() => ({
  address: {
    marginTop: '8px',
  },
  additionalInfo: {
    width: '100%',
  },
  autoFormMessage: {
    width: '100%',
    marginTop: '10px',
  },
  autoFormButton: {
    marginLeft: '10px',
  },
}));

const Address = () => {
  const dispatch = useDispatch();
  const { address, shipping, user } = useSelector((state) => state);

  const [ordersAmount, setOrdersAmount] = useState(null);
  const [formAutoCompleteLoader, setFormAutoCompleteLoader] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (user.isLoggedIn) {
      getOrdersAmount();
    }
  }, [user.isLoggedIn]);

  const getOrdersAmount = async () => {
    try {
      const { data } = await axiosInstance('/orders/amount', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
        },
      });
      setOrdersAmount(data);
    } catch (error) {
      console.log(error);
    }
  };

  const formAutoComplete = async () => {
    try {
      setFormAutoCompleteLoader(true);
      const { data } = await axiosInstance('/orders/last', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
        },
      });
      const { address } = data[0];
      dispatch(setAddress({ key: 'companyName', value: address.companyName }));
      dispatch(setAddress({ key: 'street', value: address.street }));
      dispatch(setAddress({ key: 'postalCode', value: address.postalCode }));
      dispatch(setAddress({ key: 'city', value: address.city }));
      dispatch(setAddress({ key: 'nip', value: address.nip }));
      dispatch(setAddress({ key: 'mobile', value: address.mobile }));
      dispatch(setAddress({ key: 'fullName', value: address.fullName }));
      dispatch(setAddress({ key: 'name', value: address.name }));
      dispatch(setAddress({ key: 'shippingName', value: address.shippingName }));
      dispatch(setAddress({ key: 'shippingAddress', value: address.shippingAddress }));
      dispatch(setAddress({ key: 'shippingCode', value: address.shippingCode }));
      dispatch(setAddress({ key: 'shippingCity', value: address.shippingCity }));
      dispatch(setAddress({ key: 'shippingMobile', value: address.shippingMobile }));
      dispatch(setAddress({ key: 'sameAddress', value: address.sameAddress }));
      setFormAutoCompleteLoader(false);
    } catch (error) {
      console.log(error);
      setFormAutoCompleteLoader(false);
    }
  };

  const fieldsAddressInvoice = [
    { key: 'companyName', label: 'Nazwa firmy' },
    { key: 'street', label: 'Ulica' },
    { key: 'postalCode', label: 'Kod pocztowy' },
    { key: 'city', label: 'Miasto' },
    { key: 'nip', label: 'NIP' },
  ];
  const fieldsAddressPersonal = [
    { key: 'name', label: 'Imię i Nazwisko' },
    { key: 'street', label: 'Ulica' },
    { key: 'postalCode', label: 'Kod pocztowy' },
    { key: 'city', label: 'Miasto' },
  ];
  const fieldsShipping = [
    { key: 'shippingName', label: 'Nazwa firmy' },
    { key: 'shippingAddress', label: 'Ulica' },
    { key: 'shippingCode', label: 'Kod pocztowy' },
    { key: 'shippingCity', label: 'Miasto' },
  ];
  const fieldsContact = [
    { key: 'fullName', label: 'Imię i Nazwisko' },
    { key: 'mobile', label: 'Telefon' },
  ];

  return (
    <>
      {user.isLoggedIn ? (
        <Grid container item xs={12}>
          {ordersAmount > 1 && (
            <Alert severity="info" className={classes.autoFormMessage}>
              Możesz wypełnić poniższe pola danymi z Twojego ostatniego zamówienia.
              <Button
                onClick={formAutoComplete}
                size="small"
                variant="contained"
                className={classes.autoFormButton}
                disabled={formAutoCompleteLoader}
              >
                {formAutoCompleteLoader ? (
                  <CircularProgress color="secondary" size={25} />
                ) : (
                  'Wypełnij formularz'
                )}
              </Button>
            </Alert>
          )}
          <Step
            header="1. Dane do faktury"
            description="Wszystkie pola będą widoczne na fakturze. Jeśli nie potrzebujesz faktury, nie wypełniaj pola NIP i zamiast nazwy firmy wpisz swoje imię i nazwisko."
          >
            <FieldCheckbox
              name="invoice"
              label="Faktura VAT"
              value={address.invoice}
              onChange={() => dispatch(toggleInvoice())}
            />

            {address.invoice
              ? fieldsAddressInvoice.map(({ key, label }) => (
                  <TextField
                    className={classes.address}
                    key={key}
                    id={key}
                    label={label}
                    variant="outlined"
                    size="small"
                    value={address[key]}
                    onChange={(e) => dispatch(setAddress({ key, value: e.target.value }))}
                  />
                ))
              : fieldsAddressPersonal.map(({ key, label }) => (
                  <TextField
                    className={classes.address}
                    key={key}
                    id={key}
                    label={label}
                    variant="outlined"
                    size="small"
                    value={address[key]}
                    onChange={(e) => dispatch(setAddress({ key, value: e.target.value }))}
                  />
                ))}
          </Step>
          {shipping.method !== SHIPPING.PERSONAL && (
            <Step header="2. Adres dostawy" description="Adres na jaki dostarczymy kaseton.">
              <FieldCheckbox
                name="sameAddress"
                label="Adres taki sam jak do faktury"
                value={address.sameAddress}
                onChange={() => dispatch(toggleSameAddress())}
              />
              {!address.sameAddress &&
                fieldsShipping.map(({ key, label }) => (
                  <TextField
                    className={classes.address}
                    key={key}
                    id={key}
                    label={label}
                    variant="outlined"
                    size="small"
                    value={address[key]}
                    onChange={(e) => dispatch(setAddress({ key, value: e.target.value }))}
                  />
                ))}
            </Step>
          )}
          <Step
            header="2. Dane kontaktowe"
            description="Jeśli będzie potrzeba skontaktujemy się z Tobą odnośnie zamówienia."
          >
            {fieldsContact.map(({ key, label }) => (
              <TextField
                className={classes.address}
                key={key}
                id={key}
                label={label}
                variant="outlined"
                size="small"
                value={address[key]}
                onChange={(e) => dispatch(setAddress({ key, value: e.target.value }))}
              />
            ))}
          </Step>
          <Step
            header="3. Uwagi do zamówienia"
            description="Możesz tu wpisać dodatkowe informacje odnośnie zamówienia"
          >
            <TextField
              id="additionalInfo"
              label="Uwagi"
              variant="outlined"
              multiline
              rows={3}
              className={classes.additionalInfo}
              value={address.additionalInfo}
              onChange={(e) =>
                dispatch(setAddress({ key: 'additionalInfo', value: e.target.value }))
              }
            />
          </Step>
        </Grid>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Address;
