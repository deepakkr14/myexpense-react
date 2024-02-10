import React, { useEffect, useState, Fragment } from "react";
import {  Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EmailVerification = () => {
  const Navigate = useNavigate();
  const [inProgress, setInProgress] = useState(false);
  const emailVerification = async () => {
    //send verification mail to the user's email id and redirect to login page
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCAddUzy56S_Fd9ynLhR2NrwXQPUB1M2i8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          requestType: "VERIFY_EMAIL",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            console.log(data);
            alert(`link sent succesfully`);
            setInProgress(true);
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
  const autoDetect = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCAddUzy56S_Fd9ynLhR2NrwXQPUB1M2i8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.users[0].emailVerified) {
          Navigate("/hero");
          setInProgress(false);
        }
      });
  };
  useEffect(() => {
    if (inProgress) {
      const timeout = setInterval(() => {
        autoDetect();
        console.log("Timeout completed");
      }, 3000);
      return () => clearTimeout(timeout);
    }

    // Cleanup on unmount
  }, [inProgress]);

  return (
    <Fragment>
      <section className="p-5">
        <h2 style={{ fontFamily: "'Playfair Display', serif" }}>
          Congratulations on signing up!
        </h2>

        <p>
          To complete your registration and activate your account, we'll send a
          verification link to your email address. Please check your inbox (and
          the spam folder, just in case) for an email from us and click on the
          link provided to verify your email address. This step is crucial for
          ensuring the security of your account and gaining full access to our
          features and services.
        </p>
        <div>
          <Button className="my-3" onClick={emailVerification}>
            Send Link
          </Button>
          {inProgress && <div className="loader"></div>}
          <h5>Didn't receive the email?</h5>
          <p>
            Resend verification email{" "}
            <Button variant="link" onClick={emailVerification}>
              click here
            </Button>
          </p>
          <p>
            <Button variant="outline-danger" onClick={() => Navigate("/")}>
              Cancel
            </Button>
          </p>
        </div>
      </section>
    </Fragment>
  );
};

export default EmailVerification;
