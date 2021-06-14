import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/authService";
import profileImg from '../avatar.png';

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
            <div>
            <h1 className='profile'>Profile</h1>
            <img src={profileImg} class="avatar"/>
            <h4 className='profileFname'>First Name: </h4>
            <h4 className='profileFnameTwo'>{currentUser.firstName} </h4>
            <h4 className='profileLname'>Last Name: </h4>
            <h4 className='profileLnameTwo'>{currentUser.lastName} </h4>
            <h4 className='profileEmail'>Email: </h4>
            <h4 className='profileEmailTwo'>{currentUser.email} </h4>
            <h4 className='profilePnum'>Contact Number: </h4>
            <h4 className='profilePnumTwo'>{currentUser.phNum} </h4>
            <h4 className='profileAddress'>Address: </h4>
            <h4 className='profileAddressTwo'> Street Address Here </h4>
            <h4 className='profileCity'>City: </h4>
            <h4 className='profileCityTwo'> City Here</h4>
            <h4 className='profileState'>State: </h4>
            <h4 className='profileStateTwo'> State Here</h4>
            <h4 className='profileZipcode'>Zipcode: </h4>
            <h4 className='profileZipcodeTwo'> Zipcode Here</h4>
            </div>
          
        );
      }
}