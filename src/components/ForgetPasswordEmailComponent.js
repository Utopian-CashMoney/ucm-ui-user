import React, { Component } from "react";

export default class ForgetPasswordEmailComponent extends Component {
    render() {
        return (

            <div>
                <h4 className="passwordResetConfirm">If we have that email on file, we will send an email regarding resetting the password! Thanks for the patience!</h4>
                <a href="/login">
                    <button className="homePage">Home Page</button>
                </a>
            </div>
        )

}
}