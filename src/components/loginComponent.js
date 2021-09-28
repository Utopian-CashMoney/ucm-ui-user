import React, { Component } from "react";
import { Link } from 'react-router-dom'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/authService";
import { Formik } from 'formik';
import * as Yup from "yup";

const required = value => {
  if (!value) {
    return (
      <div className="alertDanger" className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/home/user_account");
          window.location.reload();
        },
        error => {
          const resMessage =
            <h5>Wrong Email/Password OR First confirm account via email sent to your email address</h5>

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div>

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >


            <div id="card">
              <div id="card-content">
                <div id="card-title">
                  <h2>LOGIN</h2>
                  <div class="underline-title"></div>
                </div>
                {/* <form method="post" class="form"> */}
                <div className="form-group">
                  <label htmlFor="username">
                    &nbsp;Username
          </label>
                  <Input class="form-control" type="text" name="username" value={this.state.username}
                    onChange={this.onChangeUsername}
                    // validations={[required]} 
                    />
                  <div class="form-border"></div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">&nbsp;Password
          </label>
                  <Input class="form-control" type="password" name="password" value={this.state.password}
                    onChange={this.onChangePassword}
                    // validations={[required]} 
                    />
                  <div class="form-border"></div>
                </div>
                {/* <input id="submit-btn" type="submit" name="submit" value="LOGIN" /> */}
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"
                    className="loginSignIn"
                    disabled={!this.state.password || !this.state.username}
                  >
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>
                </div>
                <a href="/forgetPassword">
                  <legend id="forgot-pass">Forgot password?</legend>
                </a>
                <a href="/signup" id="signup">Don't have account yet?</a>
              </div>
            </div>
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}


            {/* <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
            <div>
              <Link to={"./forgetPassword"}>
                Forget Password
                </Link>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )} */}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
