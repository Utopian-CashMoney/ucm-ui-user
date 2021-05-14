import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/authService";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong> Hello {currentUser.username}!</strong>
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>User Name:</strong>{" "}
          {currentUser.username}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <p>
          <strong>Phone Num:</strong>{" "}
          {currentUser.phNum}
        </p>
        <p>
          <strong>First Name:</strong>{" "}
          {currentUser.firstName}
        </p>
        <p>
          <strong>Last Name:</strong>{" "}
          {currentUser.lastName}
        </p>
      </div>: null}
      </div>
    );
  }
}
