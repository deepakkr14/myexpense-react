import { createSlice } from "@reduxjs/toolkit";
const initialState = { IsloggedIn:!! localStorage.getItem('token'), token: localStorage.getItem('token'), userId:localStorage.getItem('username') ,ispremium:false ,theme:false };
const AuthSlice = createSlice({
  name: "authenticate",
  initialState: initialState,
  reducers: {
    login(state,action) {
      state.IsloggedIn = true;
      state.token = action.payload.token;
      state.userId=action.payload.userId
    },
    logOut(state) {
      state.IsloggedIn = false;
      state.token = null;
      state.ispremium=false;
      state.theme=false;
      state.userId=null
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
