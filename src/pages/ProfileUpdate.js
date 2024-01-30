import React, { useRef, useEffect, Fragment } from "react";
import "./profile.css";
import { Button, Form, Row, Col } from "react-bootstrap";

const ProfileUpdate = (props) => {
  const newName = useRef();
  const newPhoto = useRef();
  const imageRef = useRef();
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
        newPhoto.current.value = data.users[0].photoUrl;
        newName.current.value = data.users[0].displayName;
        imageRef.current.src = data.users[0].photoUrl;
      });
    // .catch((error)=>console.log(error))
  }, []);

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
        <Row className="g-3 m-1 text-center justify-content-center">
          <h3>Profile</h3>
          <Col xs={1} className="me-3">
            <img
              style={{ width: "110px", height: "120px" }}
              src=""
              ref={imageRef}
              alt="image"
            />
          </Col>
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
    </Fragment>
  );
};

export default ProfileUpdate;
