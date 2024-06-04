import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';

import { productsData, tapeTypes, revisionOptions } from '../productsData';
import FieldCheckbox from '../fields/FieldCheckbox';
import { toggleConsent } from '../../../store/slices/appSlice';
import { priceList } from '../../../store/slices/shippingSlice';
import { shapes } from '../steps/Shape';
import { tapesSpecial } from '../colors/tapes';
import { COLORS, LIGHTING, PRODUCTS, SHIPPING } from '../utils/constants';

const useStyles = makeStyles(() => ({
  step: {
    padding: '5px 15px',
    borderBottom: '1px solid #f0f0f0',
    borderRadius: '3px',
    marginBottom: '0px',
    '& label': {
      backgroundColor: 'white',
    },
  },
  stepNumber: {
    fontStyle: 'italic',
    fontWeight: 'lighter',
    color: '#868686',
  },
  stepHeader: {
    fontWeight: 'lighter',
  },
  stepDescription: {
    paddingRight: '35px',
    lineHeight: '1.1',
    fontWeight: 'lighter',
    fontSize: '1rem',
    color: '#868686',
  },
  stepContent: {
    fontSize: '1rem',
  },
  consents: {
    marginTop: '30px',
  },
  regLink: {
    marginLeft: '2px',
    marginRight: '2px',
    textDecoration: 'underline 1px solid #000',
    color: '#000',
    cursor: 'pointer',
  },
  consentRow: {
    border: '2px solid #FBA82C',
  },
}));

interface SectionHeaderProps {
  header: string;
}

const SectionHeader = ({ header }: SectionHeaderProps) => {
  const classes = useStyles();
  return (
    <Grid container item sm={12} alignItems="center" className={classes.step}>
      <Typography variant="h6">{header}</Typography>
    </Grid>
  );
};

interface OrderStepProps {
  description: string;
  children: React.ReactNode;
  className?: string;
}

const OrderStep = ({ description, children, className }: OrderStepProps) => {
  const classes = useStyles();

  return (
    <Grid container item sm={12} alignItems="center" className={`${classes.step} ${className}`}>
      <Grid item md={3} xs={12}>
        <Typography variant="body2" className={classes.stepDescription}>
          {description}
        </Typography>
      </Grid>
      <Grid item md={9} xs={12} className={classes.stepContent}>
        {children}
      </Grid>
    </Grid>
  );
};

const Order = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { config, address, app, shipping } = useSelector((state) => state);

  const [currentProduct, setCurrentProduct] = useState({});
  const [productLabel, setProductLabel] = useState('');
  const [colorLabel, setColorLabel] = useState('');
  const [colorFinishLabel, setColorFinishLabel] = useState('');
  const [lightingLabel, setLightingLabel] = useState('');
  const [optionList, setOptionList] = useState([]);
  const [tapeColorLabel, setTapeColorLabel] = useState('');
  const [tapeType, setTapeType] = useState('');
  const [fastProductionDays, setFastProductionDays] = useState(3);
  const [revisionLabel, setRevisionLabel] = useState('');

  useEffect(() => {
    const optionList = [];
    config.duskSensor ? optionList.push('Czujnik zmierzchu') : '';
    config.effect3D ? optionList.push('Efekt3D') : '';
    config.fastProduction ? optionList.push('Ekpresowa realizacja') : '';
    config.project ? optionList.push('Projekt') : '';
    config.override ? optionList.push('Przysłonięcie lica') : '';
    setOptionList(optionList);

    const currentProduct = productsData.find((el) => el.name === app.currentProduct);
    setCurrentProduct(currentProduct);
    let currentShape = '';
    if (
      app.currentProduct === PRODUCTS.SINGLE_ALU_SHAPE ||
      app.currentProduct === PRODUCTS.DOUBLE_ALU_SHAPE
    ) {
      currentShape = shapes.find((el) => el.value === config.shape).name;
    }
    setProductLabel(
      `Kaseton ${currentProduct.doubleSide ? 'dwustronny' : 'jednostronny'} ${
        currentProduct.label
      } ${currentShape ? ` - ${currentShape}` : ''}`
    );

    setFastProductionDays(currentProduct.fastProductionDays);

    const { colorOptions } = currentProduct;
    const currentColor = colorOptions.find((el) => el.value === config.color);
    setColorLabel(currentColor.label);
    setColorFinishLabel(currentColor.finishLabel);

    if (currentProduct.lightingOptions) {
      const { lightingOptions } = currentProduct;
      const currentLighting = lightingOptions.find((el) => el.value === config.lighting);
      setLightingLabel(currentLighting.label);
    }

    if (config.color === COLORS.TAPE_SPECIAL) {
      const tapeColor = tapesSpecial.find((el) => el.code === config.colorCode).name;
      setTapeColorLabel(tapeColor);
    }

    if (
      app.currentProduct === PRODUCTS.SINGLE_ALU_SHAPE ||
      app.currentProduct === PRODUCTS.DOUBLE_ALU_SHAPE
    ) {
      const tapeType = tapeTypes.find((el) => el.value === config.tapeType).label;
      setTapeType(tapeType);
    }

    if (app.currentProduct === PRODUCTS.SINGLE_ALU_PLEX) {
      const revisionLabel = revisionOptions.standardSet.find((el) => el.value === config.revision)
        .label;
      setRevisionLabel(revisionLabel);
    }
  }, [config]);

  return (
    <Grid container item sm={12} spacing={0}>
      <SectionHeader header="Produkt" />
      <OrderStep description="forma">{productLabel}</OrderStep>
      <OrderStep description="rozmiar">
        {config.sizeWidth} x {config.sizeHeight} x {config.thickness} cm
      </OrderStep>
      <OrderStep description="kolor obudowy">
        {colorLabel} {colorFinishLabel}
        {(config.color === COLORS.FOIL_PALETTE_GLOSSY || config.color === COLORS.TAPE_RAL) &&
          `, nr koloru: ${config.colorCode}`}
        {config.color === COLORS.TAPE_SPECIAL && `, kolor: ${tapeColorLabel}`}
        {config.color === COLORS.CUSTOM_RAL && `, kolor: ${config.colorRal}`}
        {(config.color === COLORS.FOIL_CMYK_MAT || config.color === COLORS.FOIL_CMYK_GLOSSY) &&
          config.cmykProject &&
          ` - własny projekt`}
        {(config.color === COLORS.FOIL_CMYK_MAT || config.color === COLORS.FOIL_CMYK_GLOSSY) &&
          !config.cmykProject &&
          ` ${config.cmyk.join('/')}`}
      </OrderStep>
      {(app.currentProduct === PRODUCTS.SINGLE_DIBOND ||
        app.currentProduct === PRODUCTS.DOUBLE_DIBOND) && (
        <OrderStep description="kolor świecenia">
          {lightingLabel}
          {config.lighting === LIGHTING.PALETTE && `, nr koloru: ${config.lightingCode}`}
        </OrderStep>
      )}
      {(app.currentProduct === PRODUCTS.SINGLE_ALU_SHAPE ||
        app.currentProduct === PRODUCTS.DOUBLE_ALU_SHAPE) && (
        <OrderStep description="rodzaj taśmy">{tapeType}</OrderStep>
      )}

      {optionList.length > 0 && (
        <OrderStep description="opcje dodatkowe">{optionList.join(', ')}</OrderStep>
      )}
      {app.currentProduct === PRODUCTS.SINGLE_ALU_PLEX && (
        <OrderStep description="rewizja">{revisionLabel}</OrderStep>
      )}
      <OrderStep description="termin realizacji">
        {config.fastProduction
          ? `do ${fastProductionDays} dni roboczych`
          : 'od 5 do 10 dni roboczych'}
      </OrderStep>
      <SectionHeader header="Faktura" />
      {address.companyName && address.invoice && (
        <OrderStep description="nazwa firmy">{address.companyName}</OrderStep>
      )}
      {address.companyName && !address.invoice && (
        <OrderStep description="imię / nazwisko">{address.name}</OrderStep>
      )}
      {address.street && <OrderStep description="adres">{address.street}</OrderStep>}
      {address.postalCode && <OrderStep description="kod pocztowy">{address.postalCode}</OrderStep>}
      {address.city && <OrderStep description="miasto">{address.city}</OrderStep>}
      {address.nip && address.invoice && <OrderStep description="NIP">{address.nip}</OrderStep>}
      <SectionHeader header="Dostawa" />

      <OrderStep description="rodzaj">
        {priceList.labels[shipping.method]}
        {shipping.method === SHIPPING.COUNTRY_DELIVERY &&
          `, kod pocztowy ${shipping.zipCode}, ${(shipping.distance / 1000).toFixed(0)} km`}
      </OrderStep>

      {address.sameAddress ? (
        <OrderStep description="adres">taki sam jak dane do faktury</OrderStep>
      ) : (
        <>
          {' '}
          {address.shippingName && (
            <OrderStep description="nazwa firmy">{address.shippingName}</OrderStep>
          )}
          {address.shippingAddress && (
            <OrderStep description="adres">{address.shippingAddress}</OrderStep>
          )}
          {address.shippingCode && (
            <OrderStep description="kod pocztowy">{address.shippingCode}</OrderStep>
          )}
          {address.shippingCity && (
            <OrderStep description="miasto">{address.shippingCity}</OrderStep>
          )}
        </>
      )}

      <SectionHeader header="Pozostałe informacje" />
      {address.fullName && <OrderStep description="Imię i Nazwisko">{address.fullName}</OrderStep>}
      {address.mobile && <OrderStep description="Telefon">{address.mobile}</OrderStep>}
      {address.additionalInfo && (
        <OrderStep description="Dodatkowe informacje">{address.additionalInfo}</OrderStep>
      )}
      {config.projectInfo && (
        <OrderStep description="Opis projektu">{config.projectInfo}</OrderStep>
      )}
      <SectionHeader header="Potwierdź zamówienie" />
      <OrderStep description="Regulamin" className={classes.consentRow}>
        <FieldCheckbox
          name="reg-consent"
          label={
            <Box>
              Akceptuję{' '}
              <Link href="/regulamin">
                <a target="_blank" className={classes.regLink}>
                  regulamin
                </a>
              </Link>{' '}
              serwisu i potwierdzam powyższe zamówienie
            </Box>
          }
          value={app.consent}
          onChange={() => dispatch(toggleConsent())}
        />
      </OrderStep>
    </Grid>
  );
};

export default Order;
