import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/students/";
export default class StudentService {
  getStudents = () => {
    return axios.get(API_URL + "getallstudents", { headers: authHeader() });
  };

  getStudentCourseList = (id) => {
    return axios.get(
      `http://localhost:8080/api/students/${id}/courseRegistrations`,
      {
        headers: authHeader(),
      }
    );
  };
}
