import React from "react";
const ExpenseContext=React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}, 
    items:[],
    addItem:(item)=>{},
    removeItem:(id)=>{},

})

export default ExpenseContext