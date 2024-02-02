import React, { Fragment, lazy,Suspense } from "react";
import "./profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Navbar from "./Navbar";


// import ProfileUpdate from "./ProfileUpdate";
const Hero = () => {
  
  return (
    <Fragment>
      
      <Navbar />
      <div className="hero ">
       
      <i>Welcome to expense tracker</i>
      </div>
      <hr />
      {/* {profileForm && <ProfileUpdate view={viewform} />} */}
    
    </Fragment>
  );
};

export default Hero;
