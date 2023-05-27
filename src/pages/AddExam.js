import React, { useState, useRef, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import authHeader from "../services/auth-header";
import { Container } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CourseService from "../services/courseServices";

export default function AddExam() {
  const checkBtn = useRef();

  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [examDate, setExamDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [examType, setExamType] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  const onChangeExamDate = (e) => {
    const examDate = e.target.value;
    setExamDate(examDate);
  };

  const onChangeStartTime = (e) => {
    const startTime = e.target.value;
    setStartTime(startTime);
  };

  const onChangeEndTime = (e) => {
    const endTime = e.target.value;
    setEndTime(endTime);
  };

  const onChangeExamType = (e) => {
    const examType = e.target.value;
    setExamType(examType);
  };

  const onChangeCourseName = (e) => {
    const courseName = e.target.value;
    setCourseName(courseName);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    let courseService = new CourseService();
    courseService.getCourses().then((result) => setCourses(result.data.data));
  }, []);

  const loadCourses = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/courses/getCourseById/${id}`,
      { headers: authHeader() }
    );
    setCourseName(result.data.courseName);
  };

  const addExam = (description, examDate, startTime, endTime, examType) => {
    return axios.post(
      `http://localhost:8080/api/exams/add/${id}`,
      {
        description: description,
        examDate: examDate,
        startTime: startTime,
        endTime: endTime,
        examType: examType,
        course: {
          id: courseId,
        },
      },
      { headers: authHeader() }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    if (startTime >= endTime) {
      alert("Exam end time cannot be earlier than the start time!");
      return;
    }

    // Geçmiş tarih kontrolü
    const today = new Date();
    const selectedDate = new Date(examDate);

    if (selectedDate < today) {
      alert("Geçmiş bir tarih seçilemez!");
      return;
    }

    addExam(description, examDate, startTime, endTime, examType, courses).then(
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
  };

  return (
    <div className="container">
      <Container>
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Add Exam</h2>
            <Form onSubmit={handleSubmit}>
              {!successful && (
                <div>
                  <Form.Group controlId="examName">
                    <Form.Label>Course Name:</Form.Label>
                    <Form.Control
                      type="text"
                      value={courseName}
                      onChange={onChangeCourseName}
                      isInvalid={!!errors.description}
                      disabled
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.courseName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="examDate">
                    <Form.Label column sm={2}>
                      Exam Date:
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={examDate}
                      onChange={onChangeExamDate}
                      isInvalid={!!errors.examDate}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.examDate}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Row} style={{ marginTop: 12 }}>
                    <Form.Label column sm={2}>
                      Start Time:
                    </Form.Label>
                    <Col sm={3}>
                      <Form.Control
                        type="time"
                        value={startTime}
                        onChange={onChangeStartTime}
                        isInvalid={!!errors.startTime}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.startTime}
                      </Form.Control.Feedback>
                    </Col>
                    <Form.Label column sm={2}>
                      End Time:
                    </Form.Label>
                    <Col sm={3}>
                      <Form.Control
                        type="time"
                        value={endTime}
                        onChange={onChangeEndTime}
                        isInvalid={!!errors.endTime}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.endTime}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>

                  <Form.Group controlId="examType">
                    <Form.Label>Exam Type:</Form.Label>
                    <Form.Control
                      as="select"
                      value={examType}
                      onChange={onChangeExamType}
                      isInvalid={!!errors.examType}
                      placeholder="Select Exam Type"
                    >
                      <option value="" selected disabled hidden>
                        Select exam type
                      </option>
                      <option value="Midterm">Midterm</option>
                      <option value="Final">Final</option>
                      <option value="Quiz">Quiz</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.examType}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    htmlFor="description"
                    className="form-label"
                    controlId="description"
                  >
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                      as={"textarea"}
                      type="text"
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={onChangeDescription}
                      isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="form-group mt-4" style={{ marginLeft: 375 }}>
                    <Link
                      className="btn btn-outline-danger mx-2"
                      to="/courses/listall"
                    >
                      Cancel
                    </Link>
                    <button type="submit" className="btn btn-outline-primary">
                      Submit
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
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
}
