import { createSlice } from '@reduxjs/toolkit';
import { PRODUCTS } from '../../src/configurator/utils/constants';

const initialState = {
  currentProduct: PRODUCTS.SINGLE_DIBOND,
  activeStep: 0,
  consent: false,
  stepError: false,
  orderPlaced: false,
  orderId: 0,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    incrementStep: (state) => {
      state.activeStep++;
    },
    decrementStep: (state) => {
      state.activeStep--;
    },
    toggleConsent: (state) => {
      state.consent = !state.consent;
    },
    setStepError: (state, action) => {
      state.stepError = action.payload;
    },
    setOrderPlaced: (state, action) => {
      state.orderPlaced = true;
      state.orderId = action.payload;
    },
    resetApp: () => initialState,
  },
});

export const {
  setProduct,
  incrementStep,
  decrementStep,
  toggleConsent,
  setStepError,
  setOrderPlaced,
  resetApp,
} = appSlice.actions;

export default appSlice.reducer;
