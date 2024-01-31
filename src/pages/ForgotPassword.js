import React, { Fragment, useRef } from "react";
import { NavLink, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const emailInput = emailRef.current.value;
    await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCAddUzy56S_Fd9ynLhR2NrwXQPUB1M2i8",
        {
          method: "POST",
          body: JSON.stringify({
            "requestType":"PASSWORD_RESET",          
            "email":emailInput,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json().then((data) => {
              alert(`Link sent succesfully`);
              navigate("/")
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
          alert(err.message);
        });
  };
  return (
    <Fragment>
      <div className="row justify-content-center mt-5 ">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
          <div className="card border border-light-subtle rounded-4">
            <div className="card-body p-3 p-md-4 p-xl-5">
              <div className="row">
                <div className="col-12">
                  <div className="mb-5">
                    <h2 className="h4 text-center">Reset Password</h2>
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
                      
                        ref={emailRef}
                      
                        required
                      />
                      <label htmlFor="email" className="form-label">
                        Enter Registered Email
                      </label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="d-grid">
                      <Button
                        className="btn bsb-btn-xl btn-primary"
                        type="submit"
                      >
                        Send link
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
              <div className="row">
                <div className="col-12">
                  <hr className="mt-2 mb-2 border-secondary-subtle" />
                  <p className="m-0 text-secondary text-center">
                    {/* {isLoginPage
                    ? "Don't have a account? "
                    : "Already have an account? "} */}
                    {/* <NavLink
                    className="link-primary text-decoration-none"
                    onClick={switchAuthModeHandler}
                  >
                    {isLoginPage ? "Create new" : "Sign in"}
                  </NavLink> */}

                    <NavLink onClick={() => navigate("/")}>
                      <u>Login</u>
                    </NavLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
