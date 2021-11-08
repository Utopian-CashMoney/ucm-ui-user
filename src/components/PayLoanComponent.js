import React, { Component } from "react";
import AuthService from "../services/authService";
import axios from "axios";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import Modal from 'react-modal';


const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };


export default class PayLoanComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

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
            //   AuthService.logout();
    
            //   this.props.history.push("/login");
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





    render(){

        return (
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
  
        )
    }

}