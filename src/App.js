import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import Home from "./components/Home";
import Login2 from "./components/Login2";
import Register from "./components/Register";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import BoardTeacher from "./components/BoardTeacher";
import BoardStudent from "./components/BoardStudent";
import ListTeachers from "./pages/ListTeachers";
import RegisterTeacher from "./pages/RegisterTeacher";
import ListStudents from "./pages/ListStudents";
import RegisterStudent from "./pages/RegisterStudent";
import EditTeacher from "./pages/EditTeacher";
import EditStudent from "./pages/EditStudent";
import { Icon } from "semantic-ui-react";
import ListCourses from "./pages/ListCourses";
import StudentCourseList from "./pages/StudentCourseList";
import AddCourse from "./pages/AddCourse";
import ListExams from "./pages/ListExams";
import AddExam from "./pages/AddExam";
import AddCourseToStudent from "./pages/AddCourseToStudent";
import StudentExamList from "./pages/StudentExamList";
import TeacherCourseList from "./pages/TeacherCourseList";
import TeacherExamList from "./pages/TeacherExamList";
import EditExam from "./pages/EditExam";

const App = () => {
  const [showTeacherBoard, setShowTeacherBoard] = useState(false);
  const [showStudentBoard, setShowStudentBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();
  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowTeacherBoard(currentUser.roles.includes("ROLE_TEACHER"));
      setShowStudentBoard(currentUser.roles.includes("ROLE_STUDENT"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowTeacherBoard(false);
      setShowStudentBoard(false);
      setShowAdminBoard(false);
    }
  }, [currentUser]);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-nav ml-auto" style={{ marginLeft: 140 }}>
            <Link to={"/"} className="navbar-brand">
              <Icon name="calendar alternate"></Icon>
              ESMS
            </Link>

            <div className="navbar-nav-home mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
            </div>

            {showTeacherBoard && (
              <li className="nav-item">
                <Link to={"/teachers"} className="nav-link">
                  Teacher Board
                </Link>
              </li>
            )}

            {showTeacherBoard && (
              <li className="nav-item">
                <Link
                  to={`/teacher/${currentUser.id}/courses`}
                  className="nav-link"
                >
                  My Courses
                </Link>
              </li>
            )}

            {showTeacherBoard && (
              <li className="nav-item">
                <Link
                  to={`/teacher/${currentUser.id}/exams`}
                  className="nav-link"
                >
                  My Exams
                </Link>
              </li>
            )}

            {showStudentBoard && (
              <li className="nav-item">
                <Link to={"/students"} className="nav-link">
                  Student Board
                </Link>
              </li>
            )}

            {showStudentBoard && (
              <li className="nav-item">
                <Link
                  to={`/exams/student/${currentUser.id}`}
                  className="nav-link"
                >
                  Exams
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Container fluid>
                  <Navbar.Toggle aria-controls="navbar-dark-example" />
                  <Navbar.Collapse id="navbar-dark-example">
                    <Nav>
                      <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="Teacher"
                        menuVariant="dark"
                      >
                        <NavDropdown.Item as={NavLink} to="/teachers/listall">
                          List All
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={NavLink} to="/teacher/add">
                          Add Teacher
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Container fluid>
                  <Navbar.Toggle aria-controls="navbar-dark-example" />
                  <Navbar.Collapse id="navbar-dark-example">
                    <Nav>
                      <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="Student"
                        menuVariant="dark"
                      >
                        <NavDropdown.Item as={NavLink} to="/students/listall">
                          List All
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={NavLink} to="/student/add">
                          Add Student
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Container fluid>
                  <Navbar.Toggle aria-controls="navbar-dark-example" />
                  <Navbar.Collapse id="navbar-dark-example">
                    <Nav>
                      <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="Course"
                        menuVariant="dark"
                      >
                        <NavDropdown.Item as={NavLink} to="/courses/listall">
                          List All
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={NavLink} to="/course/add">
                          Add Course
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Container fluid>
                  <Navbar.Toggle aria-controls="navbar-dark-example" />
                  <Navbar.Collapse id="navbar-dark-example">
                    <Nav>
                      <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="Exam"
                        menuVariant="dark"
                      >
                        <NavDropdown.Item as={NavLink} to="/exams/listall">
                          List All
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto" style={{ marginRight: 200 }}>
              <li className="nav-item" style={{ textTransform: "capitalize" }}>
                <Link to={"/profile"} className="nav-link">
                  <span className="username" style={{ marginRight: 6 }}>
                    {currentUser.username}
                  </span>
                  <AiOutlineUser className="user-icon" size={20} />
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  <span className="logOut" style={{ marginRight: 6 }}>
                    LogOut
                  </span>
                  <RiLogoutBoxLine size={20} />
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto" style={{ marginRight: 200 }}>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              {/* <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li> */}
            </div>
          )}
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login2 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/teachers" element={<BoardTeacher />} />
          <Route path="/teachers/listall" element={<ListTeachers />} />
          <Route path="/teacher/add" element={<RegisterTeacher />} />
          <Route path="/teacher/edit/:id" element={<EditTeacher />} />
          <Route path="/teacher/:id/courses" element={<TeacherCourseList />} />
          <Route path="/teacher/:id/exams" element={<TeacherExamList />} />
          <Route path="/students" element={<BoardStudent />} />
          <Route path="/students/listall" element={<ListStudents />} />
          <Route path="/student/add" element={<RegisterStudent />} />
          <Route
            path="/student/addCourse/:id"
            element={<AddCourseToStudent />}
          />
          <Route path="/student/edit/:id" element={<EditStudent />} />
          <Route path="/exam/edit/:id" element={<EditExam />} />
          <Route path="/student/:id/courses" element={<StudentCourseList />} />
          <Route path="/exams/student/:id" element={<StudentExamList />} />
          <Route path="/courses/listall" element={<ListCourses />} />
          <Route path="/course/add" element={<AddCourse />} />
          <Route path="/exams/listall" element={<ListExams />} />
          <Route path="/exam/add/:id" element={<AddExam />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
