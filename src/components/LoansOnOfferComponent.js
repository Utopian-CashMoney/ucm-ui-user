import  React, { Component } from "react";
import AuthService from "../services/authService";

import house from '../house.jpg';
import car from '../car.jpg'
import personal from '../personal.jpg'

let nowDate = new Date(); 




export default class LoansOnOfferComponent extends Component {
    constructor(props) {
        super(props);
        this.handleSubmitHomeLoan = this.handleSubmitHomeLoan.bind(this);
        this.handleSubmitAutoLoan = this.handleSubmitAutoLoan.bind(this);
        this.handleSubmitPersonalLoan = this.handleSubmitPersonalLoan.bind(this);

    }
    

     handleSubmitHomeLoan() {
        AuthService.loanSignup(530000.12, 'Home', 2.50, 120000.23, nowDate.getDate())
        .then(
        () => {
            this.props.history.push("/signupLoan");
            window.location.reload();                   

        })
      }

      handleSubmitAutoLoan() {
        AuthService.loanSignup(12000.60, 'Auto', 3.70, 5000.12, nowDate.getDate())
        .then(
        () => {
            this.props.history.push("/signupLoan");
            window.location.reload();                        

        })
      }

      handleSubmitPersonalLoan() {
        AuthService.loanSignup(5000.10, 'Personal', 4.10, 1000.34, nowDate.getDate())
        .then(
        () => {
            this.props.history.push("/signupLoan");
            window.location.reload();                        

        })
      }

    render() {

        return (
            <div class="row">
                <h3 class = "text-center">Available Loans</h3>
                <div className="row">
                    <div className="card">
                        <h3 class = "text-center">Home Loan</h3>
                       <img src={house} className='loanImg'/>
                        <hr></hr>
                        <h5>Cashmoney Home Loan for Purchasing new House:</h5>
                        <hr></hr>
                        <h7>* APR (Annual Percentage Rate): 2.5%, 3.7%, 4.5%, 5.6% (Based on Terms)</h7>
                        <h7>* Mortgage Terms Available: 5, 10, 20, 30 Years</h7>
                        <h7>* Down Payment required: 10%</h7>

                        <button onClick={this.handleSubmitHomeLoan}>
                            Sign Up
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="card card-container">
                        <h3 class = "text-center">Auto Loan</h3>
                        <img src={car} className='loanImg'/>
                        <hr></hr>
                        <h5>Cashmoney Auto Loan for Purchasing New/used Cars:</h5>
                        <hr></hr>
                        <h7>APR (Annual Percentage Rate): 3.5%, 3.7%, 4.1%, 4.7% (Based on Terms) </h7>
                        <h7>Terms Available: 24, 36, 48, 60 Months</h7>
                        <h7>Down Payment required: 5%</h7>

                        <button onClick={this.handleSubmitAutoLoan}>
                            Sign Up
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="card card-container">
                        <h3 class = "text-center">Personal Loan</h3>
                        <img src={personal} className='loanImg'/>
                        <hr></hr>
                        <h5>Cashmoney Personal Loan for family needs:</h5>
                        <hr></hr>
                        <h7>APR (Annual Percentage Rate): 4.1%, 5.9%, 7.4%, 8.8% (Based on Terms)</h7>
                        <h7>Mortgage Terms Available: 1, 3, 5, 10 Years</h7>
                        <h7>Down Payment required: None</h7>

                        <button onClick={this.handleSubmitPersonalLoan}>
                            Sign Up
                        </button>
                    </div>
                </div>

            </div>

        );
    }

}