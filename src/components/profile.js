import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/authService";
import { Formik, Field, ErrorMessage, useFormik } from 'formik';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import profileImg from '../avatar.png';
import axios from "axios";
import Modal from 'react-modal';

const API_URL = "http://localhost:8000/auth/";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },

      password: '',

      isOpen: false

    };

    this.handleEditProfile = this.handleEditProfile.bind(this);

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
    this.handleConfirmAccountDelete = this.handleConfirmAccountDelete.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
  }

  componentDidMount() {

   
      document.title = 'Profile Page'
  

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

  handleOpenModal() {
    this.setState({
      isOpen: true
    });
  }

  handleHideModal() {
    this.setState({
      isOpen: false
    });
  }


  handleConfirmAccountDelete() {
    this.setState({
      isSubOpen: true
    });
  }

  handleDeleteAccount(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    const { currentUser } = this.state;

    if (this.checkBtn.context._errors.length === 0) {

      AuthService.deleteUserAccount(currentUser.id, this.state.password).then(
        () => {
          AuthService.logout();

          this.props.history.push("/login");
          window.location.reload();

        },
        error => {

          const resMessage =
            <h5>Wrong Credentials!</h5>

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    }

    else {
      this.setState({
        loading: false
      });
    }
  }

  onChangePassword(e) {
    console.log("inside onchange password" + e.target.value);
    this.setState({
      password: e.target.value
    });

    console.log("inside onchange password Two: " + this.state.password);
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

        <button className='accountDeleteButton' onClick={this.handleOpenModal}>
          Delete Account
            </button>

        <Modal className='ModalStyle' isOpen={this.state.isOpen} onRequestHide={this.handleHideModal}>
          <div class="modal-header">

            <div class="modal-title">
              <h4 className='accountDeleteConfirm'>Account Delete Confirmation! </h4>
            </div>

          </div>

          <div class="modal-body">

            <h4>All the transactions and the loyalty points will be deleted.
            Are you sure?
                </h4>


            <Modal className='ModalStyle' isOpen={this.state.isSubOpen} onRequestHide={this.hideSubModal}>
              <div class="modal-header">

                <div class="modal-title">
                  Verify the password to delete the account!
                </div>

              </div>

              <div class="modal-body">

                <Form onSubmit={this.handleDeleteAccount}
                  ref={c => {
                    this.form = c;
                  }}>

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
                    <button className="btn btn-primary btn-block">
                      <span>Confirm</span>
                    </button>
                  </div>

                  {this.state.message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {this.state.message}
                      </div>
                    </div>
                  )}


                  <CheckButton
                    style={{ display: "none" }}
                    ref={c => {
                      this.checkBtn = c;
                    }}
                  />

                </Form>

              </div>
            </Modal>

          </div>

          <div class="modal-footer">

            <button className='btn btn-default' onClick={this.handleHideModal}>
              Close
                </button>

            <button className='btn btn-primary' onClick={this.handleConfirmAccountDelete} >
              Confirm
                </button>

          </div>

        </Modal>

      </div>


    );
  }
}