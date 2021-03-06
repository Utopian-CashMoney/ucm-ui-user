import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/authService";

import SignUp from "./components/signupComponent";
import Login from "./components/loginComponent";
import Profile from "./components/profileComponent";
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
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            {/* This is not permanent; I just have no idea where else this is going */}
            <Route exact path="/accounts" component={AccountsComponent} />
            <Route exact path="/user_account/register" component={RegisterUserAccount} />
          </Switch>
        </div>
      </div>
      
    );
  } 
}

export default App;
