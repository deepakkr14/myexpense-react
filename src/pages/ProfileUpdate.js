import React, { useRef, useEffect, Fragment, useState } from "react";
import "./profile.css";
import { Button, Form, Row, Col } from "react-bootstrap";

const ProfileUpdate = (props) => {
  const [Email, setEmail] = useState("");
  const [emailStatus, Verified] = useState("");
  const [newName, setName] = useState("");
  const [newPhoto, setPhoto] = useState("");
  const [imageRef,setUrl] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const nameChangeHandler = (event) => setName(event.target.value);
 const photoChangeHandler = (event) => setPhoto(event.target.value);
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
        console.log(data)
        setName(data.users[0].displayName);
        setPhoto(data.users[0].photoUrl);
        setUrl(data.users[0].photoUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
        setEmail(data.users[0].email);
        Verified(data.users[0].emailVerified);
      });
  }, [Email]);
  const submitUpdate = async (e) => {
    e.preventDefault();
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCAddUzy56S_Fd9ynLhR2NrwXQPUB1M2i8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          displayName: newName,
          photoUrl: newPhoto,
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
            setEmail(data.email);
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
        console.log('submit update',err)
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
              src={imageRef}
              
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
              value={newName}
              onChange={nameChangeHandler}
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
              onChange={photoChangeHandler}
              value={newPhoto}
            />
          </Col>
          <Row className="mt-4 d-flex justify-content-end">
            <Col md={4}>
              <Button variant="outline-success" onClick={submitUpdate}>
                Update
              </Button>
            </Col>
            <Col md={4}>
              <Button
                className={`Ebtn ${!emailStatus ? "on" : "off"}`}
                variant="outline-primary"
                disabled={emailStatus}
              >
                {emailStatus ? "Email Verified" : "Verify Email"}
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
