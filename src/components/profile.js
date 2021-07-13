import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/authService";
import profileImg from '../avatar.png';
import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },

    };
    this.handleEditProfile = this.handleEditProfile.bind(this);
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
    this.getUser(currentUser.id);
  }

  getUser(userId) {
    axios
      .get(API_URL + "getUser?userId=" + userId)
      .then(response => {
        this.setState({ currentUser: response.data }, () => {
          console.log(this.state);
        })
      })
      .catch(err => console.log(err));
  }

  handleEditProfile() {
    const { currentUser } = this.state;
    this.props.history.push({
      pathname: '/updateProfile',
      state: {
        username: currentUser.username,
        email: currentUser.email,
        phone: currentUser.phNum,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        address: currentUser.address,
        city: currentUser.city,
        state: currentUser.state,
        zipcode: currentUser.zipcode
      }
    })
    window.location.reload();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div>
        <button className="profileEdit" onClick={this.handleEditProfile} >Edit</button>
        <h1 className='profile'>Profile</h1>
        <img src={profileImg} class="avatar" />
        <h4 className='profileFname'>First Name: </h4>
        <h4 className='profileFnameTwo'>{currentUser.firstName} </h4>
        <h4 className='profileLname'>Last Name: </h4>
        <h4 className='profileLnameTwo'>{currentUser.lastName} </h4>
        <h4 className='profileEmail'>Email: </h4>
        <h4 className='profileEmailTwo'>{currentUser.email} </h4>
        <h4 className='profilePnum'>Contact Number: </h4>
        <h4 className='profilePnumTwo'>{currentUser.phNum} </h4>
        <h4 className='profileAddress'>Address: </h4>
        <h4 className='profileAddressTwo'> {currentUser.address} </h4>
        <h4 className='profileCity'>City: </h4>
        <h4 className='profileCityTwo'> {currentUser.city} </h4>
        <h4 className='profileState'>State: </h4>
        <h4 className='profileStateTwo'>{currentUser.state} </h4>
        <h4 className='profileZipcode'>Zipcode: </h4>
        <h4 className='profileZipcodeTwo'> {currentUser.zipcode} </h4>
      </div>

    );
  }
}