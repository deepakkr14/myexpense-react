import React from "react";
import "./theme.css";
import { useDispatch } from "react-redux";
import { AuthActions } from "../Store/AuthSlice";
const Theme = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          onClick={() => dispatch(AuthActions.setTheme())}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default Theme;
