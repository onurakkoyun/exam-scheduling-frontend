import React, { useState, useEffect } from "react";
import { Button, Container, Icon, Menu, Table } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import authHeader from "./../services/auth-header";
import CourseService from "./../services/courseServices";
import "../pages/customTable.css";

export default function ListCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    let courseService = new CourseService();
    courseService.getCourses().then((result) => setCourses(result.data.data));
  }, []);

  const loadCourses = async () => {
    let courseService = new CourseService();
    courseService.getCourses().then((result) => setCourses(result.data.data));
  };

  const deleteCourse = async (id) => {
    await axios.delete(`http://localhost:8080/api/courses/${id}`, {
      headers: authHeader(),
    });
    loadCourses();
  };

  return (
    <div>
      <Container>
        <Table className="custom-table" celled color="green" size="small">
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Course code</Table.HeaderCell>
              <Table.HeaderCell>Course name</Table.HeaderCell>
              <Table.HeaderCell>Teacher</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {courses.map((course, index) => (
              <Table.Row key={course.id} textAlign="center">
                <Table.Cell key={index}>{index + 1}</Table.Cell>
                <Table.Cell>{course.courseCode}</Table.Cell>
                <Table.Cell>{course.courseName}</Table.Cell>
                <Table.Cell>
                  {course.teacher.firstName}&nbsp;{course.teacher.lastName}
                </Table.Cell>

                <Table.Cell>
                  <Button.Group compact size="small">
                    <Button
                      circular
                      color="google plus"
                      onClick={() => deleteCourse(course.id)}
                      animated
                    >
                      Delete Course
                      <Icon name="delete" style={{ marginLeft: 3 }} />
                    </Button>

                    <Button
                      circular
                      color="green"
                      as={NavLink}
                      to={`/exam/add/${course.id}`}
                      animated
                    >
                      Add Exam to Course{" "}
                      <Icon name="add" style={{ marginLeft: 3 }} />
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    </div>
  );
}
