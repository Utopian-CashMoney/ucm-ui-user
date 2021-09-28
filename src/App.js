import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'mdbreact/dist/css/mdb.css';

import "./App.css";
import LoanOnOfferComponent from "./components/LoansOnOfferComponent";
import SignupLoanComponent from "./components/SignupLoanComponent";

import AuthService from "./services/authService";
import Home from "./components/homeComponent";
import SignUp from "./components/signupComponent";
import Login from "./components/loginComponent";
import Profile from "./components/profile";
import { Switch, Route, Link } from "react-router-dom";
import AccountsComponent from "./components/accountsComponent";
import RegisterUserAccount from "./components/user_account/register"
import ConfirmLoanSignupComponent from "./components/ConfirmLoanSignupComponent";
import LoanSignupSuccessComponent from "./components/LoanSignupSuccessComponent";
import BranchesComponent from "./components/branchesComponent";
import UpdateUserProfileComponent from "./components/UpdateUserProfileComponent";
import ForgetPasswordComponent from "./components/ForgetPasswordComponent";
import ResetPasswordComponent from "./components/ResetPasswordComponent";
import ForgetPasswordEmailComponent from "./components/ForgetPasswordEmailComponent";
import CreditCardSignUpComponent from "./components/CreditCardSignUpComponent";
import CreditCardSignUpSuccessComponent from "./components/CreditCardSignUpSuccessComponent";
// import UserAccountsComponent from "./components/UserAccountsComponent";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };

  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }

  }

  logOut() {
    AuthService.logout();
  }

  render() {

    const { currentUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">

          {currentUser != undefined ? (
            <div>

              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
                <li className="nav-item">
                  <Link to={"/creditCardSignup"} className="nav-link">
                    Credit Cards
              </Link>
                </li>
              </div>
            </div>
          ) : (

            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
              </Link>
              </li>

              <li className="nav-item">
                <Link to={"/signup"} className="nav-link">
                  Sign Up
              </Link>
              </li>
            </div>

          )}
          {/* This is not permanent; I just have no idea where else this is going. We can discuss the front end navigation
          layout in more detail in a future meeting. -JP */}
          <div className="navbar-nav ml-auto">

            <li className="nav-item">
              <Link to={"/accounts"} className="nav-link">
                Accounts
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/loans"} className="nav-link">
                Loans
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                Profile
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/home/user_account" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            {/* This is not permanent; I just have no idea where else this is going */}
            <Route exact path="/accounts" component={AccountsComponent} />
            <Route exact path="/user_account/register" component={RegisterUserAccount} />
            <Route exact path="/branches" component={BranchesComponent} />
            <Route exact path="/updateProfile" component={UpdateUserProfileComponent} />
            <Route exact path="/loans" component={LoanOnOfferComponent} />
            <Route exact path="/signupLoan" component={SignupLoanComponent} />
            <Route exact path="/confirmLoanSignup" component={ConfirmLoanSignupComponent} />
            <Route exact path="/loanSignupSuccess" component={LoanSignupSuccessComponent} />
            <Route exact path="/forgetPassword" component={ForgetPasswordComponent} />
            <Route exact path="/resetPassword" component={ResetPasswordComponent} />
            <Route exact path="/forgetPasswordEmail" component={ForgetPasswordEmailComponent} />
            <Route exact path="/creditCardSignup" component={CreditCardSignUpComponent} />
            <Route exact path="/creditCardSignupSuccess" component={CreditCardSignUpSuccessComponent} />
            {/* <Route exact path="/user_account" component={UserAccountsComponent} /> */}



          </Switch>
        </div>
      </div>

    );
  }
}

export default App;
