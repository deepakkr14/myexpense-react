import React, { useState } from "react";
import ExpenseContext from "./context";
export const ExpenseContextProvider = (props) => {
  const initialToken = localStorage.getItem("ExpenseToken");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [items, updateItems] = useState([]);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("ExpenseToken", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("ExpenseToken");
  };

  const addItemToCartHandler = (item) => {
    updateItems([...items, item]);
    // postCartData(item);
  };

  const removeItemFromHandler = (id) => {
    // alert(id)
    const updatedItems = items.filter((item) => item.id !== id);
    updateItems(updatedItems);
    // removeItem(id)
  };

  const contextValue = {
    token: token,
    logout: logoutHandler,
    items: items,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromHandler,
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
