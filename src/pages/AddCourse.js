import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from "axios";
import authHeader from "./../services/auth-header";
import { Container, Select } from "semantic-ui-react";
import TeacherService from "./../services/teacherService";

const required = (value) => {
  if (!value || value === "") {
    return (
      <div className="alert alert-danger mt-1" role="alert">
        This field is required!
      </div>
    );
  }
};

const vcoursename = (value) => {
  if (value.length < 3 || value.length > 50) {
    return (
      <div className="alert alert-danger mt-1" role="alert">
        The course name must be between 3 and 20 characters.
      </div>
    );
  }
};

const vcoursecode = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger mt-1" role="alert">
        The course code must be between 3 and 20 characters.
      </div>
    );
  }
};

const vteacherusername = (value) => {
  if (value.text === "") {
    return (
      <div className="alert alert-danger mt-1" role="alert">
        The course code must be between 3 and 20 characters.
      </div>
    );
  }
};

export default function AddCourse() {
  const form = useRef();
  const checkBtn = useRef();

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("COU");
  const [teacherId, setTeacherId] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeCourseName = (e) => {
    const courseName = e.target.value;
    setCourseName(courseName);
  };

  const onChangeCourseCode = (e) => {
    const courseCode = e.target.value;
    setCourseCode(courseCode);
  };
  const onChangeTeacherId = (e, data) => {
    const teacherId = data.value;
    setTeacherId(teacherId);
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  useEffect(() => {
    let teacherService = new TeacherService();
    teacherService
      .getTeachers()
      .then((result) => setTeachers(result.data.data));
  }, []);

  const loadTeachers = async () => {
    let teacherService = new TeacherService();
    teacherService
      .getTeachers()
      .then((result) => setTeachers(result.data.data));
  };

  const addCourse = (courseName, courseCode) => {
    return axios.post(
      "http://localhost:8080/api/courses/add",
      {
        courseName: courseName,
        courseCode: courseCode,
        teacher: {
          id: teacherId,
        },
      },
      { headers: authHeader() }
    );
  };

  const options = teachers.map((teacher) => {
    return {
      key: teacher.id,
      value: teacher.id,
      text: teacher.username,
    };
  });

  const handleCourseRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      addCourse(courseName, courseCode, teachers).then(
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
    <div className="container">
      <Container>
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Add Course</h2>
            <Form onSubmit={handleCourseRegister} ref={form}>
              {!successful && (
                <div>
                  <div className="form-group mb-3">
                    <label htmlFor="courseCode" className="form-label">
                      Course code
                    </label>
                    <Input
                      type={"text"}
                      className="form-control"
                      placeholder="Example: COU123"
                      name="courseCode"
                      validations={[required, vcoursecode]}
                      value={courseCode}
                      onChange={onChangeCourseCode}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="courseName" className="form-label">
                      Course name
                    </label>
                    <Input
                      type={"text"}
                      className="form-control"
                      placeholder="Enter course name"
                      name="courseName"
                      validations={[required, vcoursename]}
                      value={courseName}
                      onChange={onChangeCourseName}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="teacherId" className="form-label">
                      Teacher username
                    </label>

                    {/* <Form.Field>
                      <label>Teacher</label>
                      <Select
                        value={teacherId}
                        onChange={(event, data) => setTeacherId(data.value)}
                        options={teachers.map((teacher) => ({
                          key: teacher.id,
                          value: teacher.id,
                          text: teacher.name,
                        }))}
                        placeholder="Select a teacher"
                      />
                    </Form.Field> */}
                    <Select
                      className="form-control"
                      name="teacherId"
                      placeholder="Select a Teacher"
                      onChange={onChangeTeacherId}
                      validations={[required, vteacherusername]}
                      value={teacherId}
                      options={options}
                      compact
                      scrolling
                      selection
                      clearable
                      search
                      fluid
                    ></Select>

                    {/* <select
                      value={teacherId}
                      onChange={onChangeTeacherId}
                      validations={[required, vteacherusername]}
                    >
                      <option value="">Select a teacher</option>
                      {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.username}
                        </option>
                      ))}
                    </select> */}
                  </div>

                  <div className="form-group mt-4">
                    <button
                      type="submit"
                      className="btn btn-outline-primary"
                      style={{ marginLeft: 375 }}
                    >
                      Submit
                    </button>
                    <Link
                      className="btn btn-outline-danger mx-2"
                      to="/courses/listall"
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
                      message === "Course added."
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
      </Container>
    </div>
  );
}
