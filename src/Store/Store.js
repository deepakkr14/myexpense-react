import {  configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import ExpenseReducer from "./ExpenseSlice";

const store = configureStore({
  reducer : {expense : ExpenseReducer,auth:AuthReducer},
});
export default store;
