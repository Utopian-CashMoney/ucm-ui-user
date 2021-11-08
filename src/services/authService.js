import axios from "axios";

// Use this if you want to change the url in application.properties file in user MS
// const API_URL = "http://localhost:8000/api/auth/";

const API_URL = "http://localhost:8000/auth/";


const API_URL2 = "http://localhost:8081/loans/"; 

const Accounts_API_URL = "http://localhost:8081/api/creditcards/";

const Loans_API_URL = "http://localhost:8081/api/loans/";



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

  loanSignup(userId, loanName, salary, amount, term, interestRate) {
    return axios.
      post(Loans_API_URL + "loansignup?userId="
        + userId + "&loanName=" + loanName 
        + "&salary=" + salary + "&amount=" + amount + "&term=" + term
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

  loanSignupSuccess(salary, name, balance, start_date, term) {
    return axios.
      post(Loans_API_URL + "loanSignupSuccess?userId=" + this.getCurrentUser().id
        , {
          salary,
          name,
          balance,
          start_date,
          term
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
    post(Accounts_API_URL + "user_credit_card_signup?userId=" + userId + "&cardName=" + cardName)
    // .then(response => {
    //   localStorage.setItem("cardsignup", response.data);
    //     return response.data;
    // });
  }

  getLoanStatus(){
    return JSON.parse(localStorage.getItem('loanStatus'));
  }

  submitPayment(userId, amount, payeeAccountNumber){
    return axios.
      post(Loans_API_URL + "submit_payment?userId=" + userId + "&amount=" + amount + "&payeeAccountNumber=" + payeeAccountNumber, {
      },
      {
        "headers": {
          'Content-Type': 'application/json',
        }
        
      }
      )
    }

    getAccountActivity(payeeAccountNumber){
      return axios
      .get(Loans_API_URL + "account_activity?payeeAccountNumber=" + payeeAccountNumber,{

      })
      .then(response => {
          localStorage.setItem("account_activity", JSON.stringify(response.data));
        return response.data;
      });
  }


}

export default new AuthService();
