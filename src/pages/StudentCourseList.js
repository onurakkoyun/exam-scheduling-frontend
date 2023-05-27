import React, { useState, useEffect } from "react";
import { Button, Container, Icon, Menu, Table } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import authHeader from "../services/auth-header";
import StudentService from "./../services/studentService";

export default function StudentCourseList() {
  const { id } = useParams();
  const [courseRegistrations, setCoursesRegistrations] = useState([]);

  useEffect(() => {
    loadCourseRegistrations();
  }, []);

  useEffect(() => {
    let studentService = new StudentService();
    studentService
      .getStudentCourseList(id)
      .then((result) => setCoursesRegistrations(result.data.data));
  }, [id]);

  const loadCourseRegistrations = async () => {
    let studentService = new StudentService();
    studentService
      .getStudentCourseList(id)
      .then((result) => setCoursesRegistrations(result.data.data));
  };

  const deleteStudentCourse = async (id) => {
    await axios.delete(`http://localhost:8080/api/courseregistrations/${id}`, {
      headers: authHeader(),
    });
    loadCourseRegistrations();
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
            {courseRegistrations.map((courseRegistration, index) => (
              <Table.Row key={courseRegistration.id} textAlign="center">
                <Table.Cell key={index}>{index + 1}</Table.Cell>
                <Table.Cell>{courseRegistration.course.courseCode}</Table.Cell>
                <Table.Cell>{courseRegistration.course.courseName}</Table.Cell>
                <Table.Cell>
                  {courseRegistration.course.teacher.firstName}&nbsp;
                  {courseRegistration.course.teacher.lastName}
                </Table.Cell>

                <Table.Cell>
                  <Button.Group compact circular size="small">
                    <Button
                      color="google plus"
                      onClick={() => deleteStudentCourse(courseRegistration.id)}
                    >
                      <Icon name="delete" />
                      Delete Course
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
