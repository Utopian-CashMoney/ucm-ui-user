import  React, { Component } from "react";
import AuthService from "../services/authService";
import { Link } from 'react-router-dom'


import house from '../house.jpg';
import car from '../car.jpg'
import personal from '../personal.jpg'
import ConfirmLoanSignupComponent from "./ConfirmLoanSignupComponent"

let nowDate = new Date(); 

export default class LoansOnOfferComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
              loan: { max_amount: "",
                      name: "",
                      interest_rate: "",
                      balance: "",
                      start_date: ""
                    }
    
            };

        this.handleSubmitHomeLoan = this.handleSubmitHomeLoan.bind(this);
        this.handleSubmitAutoLoan = this.handleSubmitAutoLoan.bind(this);
        this.handleSubmitPersonalLoan = this.handleSubmitPersonalLoan.bind(this);

    }
    

     handleSubmitHomeLoan() {
        this.props.history.push({
            pathname: '/signupLoan',
            state: {
                name: "Home",
                balance: "",
                start_date: nowDate.getDate()
            }
          })
      }

      handleSubmitAutoLoan() {
        this.props.history.push({
            pathname: '/signupLoan',
            state: {
                name: "Auto",
                balance: "",
                start_date: nowDate.getDate()
            }
          })
      }

      handleSubmitPersonalLoan() {
        this.props.history.push({
            pathname: '/signupLoan',
            state: {
                name: "Personal",
                balance: "",
                start_date: nowDate.getDate()
            }
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
                        <h7>* APR (Annual Percentage Rate): 2.5%</h7>
                        <h7>* Mortgage Terms Available: 1, 2, 3, in Years</h7>
                        <h7>* Down Payment required: 10%</h7>
                        {/* <Link to="/signupLoan"> */}
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
                        <h7>APR (Annual Percentage Rate): 3.8% </h7>
                        <h7>Terms Available: 1,2,3, in Years</h7>
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
                        <h7>APR (Annual Percentage Rate): 5.6%</h7>
                        <h7>Mortgage Terms Available: 1, 2, 3, Years</h7>
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