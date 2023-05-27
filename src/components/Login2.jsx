import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "./../services/authUser.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { Button, Grid, Header, Image, Segment } from "semantic-ui-react";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger mt-1" role="alert">
        This field is required!
      </div>
    );
  }
};

export default function Login2() {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/home");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      <Grid
        textAlign="center"
        style={{ height: "70vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header
            as="h1"
            content="Exam Scheduling Management System"
            color="teal"
            style={{ marginBottom: 20 }}
          />
          <Header as="h2" color="teal" textAlign="center">
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
              className="profile-img-card mb-3"
            />
            Log-in to your account
          </Header>
          <Form onSubmit={handleLogin} size="large" ref={form}>
            <Segment stacked>
              <div className="form-group">
                <Input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Enter your username"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                />
              </div>

              <Input
                className="form-control"
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />

              <Button
                color="teal"
                primary
                fluid
                disabled={loading}
                type="submit"
                className="d-grid gap-2 col-12 mx-auto mt-3"
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </Button>

              {message && (
                <div className="form-group">
                  <div
                    className="alert alert-danger mt-2"
                    role="alert"
                    style={{ textAlign: "center" }}
                  >
                    {message}
                  </div>
                </div>
              )}
            </Segment>
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
}
