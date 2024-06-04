import { createSlice } from '@reduxjs/toolkit';

export const priceModifiers = {
  colorTiers: {
    tier1: {
      mod: 0.1,
      min: 50,
    },
    tier2: {
      mod: 0.05,
      min: 250,
    },
  },
  effect3D: 0.2,
  override: 0.05,
  lighting: 0.05,
  fastProduction: 0.4,
  tax: 1.23,
};

const initialState = {
  size: 0,
  sizeMin: 150,
  color: 0,
  colorTier1: 0,
  colorTier2: 0,
  colorMin: 50,
  lighting: 0,
  lightingMin: 50,
  effect3D: 0,
  override: 0,
  fastProduction: 0,
  totalNet: 0,
  totalGross: 0,
  duskSensor: 60,
  project: 100,
  revision: 100,
  discountTotal: 0,
};

const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    setPrices: (state, action) => {
      state.size = action.payload.sizePrice;
      state.color = action.payload.colorPrice;
      state.colorTier1 = action.payload.colorPriceTier1;
      state.colorTier2 = action.payload.colorPriceTier2;
      state.lighting = action.payload.lightingPrice;
      state.effect3D = action.payload.effect3DPrice;
      state.override = action.payload.overridePrice;
      state.fastProduction = action.payload.fastPrice;
      state.totalNet = action.payload.totalNet;
      state.totalGross = action.payload.totalGross;
      state.discountTotal = action.payload.discountTotal;
    },
    resetPrices: () => initialState,
  },
});

export const { setPrices, resetPrices } = pricesSlice.actions;

export default pricesSlice.reducer;
