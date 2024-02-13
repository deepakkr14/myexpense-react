import React, { Fragment, useState, lazy } from "react";
import { NavLink, Navbar, Nav, Container, Button } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
import {  PersonCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {useDispatch,useSelector} from 'react-redux'
import { AuthActions } from "../Store/AuthSlice";
import { ExpenseActions } from "../Store/ExpenseSlice";
import ThemeToggle  from '../components/Theme'
import Download from "./Download";

const ProfileUpdate = lazy(() => import("./ProfileUpdate"));
const Navigationbar = () => {
  const dispatch= useDispatch();
  const total= useSelector(state=>state.expense.total)
  const ispremium= useSelector(state=>state.auth.ispremium)
  console.log(total)
  const [profileForm, setprofileForm] = useState(false);
  // const [buyPremium, setbuyPremium] = useState(false);
  // if(total>=10000){
  //   console.log('you can buy premium')
  //   // setbuyPremium(true)
  // }
  const viewform = () => {
    setprofileForm(!profileForm);
  };

  const navigate = useNavigate();
 const premium=()=>{
dispatch(AuthActions.premiumActivate())
 }
  const logout = () => {
    localStorage.removeItem("token");
    dispatch(AuthActions.logOut())
    dispatch(ExpenseActions.deleteExpense())

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
            { total>10000 && <Button className="mx-2" variant="outline-success" onClick={premium}>
              Use premium
            </Button>}
            {ispremium && <ThemeToggle/>}
            {ispremium && <Download/>}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {profileForm && <ProfileUpdate view={viewform} />}
    </Fragment>
  );
};

export default Navigationbar;
