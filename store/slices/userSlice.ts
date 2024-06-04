import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    jwt: '',
    email: '',
    discount: 0,
  },
  reducers: {
    setJwt: (state, action) => {
      state.jwt = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.jwt = '';
      state.isLoggedIn = false;
      state.discount = 0;
    },
    setDiscount: (state, action) => {
      state.discount = Number(action.payload);
    },
  },
});

export const { setJwt, logout, setDiscount } = userSlice.actions;

export default userSlice.reducer;
