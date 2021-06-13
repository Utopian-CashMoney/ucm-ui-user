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
import {Switch, Route, Link } from "react-router-dom";
import AccountsComponent from "./components/accountsComponent";
import RegisterUserAccount from "./components/user_account/register"

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

          {currentUser != undefined ?  (
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
            <Route exact path="/home" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            {/* This is not permanent; I just have no idea where else this is going */}
            <Route exact path="/accounts" component={AccountsComponent} />
            <Route exact path="/user_account/register" component={RegisterUserAccount} />
            <Route exact path="/loans" component={LoanOnOfferComponent} />
            <Route exact path="/signupLoan" component={SignupLoanComponent} />
          </Switch>
        </div>
      </div>
      
    );
  } 
}

export default App;
