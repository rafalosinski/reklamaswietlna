import { useEffect, useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import dayjs from 'dayjs';

import { priceList } from '../../store/slices/shippingSlice';
import { tapesSpecial } from '../configurator/colors/tapes';
import { productsData, tapeTypes } from '../configurator/productsData';
import { shapes } from '../configurator/steps/Shape';
import { COLORS, LIGHTING, PRODUCTS, SHIPPING } from '../configurator/utils/constants';
import InfoPartial from './InfoPartial';

const useStyles = makeStyles((theme) => ({
  step: {
    padding: '5px 0px',
    borderBottom: '1px solid #f0f0f0',
    borderRadius: '3px',
    marginBottom: '0px',
    '& label': {
      backgroundColor: 'white',
    },
  },
  stepHeader: {
    fontSize: '1.1rem',
    fontWeight: 'lighter',
  },
}));

interface SectionHeaderProps {
  header: string;
}

const SectionHeader = ({ header }: SectionHeaderProps) => {
  const classes = useStyles();
  return (
    <Grid container item sm={12} alignItems="center" className={classes.step}>
      <Typography variant="h6" className={classes.stepHeader}>
        {header}
      </Typography>
    </Grid>
  );
};

const OrderInfo = ({ order }) => {
  const [currentProduct, setCurrentProduct] = useState({});
  const [productLabel, setProductLabel] = useState('');
  const [colorLabel, setColorLabel] = useState('');
  const [colorFinishLabel, setColorFinishLabel] = useState('');
  const [lightingLabel, setLightingLabel] = useState('');
  const [optionList, setOptionList] = useState([]);
  const [tapeColorLabel, setTapeColorLabel] = useState('');
  const [tapeType, setTapeType] = useState('');
  const [fastProductionDays, setFastProductionDays] = useState(3);

  useEffect(() => {
    const optionList = [];
    order.config.duskSensor ? optionList.push('Czujnik zmierzchu') : '';
    order.config.effect3D ? optionList.push('Efekt3D') : '';
    order.config.fastProduction ? optionList.push('Ekpresowa realizacja') : '';
    order.config.project ? optionList.push('Projekt') : '';
    order.config.override ? optionList.push('Przysłonięcie lica') : '';
    setOptionList(optionList);

    const currentProduct = productsData.find((el) => el.name === order.app.currentProduct);
    setCurrentProduct(currentProduct);
    let currentShape = '';
    if (
      order.app.currentProduct === PRODUCTS.SINGLE_ALU_SHAPE ||
      order.app.currentProduct === PRODUCTS.DOUBLE_ALU_SHAPE
    ) {
      currentShape = shapes.find((el) => el.value === order.config.shape).name;
    }
    setProductLabel(
      `Kaseton ${currentProduct.doubleSide ? 'dwustronny' : 'jednostronny'} ${
        currentProduct.label
      } ${currentShape ? ` - ${currentShape}` : ''}`
    );

    setFastProductionDays(currentProduct.fastProductionDays);

    const { colorOptions } = currentProduct;
    const currentColor = colorOptions.find((el) => el.value === order.config.color);
    setColorLabel(currentColor.label);
    setColorFinishLabel(currentColor.finishLabel);

    if (currentProduct.lightingOptions) {
      const { lightingOptions } = currentProduct;
      const currentLighting = lightingOptions.find((el) => el.value === order.config.lighting);
      setLightingLabel(currentLighting.label);
    }

    if (order.config.color === COLORS.TAPE_SPECIAL) {
      const tapeColor = tapesSpecial.find((el) => el.code === order.config.colorCode).name;
      setTapeColorLabel(tapeColor);
    }

    if (
      order.app.currentProduct === PRODUCTS.SINGLE_ALU_SHAPE ||
      order.app.currentProduct === PRODUCTS.DOUBLE_ALU_SHAPE
    ) {
      const tapeType = tapeTypes.find((el) => el.value === order.config.tapeType).label;
      setTapeType(tapeType);
    }
  }, []);

  return (
    <Grid item container sm={12}>
      <SectionHeader header="Produkt" />
      <InfoPartial description="forma">{productLabel}</InfoPartial>
      <InfoPartial description="rozmiar">
        {order.config.sizeWidth} x {order.config.sizeHeight} x {order.config.thickness} cm
      </InfoPartial>
      <InfoPartial description="kolor obudowy">
        {colorLabel} {colorFinishLabel}
        {(order.config.color === COLORS.FOIL_PALETTE_GLOSSY ||
          order.config.color === COLORS.TAPE_RAL) &&
          `, nr koloru: ${order.config.colorCode}`}
        {order.config.color === COLORS.CUSTOM_RAL && `, kolor: ${order.config.colorRal}`}
        {order.config.color === COLORS.TAPE_SPECIAL && `, kolor: ${tapeColorLabel}`}
        {(order.config.color === COLORS.FOIL_CMYK_MAT ||
          order.config.color === COLORS.FOIL_CMYK_GLOSSY) &&
          order.config.cmykProject &&
          ` - własny projekt`}
        {(order.config.color === COLORS.FOIL_CMYK_MAT ||
          order.config.color === COLORS.FOIL_CMYK_GLOSSY) &&
          !order.config.cmykProject &&
          ` ${order.config.cmyk.join('/')}`}
      </InfoPartial>
      {(order.app.currentProduct === PRODUCTS.SINGLE_DIBOND ||
        order.app.currentProduct === PRODUCTS.DOUBLE_DIBOND) && (
        <InfoPartial description="kolor świecenia">
          {lightingLabel}
          {order.config.lighting === LIGHTING.PALETTE &&
            `, nr koloru: ${order.config.lightingCode}`}
        </InfoPartial>
      )}
      {(order.app.currentProduct === PRODUCTS.SINGLE_ALU_SHAPE ||
        order.app.currentProduct === PRODUCTS.DOUBLE_ALU_SHAPE) && (
        <InfoPartial description="rodzaj taśmy">{tapeType}</InfoPartial>
      )}

      {optionList.length > 0 && (
        <InfoPartial description="opcje dodatkowe">{optionList.join(', ')}</InfoPartial>
      )}
      <InfoPartial description="termin realizacji">
        {order.config.fastProduction
          ? `do ${fastProductionDays} dni roboczych`
          : 'od 5 do 10 dni roboczych'}
      </InfoPartial>

      <SectionHeader header="Cena" />
      <InfoPartial description="wartość netto">{order.prices.totalNet.toFixed(2)} zł</InfoPartial>
      <InfoPartial description="wartość brutto">
        {order.prices.totalGross.toFixed(2)} zł
      </InfoPartial>

      <SectionHeader header="Faktura" />
      {order.address.companyName && order.address.invoice && (
        <InfoPartial description="nazwa firmy">{order.address.companyName}</InfoPartial>
      )}
      {order.address.companyName && !order.address.invoice && (
        <InfoPartial description="imię / nazwisko">{order.address.name}</InfoPartial>
      )}
      {order.address.street && (
        <InfoPartial description="adres">{order.address.street}</InfoPartial>
      )}
      {order.address.postalCode && (
        <InfoPartial description="kod pocztowy">{order.address.postalCode}</InfoPartial>
      )}
      {order.address.city && <InfoPartial description="miasto">{order.address.city}</InfoPartial>}
      {order.address.nip && order.address.invoice && (
        <InfoPartial description="NIP">{order.address.nip}</InfoPartial>
      )}
      <SectionHeader header="Dostawa" />

      <InfoPartial description="rodzaj">
        {priceList.labels[order.shipping.method]}
        {order.shipping.method === SHIPPING.COUNTRY_DELIVERY &&
          `, kod pocztowy ${order.shipping.zipCode}, ${(order.shipping.distance / 1000).toFixed(
            0
          )} km`}
      </InfoPartial>

      {order.address.sameAddress ? (
        <InfoPartial description="adres">taki sam jak dane do faktury</InfoPartial>
      ) : (
        <>
          {' '}
          {order.address.shippingName && (
            <InfoPartial description="nazwa firmy">{order.address.shippingName}</InfoPartial>
          )}
          {order.address.shippingAddress && (
            <InfoPartial description="adres">{order.address.shippingAddress}</InfoPartial>
          )}
          {order.address.shippingCode && (
            <InfoPartial description="kod pocztowy">{order.address.shippingCode}</InfoPartial>
          )}
          {order.address.shippingCity && (
            <InfoPartial description="miasto">{order.address.shippingCity}</InfoPartial>
          )}
        </>
      )}

      <SectionHeader header="Pozostałe informacje" />
      <InfoPartial description="data złożenia zamówienia">
        {dayjs(order.createdAt).format('DD/MM/YYYY, H:m')}
      </InfoPartial>
      {order.address.fullName && (
        <InfoPartial description="Imię i Nazwisko">{order.address.fullName}</InfoPartial>
      )}
      {order.address.mobile && (
        <InfoPartial description="Telefon">{order.address.mobile}</InfoPartial>
      )}
      {order.address.additionalInfo && (
        <InfoPartial description="Dodatkowe informacje">{order.address.additionalInfo}</InfoPartial>
      )}
      {order.config.projectInfo && (
        <InfoPartial description="Opis projektu">{order.config.projectInfo}</InfoPartial>
      )}
    </Grid>
  );
};

export default OrderInfo;
