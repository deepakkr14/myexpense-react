import React, { useRef, useState } from "react";
import { Form, Button, NavLink} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Singup = () => {
   const [isLogin, setIsLogin] = useState(true);
   const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const passwordRef=useRef()
  const emailRef=useRef()
  const cnfPasswordRef=useRef()


  const handleSubmit = (e) => {
    e.preventDefault();
    const emailInput=emailRef.current.value;
    const passwordInput=passwordRef.current.value;
    const cnfPassword=cnfPasswordRef.current.value;
    if(cnfPassword!==passwordInput)alert('bhago')
    console.log(emailInput,passwordInput,cnfPassword);
  
    let  url;
    if (isLogin) {
       url ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAddUzy56S_Fd9ynLhR2NrwXQPUB1M2i8";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAddUzy56S_Fd9ynLhR2NrwXQPUB1M2i8";
      }
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
          
        console.log(`user has succesfully  ${isLogin ?  'Signed up':'Logged in' }`)
              // Navigate('/products');
            });
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed!";
              // if (data && data.error && data.error.message) {
              //   errorMessage = data.error.message;
              // }
  
              throw new Error(errorMessage);
            });
          }
        })
  
        .catch((err) => {
          alert(err.message);
        });
    };


  return (
    <Form className="m-5" onSubmit={handleSubmit}>
      <h2>{isLogin ? "Sing Up"  : "Sign In"}</h2>
      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email"  
              ref={emailRef}
            placeholder="Enter email"
            required/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" 
         ref={passwordRef}
          placeholder="Enter password"
          required/>
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label> Confirm Password</Form.Label>
        <Form.Control type="password" 
            ref={cnfPasswordRef}
          placeholder="Confirm password"
          required/>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <NavLink onClick={switchAuthModeHandler}><u>{isLogin ? "Already a user":"New user"  }</u></NavLink>
    </Form>

    
  );
};

export default Singup;
