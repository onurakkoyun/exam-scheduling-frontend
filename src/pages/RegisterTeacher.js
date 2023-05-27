import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "./../services/authUser.service";

import { Label } from "semantic-ui-react";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger mt-1" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger mt-1" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger mt-1" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger mt-1" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const vfirstName = (value) => {
  if (value.length < 3 || value.length > 40) {
    return (
      <div className="alert alert-danger mt-1" role="alert">
        The first name must be between 3 and 40 characters.
      </div>
    );
  }
};

const vlastName = (value) => {
  if (value.length < 3 || value.length > 40) {
    return (
      <div className="alert alert-danger mt-1" role="alert">
        The last name must be between 3 and 40 characters.
      </div>
    );
  }
};

const vbranch = (value) => {
  if (value.length < 3 || value.length > 40) {
    return (
      <div className="alert alert-danger mt-1" role="alert">
        The branch must be between 3 and 40 characters.
      </div>
    );
  }
};

const RegisterTeacher = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [branch, setBranch] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };

  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };

  const onChangeBranch = (e) => {
    const branch = e.target.value;
    setBranch(branch);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.registerTeacher(
        username,
        email,
        password,
        firstName,
        lastName,
        branch
      ).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div
        className="card card-container"
        style={{
          marginTop: 5,
          borderRadius: 20,
        }}
      >
        <img
          src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
          alt="profile-img"
          className="profile-img-card"
        />

        <Label
          style={{
            textAlign: "center",
            marginBottom: 20,
            marginTop: 10,
          }}
        >
          Teacher Register Form
        </Label>

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username" style={{ marginLeft: 3 }}>
                  Username
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="User name"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" style={{ marginLeft: 3 }}>
                  Email
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="joe@mail.com"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" style={{ marginLeft: 3 }}>
                  Password
                </label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="firstName" style={{ marginLeft: 3 }}>
                  First name
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="First name"
                  value={firstName}
                  onChange={onChangeFirstName}
                  validations={[required, vfirstName]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName" style={{ marginLeft: 3 }}>
                  Last name
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastName"
                  placeholder="Last name"
                  value={lastName}
                  onChange={onChangeLastName}
                  validations={[required, vlastName]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="branch" style={{ marginLeft: 3 }}>
                  Branch
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="branch"
                  placeholder="Branch"
                  value={branch}
                  onChange={onChangeBranch}
                  validations={[required, vbranch]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block d-grid gap-2 col-12 mx-auto mt-3">
                  Register Teacher
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful
                    ? "alert alert-success mt-2"
                    : "alert alert-danger mt-2"
                }
                role="alert"
                style={{ textAlign: "center" }}
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default RegisterTeacher;
