import React, { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from "axios";
import authHeader from "./../services/auth-header";
import { Container, Select } from "semantic-ui-react";
import CourseService from "./../services/courseServices";

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
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger mt-1" role="alert">
        The course name must be between 3 and 20 characters.
      </div>
    );
  }
};

export default function AddCourse() {
  const form = useRef();
  const checkBtn = useRef();

  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeCourseId = (e, data) => {
    const courseId = data.value;
    setCourseId(courseId);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/students/getStudentById/${id}`,
      { headers: authHeader() }
    );
    setUsername(result.data.username);
  };

  useEffect(() => {
    let courseService = new CourseService();
    courseService.getCourses().then((result) => setCourses(result.data.data));
  }, []);

  const loadCourses = async () => {
    let courseService = new CourseService();
    courseService.getCourses().then((result) => setCourses(result.data.data));
  };

  const addCourse = () => {
    return axios.post(
      `http://localhost:8080/api/courseregistrations/${id}/course/${courseId}`,
      {
        student: {
          id: studentId,
        },
        course: {
          id: courseId,
        },
      },
      { headers: authHeader() }
    );
  };

  const options = courses.map((course) => {
    return {
      key: course.id,
      value: course.id,
      text: course.courseName,
    };
  });

  const handleCourseRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      addCourse(courses, students).then(
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
            <h2 className="text-center m-2">Add Course to Student</h2>
            <Form onSubmit={handleCourseRegister} ref={form}>
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
                      disabled
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="courseName" className="form-label">
                      Course name
                    </label>

                    <Select
                      className="form-control"
                      name="courseId"
                      placeholder="Select a Course"
                      onChange={onChangeCourseId}
                      value={courseId}
                      options={options}
                      compact
                      scrolling
                      selection
                      clearable
                      search
                      fluid
                    ></Select>
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
                      message ===
                      "The student has been registered for the course."
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
