import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/teachers/";
export default class TeacherService {
  getTeachers = () => {
    return axios.get(API_URL + "getallteachers", { headers: authHeader() });
  };

  getTeacherCourseList = (id) => {
    return axios.get(`http://localhost:8080/api/teachers/${id}/courses`, {
      headers: authHeader(),
    });
  };

  getTeacherExamList = (id) => {
    return axios.get(`http://localhost:8080/api/teachers/${id}/exams`, {
      headers: authHeader(),
    });
  };
}
