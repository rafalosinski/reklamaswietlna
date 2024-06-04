import { createSlice } from '@reduxjs/toolkit';
import { PRODUCTS } from '../../src/configurator/utils/constants';

const initialState = {
  homeProduct: PRODUCTS.SINGLE_DIBOND,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setHomeProduct: (state, action) => {
      state.homeProduct = action.payload;
    },
  },
});

export const { setHomeProduct } = homeSlice.actions;

export default homeSlice.reducer;
