import { createSlice } from "@reduxjs/toolkit";
const ExpenseSlice = createSlice({
  name: "expenses",
  initialState: { total: 0, allExpenses: [] },
  reducers: {
    addExpense(state, action) {
      state.allExpenses=(action.payload);
      let sum=0
      action.payload.map((item) =>sum+=Number(item[1].Amount));
      state.total=sum
    },
    deleteExpense(state, action) {
     
      state.allExpenses=[];
      state.total = 0;
    },
  },
});
export const ExpenseActions = ExpenseSlice.actions;

// const store = configureStore({ reducer:AuthSlice.reducer });
export default ExpenseSlice.reducer;
