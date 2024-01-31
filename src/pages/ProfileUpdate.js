import React, { useRef, useEffect, Fragment, useState } from "react";
import "./profile.css";
import { Button, Form, Row, Col } from "react-bootstrap";

const ProfileUpdate = (props) => {
  const [Email, setEmail] = useState("");
  const newName = useRef();
  const newPhoto = useRef();
  const imageRef = useRef();
  const EmailVerified = !!Email;
  useEffect(() => {
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
        console.log(data);
        newPhoto.current.value = data.users[0].photoUrl || "";
        newName.current.value = data.users[0].displayName || "";
        imageRef.current.src =
          data.users[0].photoUrl ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
        setEmail(data.users[0].email);
      });
    // .catch((error)=>console.log(error))
  }, [Email]);
  const verifyEmail = async () => {
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
            alert(`user verified succesfully`);
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
  const submitUpdate = async (e) => {
    e.preventDefault();
    const updatedName = newName.current.value;
    const updatedPhoto = newPhoto.current.value;
    console.log("submitted", updatedName, updatedPhoto);
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCAddUzy56S_Fd9ynLhR2NrwXQPUB1M2i8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          displayName: updatedName,
          photoUrl: updatedPhoto,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            alert(`user details has succesfully  updated`);
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
      <Form className="pform ">
        <Row className=" m-1 text-center justify-content-center">
          <h2>My Profile</h2> 
          <h3>Registered Email :{Email}</h3>

          <Col xs={2} className="me-3">
            <img
              style={{ width: "110px", height: "120px" }}
              src=""
              ref={imageRef}
              alt="display"
            />
          </Col>
          <Col xs={2}>
            <Form.Label column="md">Full Name :</Form.Label>
          </Col>
          <Col xs={2}>
            <Form.Control
              size="md"
              type="text"
              placeholder="Full Name"
              ref={newName}
            />
          </Col>
          <Col xs={2}>
            <Form.Label column="md">Profile Photo URL :</Form.Label>
          </Col>
          <Col xs={2}>
            <Form.Control
              size="md"
              type="url"
              placeholder="Profile Photo URL"
              ref={newPhoto}
            />
          </Col>
          <Row className="mt-4 d-flex justify-content-end">
            <Col md={4}>
              <Button variant="outline-success" onClick={submitUpdate}>
                Submit
              </Button>
            </Col>
            <Col md={4}>
              <Button
                className={`Ebtn ${!EmailVerified ? "on" : "off"}`}
                variant="outline-primary"
                onClick={verifyEmail}
                disabled={EmailVerified}
              >
                {EmailVerified ? "Email Verified" : "Verify Email"}
              </Button>
            </Col>
            <Col md={4}>
              <Button variant="outline-danger" onClick={props.view}>
                Close
              </Button>
            </Col>
          </Row>
        </Row>
      </Form>
    </Fragment>
  );
};

export default ProfileUpdate;
