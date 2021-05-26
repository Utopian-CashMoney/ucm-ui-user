import React, { Component } from "react";
import AccountService from "../services/accountService"
import AuthService from "../services/authService";

export default class AccountsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: null,
            error: null,
            currentUser: null
        };
    }

    componentDidMount() {
        AccountService.all().then(response => {
            console.log(response.data)
            this.setState({
                accounts: response.data
            })
        }).catch(error => {
            this.setState({
                accounts: error
            })
        });

        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            this.setState({currentUser: currentUser})
        }
    }

    render() {
        let content = <span>No content</span>;
        if(this.state.accounts) {
            content = <table className="table">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Credit Limit</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {this.state.accounts.map((account) => <tr>
                    <th scope="row">{account.name}</th>
                    <td>{account.type === "CREDIT" ? "Credit" : "Debit"}</td>
                    <td>{account.creditLimit}</td>
                    {this.state.currentUser ? <td><button type="button" className="btn btn-success">GIMMIE!</button></td> : <td><button type="button" className="btn btn-success" disabled>GIMMIE!</button></td> }

                </tr>)}
                </tbody>
            </table>
        }
        else if(this.state.error) {
            content = <div>{this.state.error}</div>
        }
        return(<div className="container">
            {content}
        </div>);
    }
};