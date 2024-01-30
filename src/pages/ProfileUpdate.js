import React, { useRef } from "react";
import './profile.css'
import { Button, Form, Row, Col } from "react-bootstrap";

const ProfileUpdate = (props) => {
  const newName = useRef();
  const newPhoto = useRef();
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
          emdisplayNameail: updatedName,
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
            localStorage.setItem("token", data.idToken);
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
    <Form className="pform">
      <Row className="g-3 m-3 text-center justify-content-center">
        <Col xs={2}>
          <Form.Label column="md">Full Name :</Form.Label>
        </Col>
        <Col xs={3}>
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
        <Col xs={3}>
          <Form.Control
            size="md"
            type="url"
            placeholder="Profile Photo URL"
            ref={newPhoto}
          />
        </Col>
        <Col xs={3}>
          <Button variant="outline-success" onClick={submitUpdate}>
            Submit
          </Button>
        </Col>
        <Col xs={3}>
          <Button variant="outline-danger" onClick={props.view}>
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileUpdate;
