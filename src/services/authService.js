import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

const API_URL2 = "http://localhost:8081/loans/";


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
    return JSON.parse(localStorage.getItem('user'));
  }

  loanSignup(max_amount, name, interest_rate, balance, start_date) {
    return axios.
    post(API_URL2 + "loansignup?userId=" + this.getCurrentUser().id
    , {
      max_amount,
      name,
      interest_rate,
      balance,
      start_date
    })
  }

}

export default new AuthService();
