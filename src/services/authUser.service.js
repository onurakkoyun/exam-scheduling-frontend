import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
  return axios.post(
    API_URL + "signup/user",
    {
      username,
      email,
      password,
    },
    { headers: authHeader() }
  );
};

const registerTeacher = (
  username,
  email,
  password,
  firstName,
  lastName,
  branch
) => {
  return axios.post(
    API_URL + "signup/teacher",
    {
      username,
      email,
      password,
      firstName,
      lastName,
      branch,
    },
    { headers: authHeader() }
  );
};

const registerStudent = (
  username,
  email,
  password,
  firstName,
  lastName,
  faculty,
  department,
  degree
) => {
  return axios.post(
    API_URL + "signup/student",
    {
      username,
      email,
      password,
      firstName,
      lastName,
      faculty,
      department,
      degree,
    },
    { headers: authHeader() }
  );
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  registerTeacher,
  registerStudent,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
