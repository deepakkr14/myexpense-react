import { createSlice } from "@reduxjs/toolkit";
const initialState = { IsloggedIn: false, token: null, userId: 1,ispremium:false ,theme:false };
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
      state.ispremium=false;
      state.theme=false;
    },
    premiumActivate(state){
      state.ispremium=true;
    },
    setTheme(state){
      state.theme=!state.theme;
    }
  },
});
export const AuthActions = AuthSlice.actions;

export default AuthSlice.reducer;
