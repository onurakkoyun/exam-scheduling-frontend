import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from "axios";
import authHeader from "./../services/auth-header";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger mt-1" role="alert">
        This field is required!
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

const vfaculty = (value) => {
  if (value.length < 3 || value.length > 40) {
    return (
      <div className="alert alert-danger mt-1" role="alert">
        The faculty name must be between 3 and 40 characters.
      </div>
    );
  }
};

const vdepartment = (value) => {
  if (value.length < 3 || value.length > 40) {
    return (
      <div className="alert alert-danger mt-1" role="alert">
        The department name must be between 3 and 40 characters.
      </div>
    );
  }
};

export default function EditStudent() {
  const form = useRef();
  const checkBtn = useRef();
  let navigate = useNavigate();

  const { id } = useParams();
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

  const updateStudent = (
    username,
    email,
    password,
    firstName,
    lastName,
    faculty,
    department,
    degree
  ) => {
    return axios.put(
      `http://localhost:8080/api/students/updateStudentById/${id}`,
      {
        username,
        email,
        password,
        firstName,
        lastName,
        faculty,
        department,
        degree,
      },
      { headers: authHeader() }
    );
  };

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

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/students/getStudentById/${id}`,
      { headers: authHeader() }
    );
    setUsername(result.data.username);
    setEmail(result.data.email);
    setFirstName(result.data.firstName);
    setLastName(result.data.lastName);
    setFaculty(result.data.faculty);
    setDepartment(result.data.department);
    setDegree(result.data.degree);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      updateStudent(
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
          navigate("/students/listall");
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
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h3 className="text-center m-4">Edit Student</h3>
          <img
            src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form onSubmit={handleUpdate} ref={form}>
            {!successful && (
              <div>
                <div className="form-group mb-3">
                  <label htmlFor="Username" className="form-label">
                    User name
                  </label>
                  <Input
                    type={"text"}
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    disabled
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="Email" className="form-label">
                    Email
                  </label>
                  <Input
                    type={"text"}
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    disabled
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="FirstName" className="form-label">
                    First name
                  </label>
                  <Input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter first name"
                    name="firstName"
                    value={firstName}
                    validations={[required, vfirstName]}
                    onChange={onChangeFirstName}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="LastName" className="form-label">
                    Last name
                  </label>
                  <Input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter last name"
                    name="lastName"
                    value={lastName}
                    validations={[required, vlastName]}
                    onChange={onChangeLastName}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="Password" className="form-label">
                    Password
                  </label>
                  <Input
                    type={"password"}
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    value={password}
                    validations={[required, vpassword]}
                    onChange={onChangePassword}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="Faculty" className="form-label">
                    Faculty
                  </label>
                  <Input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter branch"
                    name="faculty"
                    value={faculty}
                    onChange={onChangeFaculty}
                    validations={[required, vfaculty]}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="Department" className="form-label">
                    Department
                  </label>
                  <Input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter department"
                    name="department"
                    value={department}
                    onChange={onChangeDepartment}
                    validations={[required, vdepartment]}
                  />
                </div>

                <div className="form-group mb-3" role="group">
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
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-outline-primary"
                    style={{ marginLeft: 460 }}
                  >
                    Submit
                  </button>
                  <Link
                    className="btn btn-outline-danger mx-2"
                    to="/students/listall"
                  >
                    Cancel
                  </Link>
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
    </div>
  );
}
