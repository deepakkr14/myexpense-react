import React, { Fragment, lazy,Suspense } from "react";
import "./profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const ProfileUpdate = lazy(() => import("./ProfileUpdate"));
// import ProfileUpdate from "./ProfileUpdate";
const Hero = () => {
  const navigate=useNavigate()
  const [profileForm, setprofileForm] = useState(false);
  // const [Email, setEmail] = useState("");
  const viewform = () => {
    setprofileForm(!profileForm);
  };
const logout=()=>{
  localStorage.removeItem('token')
navigate('/')
}
  return (
    <Fragment>
      <Suspense fallback={<div>Loading...</div>}>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="https://img.icons8.com/?size=64&id=UoH7S4w6ABOj&format=png"
              width="50"
              height="50"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href="#home">My Expense</Navbar.Brand>
          <Nav className="d-flex">
            {/* <Nav.Link href="#features">Features</Nav.Link> */}
            <NavLink onClick={viewform}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="white"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
                style={{ display: "flex-end" }}
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            </NavLink>
            <Button className="mx-3" variant="outline-danger" onClick={logout}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <div className="hero ">
       
      <i>Welcome to expense tracker</i>
      </div>
      <hr />
      {profileForm && <ProfileUpdate view={viewform} />}
      </Suspense>
    </Fragment>
  );
};

export default Hero;
