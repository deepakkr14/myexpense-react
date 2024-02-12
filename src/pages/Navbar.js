import React, { Fragment, useState, lazy } from "react";
import { NavLink, Navbar, Nav, Container, Button } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
import { PersonCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {useDispatch} from 'react-redux'
import { AuthActions } from "../Store/AuthSlice";


const ProfileUpdate = lazy(() => import("./ProfileUpdate"));
const Navigationbar = () => {
  const dispatch= useDispatch();
  const [profileForm, setprofileForm] = useState(false);
  const viewform = () => {
    setprofileForm(!profileForm);
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(AuthActions.logOut())
    navigate("/");
  };
  return (
    <Fragment>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container className="d-flex ">
          <Navbar.Brand href="#home">
            {" "}
            <img
              src="https://img.icons8.com/?size=64&id=UoH7S4w6ABOj&format=png"
              width="50"
              height="50"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href="#home">My Expense</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <NavLink >
                <PersonCircle size={50} className="mx-2" onClick={viewform} />
              </NavLink>
            </Nav>
            <Button className="mx-2" variant="outline-danger" onClick={logout}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {profileForm && <ProfileUpdate view={viewform} />}
    </Fragment>
  );
};

export default Navigationbar;
