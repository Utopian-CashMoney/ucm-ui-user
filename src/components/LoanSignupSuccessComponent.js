import React, { Component } from "react";

export default class LoanSignupSuccessComponent extends Component {


    componentDidMount() {
        document.title = 'Loan SignUp Success'
    }

    render(){
        
        return(
            <div>
                <h3>You Have Successfully Signed up for a loan, Please wait for approval
                    of the loan in the email on file.
                </h3>
            </div>
        )
    }

}