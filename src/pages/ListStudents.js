import React, { useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { Button, Container, Icon, Menu, Table } from "semantic-ui-react";
import StudentService from "./../services/studentService";
import axios from "axios";
import authHeader from "./../services/auth-header";

export default function ListStudents() {
  const { id } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    let studentService = new StudentService();
    studentService
      .getStudents()
      .then((result) => setStudents(result.data.data));
  }, []);

  const loadStudents = async () => {
    let studentService = new StudentService();
    studentService
      .getStudents()
      .then((result) => setStudents(result.data.data));
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:8080/api/students/${id}`, {
      headers: authHeader(),
    });
    loadStudents();
  };

  return (
    <div>
      <Container>
        <Table
          className="custom-table"
          celled
          color="blue"
          size="small"
          compact
        >
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>First name</Table.HeaderCell>
              <Table.HeaderCell>Last name</Table.HeaderCell>
              <Table.HeaderCell>Faculty</Table.HeaderCell>
              <Table.HeaderCell>Department</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {students.map((student, index) => (
              <Table.Row key={student.id} textAlign="center">
                <Table.Cell key={index}>{index + 1}</Table.Cell>
                <Table.Cell>
                  <Link to={`/students/${student.username}`}>
                    {student.username}
                  </Link>
                </Table.Cell>
                <Table.Cell>{student.email}</Table.Cell>
                <Table.Cell>{student.firstName}</Table.Cell>
                <Table.Cell>{student.lastName}</Table.Cell>
                <Table.Cell>{student.faculty}</Table.Cell>
                <Table.Cell>{student.department}</Table.Cell>
                <Table.Cell>
                  <Button.Group compact circular size="small">
                    <Button
                      color="google plus"
                      onClick={() => deleteStudent(student.id)}
                      animated
                    >
                      Delete
                      <Icon name="delete" style={{ marginLeft: 3 }} />
                    </Button>
                    <Button
                      color="facebook"
                      as={NavLink}
                      to={`/student/edit/${student.id}`}
                    >
                      Edit
                      <Icon name="edit" style={{ marginLeft: 4 }} />
                    </Button>

                    <Button
                      color="green"
                      as={NavLink}
                      to={`/student/addCourse/${student.id}`}
                      animated
                    >
                      Add Course
                      <Icon name="add" style={{ marginLeft: 3 }} />
                    </Button>

                    <Button
                      color="violet"
                      as={NavLink}
                      to={`/student/${student.id}/courses`}
                      style={{ marginRight: 20 }}
                      animated
                    >
                      View Courses
                      <Icon name="eye" style={{ marginLeft: 3 }} />
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="9">
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
