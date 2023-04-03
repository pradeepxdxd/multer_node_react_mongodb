import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import Home from "./Home";


function Auth() {
  const [imgPath, setImgPath] = useState({});
  const navigate = useNavigate();

  const handleFile = (e) => {
    setImgPath(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const data = new FormData(e.currentTarget);
    formData.append("password", data.get("password"));
    formData.append("email", data.get("email"));
    formData.append("avatar", imgPath);

    const resp = await axios.post("http://localhost:3456/post", formData);
    if(resp.status === 201){
        alert("Resgisteration Successfull");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const formData = {
      email : data.get("email1"),
      password : data.get("password1"),
    }

    const resp = await axios.post("http://localhost:3456/login", formData);
    
    if(resp.status === 200){
        localStorage.setItem("id", resp.data.user._id)
      alert("Login Successfully");
      navigate("/home");
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <h2 className="text-center">Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  name="email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  required
                  type="file"
                  name="avatar"
                  onChange={handleFile}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col>
            <h2 className="text-center">Sign In</h2>
            <Form onSubmit={handleLoginSubmit}>
              <Form.Group className="mb-3" controlId="Email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  name="email1"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Name">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter Password"
                  name="password1"
                />
              </Form.Group>
              <Button variant="danger" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Auth;
