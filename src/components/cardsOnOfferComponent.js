import React, { Component } from "react";
import PropTypes from 'prop-types';
import CardsOnOfferService from "../services/cardsOnOfferService"
import AuthService from "../services/authService";
import { Redirect } from "react-router-dom";

import cardimage from '../assets/Card.png';
import cardsOnOfferService from "../services/cardsOnOfferService";


export default class CardsOnOfferComponent extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            accounts: null,
            err: null,
            currentUser: null,
            signUp: null
        }
    }

    componentDidMount() {
        cardsOnOfferService.all().then(response => {
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
            this.setState({ currentUser: currentUser })
        }
    }

    render() {
        let content = <span>No content</span>;
        if (this.state.signUp) {
            content = <Redirect to={{
                pathname: "/user_account/register",
                state: { id: this.state.signUp }
            }} />
        }
        else if (this.state.accounts) {
            content = <div className="row">
                <h3 className="text-center">Available Cards</h3>
                {this.state.accounts.filter(account => account.allowCards == 1).map(account =>
                    <div className="col">
                        <div className="card card-container">
                            <h3 className="text-center">{account.name}</h3>
                            <img src={cardimage} /> <hr />
                            <div className="row">
                                <div className="col"><strong>Type</strong></div>
                                <div className="col"><strong>Limit</strong></div>
                            </div>
                            <div className="row">
                                <div className="col">{account.type == "DEBIT" ? "Debit" : "Credit"}</div>
                                <div className="col">${account.creditLimit}</div>
                            </div>
                            <hr />
                            {this.state.currentUser ?
                                <a className="btn btn-primary" onClick={event => this.setState({ signUp: account.id })}> Sign Up</a>
                                :
                                <a className="btn btn-primary" role="button">Sign Up</a>

                            }
                        </div>
                    </div>)}
            </div>
        }
        else if (this.state.error) {
            content = <div className="alert alert-danger">{this.state.error}</div>
        }
        return (<div className="container">
            {content}
        </div>);

    }
}