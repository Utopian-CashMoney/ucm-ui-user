import React, { Component } from "react";
import AuthService from "../services/authService";

export default class CreditCardSignupSuccessComponent extends Component {

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    
        this.state = {
          currentUser: undefined,
        };
    
      }

      logOut() {
        AuthService.logout();
      }

    render() {
        return (

            <div>
                <h4 className="passwordResetConfirm">You have successfully signup for a credit card and the card will be 
                added to the account soon! Thanks for the patience!</h4>
                <a href="/login" onClick={this.logOut}>
                    <button className="homePage">Log Out</button>
                </a>
            </div>
        )

}
}