import React, { Fragment } from "react";
import "./profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import ProfileUpdate from "./ProfileUpdate";
const Hero = () => {
  const [profileForm, setprofileForm] = useState(false);
  const viewform = () => {
    setprofileForm(!profileForm);
  };

  return (
    <Fragment>
      <div className="hero ">
        <i className="profile">
          your profile is incomplete{" "}
          <NavLink className="" size="sm" variant="link" onClick={viewform}>
            <i>Complete now</i>
          </NavLink>
        </i>
      </div>
      <i>Welcome to expense tracker</i>
      <hr />
      {profileForm && <ProfileUpdate view={viewform} />}
    </Fragment>
  );
};

export default Hero;
