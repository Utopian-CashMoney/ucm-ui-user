import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8080/auth/";


class AuthService {

  signup(username, email, password, phone, first_name, last_name) {
    return axios.
    post(API_URL + "signup", {
      username,
      email,
      password,
      phone,
      first_name,
      last_name
    })
  }


  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
