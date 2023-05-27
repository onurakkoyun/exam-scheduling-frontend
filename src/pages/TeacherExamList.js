import React, { useState, useEffect } from "react";
import { Button, Container, Icon, Menu, Table } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import TeacherService from "./../services/teacherService";

export default function TeacherExamList() {
  const { id } = useParams();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    loadExams();
  }, []);

  useEffect(() => {
    let teacherService = new TeacherService();
    teacherService
      .getTeacherExamList(id)
      .then((result) => setExams(result.data.data));
  }, [id]);

  const loadExams = async () => {
    let teacherService = new TeacherService();
    teacherService
      .getTeacherExamList(id)
      .then((result) => setExams(result.data.data));
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
              <Table.HeaderCell>Exam Date</Table.HeaderCell>
              <Table.HeaderCell>Start Time</Table.HeaderCell>
              <Table.HeaderCell>End Time</Table.HeaderCell>
              <Table.HeaderCell>Exam Type</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {exams.map((exam, index) => (
              <Table.Row key={exam.id} textAlign="center">
                <Table.Cell key={index}>{index + 1}</Table.Cell>
                <Table.Cell>{exam.course.courseCode}</Table.Cell>
                <Table.Cell>{exam.course.courseName}</Table.Cell>
                <Table.Cell>{exam.examDate}</Table.Cell>
                <Table.Cell>{exam.startTime}</Table.Cell>
                <Table.Cell>{exam.endTime}</Table.Cell>
                <Table.Cell>{exam.examType}</Table.Cell>
                <Table.Cell>{exam.description}</Table.Cell>

                <Table.Cell>
                  <Button.Group compact size="small">
                    <Button
                      color="facebook"
                      as={NavLink}
                      to={`/exam/edit/${exam.id}`}
                    >
                      Edit
                      <Icon name="edit" style={{ marginLeft: 4 }} />
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
