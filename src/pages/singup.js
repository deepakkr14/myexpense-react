import React, { useRef, useState } from "react";
import { Form, Button, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Singup = () => {
  const Navigate = useNavigate();
  const passwordRef = useRef();
  const emailRef = useRef();
  const cnfPasswordRef = useRef();
  const forget = () => {
    Navigate("/forget");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailInput = emailRef.current.value;
    const passwordInput = passwordRef.current.value;
    // console.log(isLoginPage);
    let cnfPassword = cnfPasswordRef.current.value;
    if (cnfPassword !== passwordInput) {
      toast.error("password not matched");
    } else {
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAddUzy56S_Fd9ynLhR2NrwXQPUB1M2i8";
      // }
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json().then((data) => {
              toast.success("registred  successfully");
              Navigate("/");
            });
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <React.Fragment>
    <div className="row justify-content-center p-4 ">
      <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
        <div className="card border border-light-subtle rounded-4">
          <div className="card-body p-3 p-md-4 p-xl-5">
            <div className="row">
              <div className="col-12">
                <div className="mb-5">
                  <h2 className="h4 text-center">
                   Sign Up
                  </h2>
                </div>
              </div>
            </div>
            <Form onSubmit={handleSubmit}>
              <div className="row gy-3 overflow-hidden">
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      ref={emailRef}
                      placeholder="name@example.com"
                      required
                    />
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      ref={passwordRef}
                      placeholder="Password"
                      required
                    />
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="cnfpassword"
                      ref={cnfPasswordRef}
                      placeholder="Password"
                      required
                    />
                    <label htmlFor="password" className="form-label">
                      Confirm Password
                    </label>
                  </div>
                </div>

                <div className="col-12">
                  <div className="d-grid">
                    <Button
                      className="btn bsb-btn-xl btn-primary"
                      type="submit"
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              </div>
            </Form>

            <div className="row">
              <div className="col-12">
                <hr className="mt-2 mb-2 border-secondary-subtle" />
                <p className="m-0 text-secondary text-center">
                     Already have an account?
                     <NavLink
                    className="link-primary text-decoration-none"
                    onClick={() => Navigate("/")} >
                    Sign in
                  </NavLink>
                  <NavLink onClick={forget}>
                    <u>Forgot Password</u>
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
    </React.Fragment>
 )}

export default Singup;
