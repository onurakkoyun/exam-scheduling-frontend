import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/authUser.service";
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

const RegisterStudent = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [counter, setCounter] = useState(0);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [degree, setDegree] = useState("");
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

  const onChangeFaculty = (e) => {
    const faculty = e.target.value;
    setFaculty(faculty);
  };

  const onChangeDepartment = (e) => {
    const department = e.target.value;
    setDepartment(department);
  };

  const onChangeDegree = (e) => {
    const degree = e.target.value;
    setDegree(degree);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.registerStudent(
        username,
        email,
        password,
        firstName,
        lastName,
        faculty,
        department,
        degree
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
        style={{ marginTop: 5, borderRadius: 20 }}
      >
        <img
          src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
          alt="profile-img"
          className="profile-img-card"
        />
        <Label style={{ textAlign: "center", marginBottom: 20, marginTop: 10 }}>
          Student Register Form
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
                <label htmlFor="faculty" style={{ marginLeft: 3 }}>
                  Faculty
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="faculty"
                  placeholder="Faculty"
                  value={faculty}
                  onChange={onChangeFaculty}
                />
              </div>

              <div className="form-group">
                <label htmlFor="department" style={{ marginLeft: 3 }}>
                  Department
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="department"
                  placeholder="Department"
                  value={department}
                  onChange={onChangeDepartment}
                />
              </div>

              <div className="form-group" role="group">
                <label htmlFor="department" style={{ marginLeft: 3 }}>
                  Degree
                </label>
                <Input
                  type="number"
                  name="degree"
                  min="1"
                  max="6"
                  value={degree}
                  onChange={onChangeDegree}
                  validations={[required]}
                  defaultValue={counter}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block d-grid gap-2 col-12 mx-auto mt-3">
                  Register Student
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

export default RegisterStudent;
