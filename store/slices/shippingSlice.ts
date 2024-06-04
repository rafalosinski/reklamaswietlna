import { createSlice } from '@reduxjs/toolkit';
import { SHIPPING } from '../../src/configurator/utils/constants';

export const priceList = {
  PERSONAL: 0,
  LOCAL_DELIVERY: 100,
  COUNTRY_DELIVERY: 0,
  PACKAGE_STANDARD: 40,
  PACKAGE_OVERLOAD: 100,
  labels: {
    [SHIPPING.PERSONAL]: 'Odbiór osobisty',
    [SHIPPING.LOCAL_DELIVERY]: 'Dowóz w Warszawie i okolicach',
    [SHIPPING.PACKAGE_STANDARD]: 'Kurier standard',
    [SHIPPING.PACKAGE_OVERLOAD]: 'Kurier gabaryt',
    [SHIPPING.COUNTRY_DELIVERY]: 'Dowóz krajowy',
  },
};

const initialState = {
  method: SHIPPING.PERSONAL,
  currentPrice: 0,
  countryDeliveryPrice: 0,
  zipCode: '',
  distance: 0,
};

const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    setDistance: (state, action) => {
      const newDistance = Number(action.payload);
      let newPrice = Number(((newDistance / 1000) * 2 * 1.2).toFixed(2));
      newPrice < 100 ? (newPrice = 100) : '';
      state.countryDeliveryPrice = newPrice;
      state.distance = newDistance;
    },
    setZipCode: (state, action) => {
      state.zipCode = action.payload;
    },
    setShippingMethod: (state, action) => {
      state.method = action.payload;
      if (action.payload !== SHIPPING.COUNTRY_DELIVERY) {
        state.currentPrice = priceList[action.payload];
      } else {
        state.currentPrice = state.countryDeliveryPrice;
      }
    },
    resetShipping: () => initialState,
  },
});

export const { setShippingMethod, setZipCode, setDistance, resetShipping } = shippingSlice.actions;

export default shippingSlice.reducer;
