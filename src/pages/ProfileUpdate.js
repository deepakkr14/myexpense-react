import React, { useEffect, Fragment, useState } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Row, Col } from "react-bootstrap";
import {useSelector} from 'react-redux'
const ProfileUpdate = (props) => {
  const Navigate=useNavigate()
  const [Email, setEmail] = useState("");
  const [emailStatus, Verified] = useState(false);
  const [newName, setName] = useState("");
  const [newPhoto, setPhoto] = useState("");
  const [imageRef, setUrl] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const token=useSelector(state=>state.auth.token)
  const nameChangeHandler = (event) => setName(event.target.value);
  const photoChangeHandler = (event) => setPhoto(event.target.value);
  useEffect(() => {
    (async () => {
      try {
        console.log("Use effect running");
        const data = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCAddUzy56S_Fd9ynLhR2NrwXQPUB1M2i8",
          { idToken:token}
          // { idToken: localStorage.getItem("token") }
        );
        // console.log(data.data.users[0]);
        setName(data.data.users[0].displayName);
        setPhoto(data.data.users[0].photoUrl);
        setUrl(
          data.data.users[0].photoUrl ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        );
        setEmail(data.data.users[0].email);
        Verified(data.data.users[0].emailVerified);
      } catch (error) {
        console.log(error);
        if (error.response.data.error.message === "INVALID_ID_TOKEN")
          alert("INVALID_ID_TOKEN");
        window.location = "/";
      }
    })();
    //  fetchData()
  }, [Email,token]);
  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCAddUzy56S_Fd9ynLhR2NrwXQPUB1M2i8",
        {
          idToken: token,
          // idToken: localStorage.getItem("token"),
          displayName: newName,
          photoUrl: newPhoto,
          returnSecureToken: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        alert(`user details has succesfully  updated`);
        setEmail(response.data.email);
      }
    } catch (error) {
      console.log(error);
      alert("Error in updating user information");
      window.location = "/hero";
    }
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
                onClick={()=>Navigate('/verify')}
                disabled={emailStatus}
              >
                {emailStatus ? "Email Verified" : "Verify Email Incomplete"}
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
