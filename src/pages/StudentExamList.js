import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Icon, Menu, Table } from "semantic-ui-react";
import ExamService from "./../services/examServices";

export default function StudentExamList() {
  const { id } = useParams();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    let examService = new ExamService();
    examService
      .getStudentExamList(id)
      .then((result) => setExams(result.data.data));
  }, [id]);

  return (
    <div>
      <Container>
        <Table className="custom-table" celled color="green" size="small">
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Course name</Table.HeaderCell>
              <Table.HeaderCell>Exam type</Table.HeaderCell>
              <Table.HeaderCell>
                Date<br></br>
                <p>(yyyy.mm.dd)</p>
              </Table.HeaderCell>
              <Table.HeaderCell>Start time</Table.HeaderCell>
              <Table.HeaderCell>End time</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
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
