import React, { Component } from "react";
import AuthService from "../services/authService";


export default class ConfirmLoanSignupComponent extends Component {

    constructor(props) {
        super(props);
    
        this.state = {

          loanPayments: { payments: "",
                  totalPayment: ""
                   }

        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
      }


      componentDidMount() {
        const loanPayments = AuthService.getLoanPercent();
    
        if (!loanPayments) this.setState({ redirect: "/home" });
        this.setState({ loanPayments: loanPayments })
      }

      handleCancel(){
        this.props.history.push("/loans");
      }

      handleConfirm(){
        const loanInfo = this.props.location.state;
        console.log("Balance: " + loanInfo.amount);
           AuthService.loanSignupSuccess(loanInfo.salary,
           loanInfo.name,
           loanInfo.balance,
           loanInfo.start_date)
           .then(
             () => {



        this.props.history.push({
            pathname: '/loanSignupSuccess',
            state: {
                salary: loanInfo.salary,
                name: loanInfo.name,
                balance: loanInfo.amount,
                start_date: loanInfo.start_date
            }
          })
        })
      }

    render(){
        const { loanPayments } = this.state;

       console.log("Hereeee: " + this.props.max_amount);



        return(
        <div>
        <h1 className = "loanConfirmHeading"> Confirm Loan Signup </h1>
        <h3 className = "monthlyPay"> Monthly Payment: </h3>
        <h3 className = "monthlyPayValue"> ${loanPayments.payments} </h3>
        <h3 className = "monthlyPay"> Total Payment at the end of term: </h3>
        <h3 className = "monthlyPayValue" > ${loanPayments.totalPayment} </h3>
        <h4 className = "continueLoanSignup"> Are you sure, to sign up?</h4>
        <button className = "loanCancelButton" onClick={this.handleCancel}>Cancel</button>
        <button className = "loanConfirmButton"  onClick={this.handleConfirm}>Confirm</button>
        </div>
        )
    }
    
}