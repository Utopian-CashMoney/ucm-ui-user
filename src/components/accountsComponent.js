import React, { Component } from "react";
import PropTypes from 'prop-types';
import AccountService from "../services/accountService"
import AuthService from "../services/authService";
import {Redirect} from "react-router-dom";

export default class AccountsComponent extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            accounts: null,
            error: null,
            currentUser: null,
            gimmie: null
        };
    }

    componentDidMount() {
        document.title = 'Accounts';


        AccountService.all().then(response => {
            console.log(response.data)
            this.setState({
                accounts: response.data
            })
        }).catch(error => {
            if (error.response) {
                //Non-200 Response
                this.setState({
                    error: error.response.statusText || "Unknown error sending request: bad response."
                })
                console.error("An error has occurred: Non-200 Response");
                console.error(error.response)
            } else if (error.request) {
                //No response
                this.setState({
                    error: error.request.responseText || "Unknown error sending request: no response."
                })
                console.error("An error has occurred: No Response");
                console.error(error.request)
            } else {
                // Something happened in setting up the request that triggered an Error
                this.setState({
                    error: error.message || "Unknown error sending request: bad request."
                })
                console.error("An error has occurred: Couldn't send request.");
                console.error(error.message)
            }
        });

        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            this.setState({currentUser: currentUser})
        }
    }

    render() {
        let content = <span>No content</span>;
        if(this.state.gimmie) {
            content = <Redirect to={{
                pathname: "/user_account/register",
                state: {id: this.state.gimmie}
            }}/>
        }
        else if(this.state.accounts) {
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
                    {this.state.currentUser ?
                        <td>
                            <button type="button" className="btn btn-success" onClick={event => this.setState({gimmie: account.id})}>GIMMIE!</button>
                        </td> :
                        <td>
                            <button type="button" className="btn btn-success" disabled>GIMMIE!</button>
                        </td>
                    }

                </tr>)}
                </tbody>
            </table>
        }
        else if(this.state.error) {
            content = <div className="alert alert-danger">{this.state.error}</div>
        }
        return(<div className="container">
            {content}
        </div>);
    }
};