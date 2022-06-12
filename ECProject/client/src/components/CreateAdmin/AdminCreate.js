import React, { useState } from "react";
import { Form, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import RedButton from "../Button/Redbutton";

const AdminCreate = () => {
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    name: "",
    email: "",
    pass: "",
    room: "",
    tv: "",
    centerId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const { name, email, pass, room, tv, centerId } = info;
    try {
      const res = await fetch(
        "http://theghaplaman.herokuapp.com/api/v1/admin/new-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: name,
            email,
            pass,
            roomNumber: room,
            totalVoter: tv,
            centerId,
          }),
        }
      );

      const data = await res.json();
      console.log(data);
      if (!data || res.status === 403) {
        alert(data.message);
      }
      if (data.status === "success") {
        navigate("/admin/login");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="text-center">
          <Link to="/" className="text   display-6 fw-bold">
            Back to home
          </Link>
        </div>
        <div className="row">
          <div className="col-xl-8 mx-auto">
            <Form onSubmit={formSubmit}>
              <Row className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={info.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={info.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="pass"
                    value={info.pass}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Room No</Form.Label>
                  <Form.Control
                    type="number"
                    name="room"
                    value={info.room}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Total Voter</Form.Label>
                  <Form.Control
                    type="number"
                    name="tv"
                    value={info.tv}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Center</Form.Label>
                  <Form.Control
                    type="text"
                    name="centerId"
                    value={info.centerId}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  className="btn_shadow"
                  style={{
                    backgroundColor: "#CF8181",
                    color: "#000",
                  }}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCreate;