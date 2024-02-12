import { createSlice } from "@reduxjs/toolkit";
const initialState = { IsloggedIn: false, token: null, userId: 1 };
const AuthSlice = createSlice({
  name: "authenticate",
  initialState: initialState,
  reducers: {
    login(state,action) {
      state.IsloggedIn = true;
      state.token = action.payload;
    },
    logOut(state) {
      state.IsloggedIn = false;
      state.token = null;
    },
  },
});
export const AuthActions = AuthSlice.actions;

export default AuthSlice.reducer;
