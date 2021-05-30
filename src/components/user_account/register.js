import React, { Component } from "react";
import AuthService from "../../services/authService";
import UserAccountService from "../../services/userAccountService"

export default class RegisterUserAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.id,
            accountNumber: null,
            accountType: null,
            accountName: null,
            error: null
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            UserAccountService.registerFor(this.state.id).then(response => {
                this.setState({
                    accountNumber: response.data.accountNumber,
                    accountType: response.data.accountName,
                    accountName: response.data.accountType,
                })
            }).catch(error => {
                this.setState({
                    error: true
                })
            });
        }
    }

    render() {
        let content = <span>No content</span>;
        if(this.state.accountNumber) {
            content = <div>
                <div className="alert alert-success">Account registered!</div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Account Type</th>
                        <th scope="col">Account Name</th>
                        <th scope="col">Account Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.state.accountType}</td>
                        <td>{this.state.accountName}</td>
                        <td>{this.state.accountNumber}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        }
        else if (this.state.error) {
            content = <div className="alert alert-danger">Account failed to register.</div>
        }

        return content;
    }
}