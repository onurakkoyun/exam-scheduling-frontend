import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/exams/";
export default class ExamService {
  getExams = () => {
    return axios.get(API_URL + "getallexams", { headers: authHeader() });
  };

  getStudentExamList = (id) => {
    return axios.get(`http://localhost:8080/api/exams/student/${id}`, {
      headers: authHeader(),
    });
  };
}
