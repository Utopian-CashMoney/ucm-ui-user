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

  loanSignup(salary, amount, term, interestRate) {
    return axios.
    post(API_URL2 + "loansignup?"
    +"salary="+ salary + "&amount="+ amount +"&term="+ term
    +"&interestRate="+ interestRate
    , {
      
    })
    .then(response => {
        localStorage.setItem("loan", JSON.stringify(response.data));
      return response.data;
    });
  }

  getLoanPercent() {
    return JSON.parse(localStorage.getItem('loan'));
  }

  loanSignupSuccess(salary, name, balance, start_date) {
      return axios.
      post(API_URL2 + "loanSignupSuccess?userId=" + this.getCurrentUser().id
      , {
        salary,
        name,
        balance,
        start_date
      })
    }

}

export default new AuthService();
