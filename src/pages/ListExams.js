import React, { useState, useEffect } from "react";
import { Button, Container, Icon, Menu, Table } from "semantic-ui-react";
import axios from "axios";
import authHeader from "./../services/auth-header";
import ExamService from "./../services/examServices";

export default function ListExams() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    loadExams();
  }, []);

  useEffect(() => {
    let examService = new ExamService();
    examService.getExams().then((result) => setExams(result.data.data));
  }, []);

  const loadExams = async () => {
    let examService = new ExamService();
    examService.getExams().then((result) => setExams(result.data.data));
  };

  const deleteExam = async (id) => {
    await axios.delete(`http://localhost:8080/api/exams/delete/${id}`, {
      headers: authHeader(),
    });
    loadExams();
  };

  return (
    <div>
      <Container>
        <Table className="custom-table" celled size="small" color="green">
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Course name</Table.HeaderCell>
              <Table.HeaderCell>Exam type</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Start time</Table.HeaderCell>
              <Table.HeaderCell>End time</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {exams.map((exam, index) => (
              <Table.Row key={exam.id} textAlign="center">
                <Table.Cell key={index}>{index + 1}</Table.Cell>
                <Table.Cell>{exam.course.courseName}</Table.Cell>
                <Table.Cell>{exam.examType}</Table.Cell>
                <Table.Cell>{exam.examDate}</Table.Cell>
                <Table.Cell>{exam.startTime}</Table.Cell>
                <Table.Cell>{exam.endTime}</Table.Cell>
                <Table.Cell>{exam.description}</Table.Cell>

                <Table.Cell>
                  <Button.Group compact circular size="small">
                    <Button
                      color="google plus"
                      onClick={() => deleteExam(exam.id)}
                    >
                      <Icon name="delete" /> Delete Exam
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="8">
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
