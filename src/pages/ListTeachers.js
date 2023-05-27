import React, { useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { Button, Container, Icon, Menu, Table } from "semantic-ui-react";
import TeacherService from "./../services/teacherService";
import axios from "axios";
import authHeader from "./../services/auth-header";

export default function ListTeachers() {
  const { id } = useParams();
  const [teachers, setTeachers] = useState([]);

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

  const deleteTeacher = async (id) => {
    await axios.delete(`http://localhost:8080/api/teachers/${id}`, {
      headers: authHeader(),
    });
    loadTeachers();
  };

  return (
    <div>
      <Container>
        <Table className="custom-table" celled color="yellow" size="small">
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>First name</Table.HeaderCell>
              <Table.HeaderCell>Last name</Table.HeaderCell>
              <Table.HeaderCell>Branch</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {teachers.map((teacher, index) => (
              <Table.Row key={teacher.id} textAlign="center">
                <Table.Cell key={index}>{index + 1}</Table.Cell>
                <Table.Cell>
                  <Link to={`/teachers/${teacher.username}`}>
                    {teacher.username}
                  </Link>
                </Table.Cell>
                <Table.Cell>{teacher.email}</Table.Cell>
                <Table.Cell>{teacher.firstName}</Table.Cell>
                <Table.Cell>{teacher.lastName}</Table.Cell>
                <Table.Cell>{teacher.branch}</Table.Cell>
                <Table.Cell>
                  <Button.Group compact circular size="small">
                    <Button
                      color="google plus"
                      onClick={() => deleteTeacher(teacher.id)}
                    >
                      <Icon name="delete" /> Delete
                    </Button>

                    <Button
                      color="facebook"
                      as={NavLink}
                      to={`/teacher/edit/${teacher.id}`}
                    >
                      Edit <Icon name="edit" style={{ marginLeft: 3 }} />
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
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
