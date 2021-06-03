import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/authService";


import {DashboardLayout} from './Layout';
export default class Profile extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          redirect: null,
          userReady: false,
          currentUser: { username: "" },

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
          <DashboardLayout>
          <link rel="stylesheet" href="../styles.css"/>
            <div class="col-md-8">
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <h4 class="mb-0">First Name</h4>
                    </div>
                    <h4 class="col-sm-9 text-secondary">
                      {currentUser.firstName}
                    </h4>
                    <hr></hr>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h4 class="mb-0">Last Name</h4>
                    </div>
                    <h4 class="col-sm-9 text-secondary">
                      {currentUser.lastName}
                    </h4>
                    <hr></hr>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h4 class="mb-0">Username</h4>
                    </div>
                    <h4 class="col-sm-9 text-secondary">
                      {currentUser.username}
                    </h4>
                    <hr></hr>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h4 class="mb-0">Email</h4>
                    </div>
                    <h4 class="col-sm-9 text-secondary">
                      {currentUser.email}
                    </h4>
                    <hr></hr>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h4 class="mb-0">Phone</h4>
                    </div>
                    <h4 class="col-sm-9 text-secondary">
                      {currentUser.phNum}
                    </h4>
                    <hr></hr>
                  </div>
                </div>
              </div>
            </div>
          </DashboardLayout>
           
        );
      }
}