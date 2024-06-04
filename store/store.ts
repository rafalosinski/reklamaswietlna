import { configureStore } from '@reduxjs/toolkit';

import configReducer from './slices/configSlice';
import addressReducer from './slices/addressSlice';
import shippingReducer from './slices/shippingSlice';
import appReducer from './slices/appSlice';
import pricesReducer from './slices/pricesSlice';
import userReducer from './slices/userSlice';
import homeReducer from './slices/homeSlice';

export default configureStore({
  reducer: {
    config: configReducer,
    address: addressReducer,
    shipping: shippingReducer,
    app: appReducer,
    prices: pricesReducer,
    user: userReducer,
    home: homeReducer,
  },
  devTools: false,
});
