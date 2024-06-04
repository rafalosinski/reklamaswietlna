import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

import { setShippingMethod, priceList } from '../../../store/slices/shippingSlice';
import Step from './Step';
import FieldCheckbox from '../fields/FieldCheckbox';
import ShippingZipCode from './ShippingZipCode';
import { SHIPPING } from '../utils/constants';

const Shipping = () => {
  const dispatch = useDispatch();
  const { shipping, config } = useSelector((state) => state);

  const [packageStandardDisabled, setPackageStandardDisabled] = useState(false);
  const [packageOverloadDisabled, setPackageOverloadDisabled] = useState(false);

  useEffect(() => {
    // Sum of sizes to determine available shipping methods
    const sizeSum = config.sizeWidth + config.sizeHeight;

    // Enable/disable fields
    sizeSum > 200 ? setPackageStandardDisabled(true) : setPackageStandardDisabled(false);
    sizeSum > 270 ? setPackageOverloadDisabled(true) : setPackageOverloadDisabled(false);

    // Set to PERSONAL if size is changed after selecting method
    if (
      (shipping.method === SHIPPING.PACKAGE_STANDARD && sizeSum > 200) ||
      (shipping.method === SHIPPING.PACKAGE_OVERLOAD && sizeSum > 270)
    ) {
      dispatch(setShippingMethod(SHIPPING.PERSONAL));
    }
  }, [config.sizeWidth, config.sizeHeight]);

  return (
    <Grid container item sm={12}>
      <Step
        header="1. Odbiór osobisty"
        description="w godzinach 8-16 (dni robocze) pod adresem: ul. Anecińska 14, 03-106 Warszawa"
      >
        <FieldCheckbox
          radio
          name="shipping-personal"
          label="Odbiór osobisty"
          value={shipping.method === SHIPPING.PERSONAL}
          onChange={() => dispatch(setShippingMethod(SHIPPING.PERSONAL))}
        />
      </Step>

      <Step
        header="2. Kurier standardowy"
        description="Dla kasetonów, gdzie suma szerokości i wysokości nie przekracza 200 cm."
      >
        <FieldCheckbox
          radio
          name="shipping-package1"
          label="Kurier standardowy"
          value={shipping.method === SHIPPING.PACKAGE_STANDARD}
          onChange={() => dispatch(setShippingMethod(SHIPPING.PACKAGE_STANDARD))}
          price={priceList[SHIPPING.PACKAGE_STANDARD]}
          disabled={packageStandardDisabled}
        />
      </Step>
      <Step
        header="3. Kurier gabaryt"
        description="Dla kasetonów, gdzie suma szerokości i wysokości nie przekracza 270 cm."
      >
        <FieldCheckbox
          radio
          name="shipping-package1"
          label="Kurier gabaryt"
          value={shipping.method === SHIPPING.PACKAGE_OVERLOAD}
          onChange={() => dispatch(setShippingMethod(SHIPPING.PACKAGE_OVERLOAD))}
          price={priceList[SHIPPING.PACKAGE_OVERLOAD]}
          disabled={packageOverloadDisabled}
        />
      </Step>
      <Step
        header="4. Dowóz w Warszawie i okolicach"
        description="Stała kwota za dowóz w promieniu 40km od centrum Warszawy"
      >
        <FieldCheckbox
          radio
          name="shipping-localDelivery"
          label="Dowóz w Warszawie"
          value={shipping.method === SHIPPING.LOCAL_DELIVERY}
          onChange={() => dispatch(setShippingMethod(SHIPPING.LOCAL_DELIVERY))}
          price={priceList[SHIPPING.LOCAL_DELIVERY]}
        />
      </Step>
      <ShippingZipCode />
    </Grid>
  );
};

export default Shipping;
