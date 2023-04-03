import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  const [data, setData] = useState([]);

  useEffect( () => {
    axios.get(`http://localhost:3456/get/${id}`)
        .then(res => {
            setData(res.data);
        })
  }, []);

  return (
    <>
      <Button
        variant="outline-danger"
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
        style={{ float: "right" }}
      >
        Logout
      </Button>

        <Container>
            <img src={data.img} alt="error"/>
        </Container>
    </>
  );
}
