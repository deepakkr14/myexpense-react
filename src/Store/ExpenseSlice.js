import { createSlice } from "@reduxjs/toolkit";
const ExpenseSlice = createSlice({
    name: "expenses",
    initialState: {total:0,
    allExpenses:[],},
    reducers: {
      addExpense(state,action) {
        state.allExpenses.push(action.payload);
        state.total+=Number(action.payload.Amount);
      },
      deleteExpense(state,action) {
      const existing=  state.allExpenses.findIndex(each=> each.id===action.payload);
        state.allExpenses.filter(existing);
        state.total-=state.allExpenses[existing].Amount;
       
      },
    },
  });
  export const ExpenseActions=ExpenseSlice.actions;
 
  // const store = configureStore({ reducer:AuthSlice.reducer });
  export default ExpenseSlice.reducer;