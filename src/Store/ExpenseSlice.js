import { createSlice } from "@reduxjs/toolkit";
const ExpenseSlice = createSlice({
  name: "expenses",
  initialState: { total: 0, allExpenses: [],allIncome:0 },
  reducers: {
    addExpense(state, action) {
      state.allExpenses=(action.payload.exp);
      let sum=0
      console.log(action.payload)
      action.payload.exp.map((item) =>sum+=Number(item[1].Amount));
      state.total=sum
      let inc=0
      action.payload.inc.map((item) =>inc+=Number(item[1].IncAmount));

      state.allIncome=inc
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
