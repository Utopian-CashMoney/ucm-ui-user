import axios from "axios";

const API_URL = "http://localhost:8000/auth/";

const API_URL2 = "http://localhost:8081/loans/";


class AuthService {
  signup(username, email, password, phone, first_name, last_name,
    address, city, state, zipcode) {
    return axios.
      post(API_URL + "signup", {
        username,
        email,
        password,
        phone,
        first_name,
        last_name,
        address,
        city,
        state,
        zipcode
      })
  }

  updateUserInfo(id, username, email, password, phone, first_name, last_name,
    address, city, state, zipcode) {
    return axios.
      post(API_URL + "updateProfile", {
        id,
        username,
        email,
        password,
        phone,
        first_name,
        last_name,
        address,
        city,
        state,
        zipcode
      })
  }

  deleteUserAccount(id, password) {
    return axios.
      post(API_URL + "deleteUserAccount?id=" + id + "&pass=" + password, {
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
        + "salary=" + salary + "&amount=" + amount + "&term=" + term
        + "&interestRate=" + interestRate
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

  forgetPassword(email) {
    return axios.
      post(API_URL + "forget_password?email=" + email);
  }

  resetPassword(password, email) {
    return axios.
      post(API_URL + "reset_password?newPassword=" + password + "&email=" + email);
  }

  getAllCreditCardsFromStorage() {
    return JSON.parse(localStorage.getItem('credit'));
  }

  
  userCreditCardSignup(userId, cardName) {
    return axios.
    post(API_URL + "user_credit_card_signup?userId=" + userId + "&cardName=" + cardName);
  }

  // getUserAccount(userId) {
  //   return axios.
  //     get(API_URL + "user_account?userId=" + userId, {
  //     }).
  //     then( response => {
  //       return response.data;
  //     });

  // }


}

export default new AuthService();
