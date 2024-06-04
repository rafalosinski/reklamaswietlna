import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoice: true,
  companyName: '',
  name: '',
  street: '',
  postalCode: '',
  city: '',
  nip: '',
  fullName: '',
  mobile: '',
  additionalInfo: '',
  shippingName: '',
  shippingAddress: '',
  shippingCode: '',
  shippingCity: '',
  shippingMobile: '',
  sameAddress: false,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    toggleInvoice: (state) => {
      state.invoice = !state.invoice;
    },
    toggleSameAddress: (state) => {
      state.sameAddress = !state.sameAddress;
    },
    resetAddress: () => initialState,
  },
});

export const { setAddress, toggleInvoice, toggleSameAddress, resetAddress } = addressSlice.actions;

export default addressSlice.reducer;
