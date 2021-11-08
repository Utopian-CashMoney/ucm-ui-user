import React, { Component } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table'


// Use this if you want to change the url in application.properties file in user MS
// const API_URL = "http://localhost:8000/api/auth/";
import authService from "../services/authService";

const Loans_API_URL = "http://localhost:8081/api/loans/";

export default class UserAccountActivityComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accountActivity: {
                date: '',
                description: '',
                amount: '',
                accountName: '',
                payeeAccountNumber: ''

            }
        };

        this.getAccountActivity = this.getAccountActivity.bind(this);


    }

    componentDidMount() {
        // authService.getAccountActivity(this.props.location.state.payeeAccountNumber).then(response => {
        //     this.setState({ accountActivity: response.data }, () => {

        //         console.log("dsfsf" + this.state.accountActivity);
        //     })
        // })
        //     .catch(err => console.log(err));
        this.getAccountActivity(this.props.location.state.payeeAccountNumber)
    }



    getAccountActivity(payeeAccountNumber) {
        return axios
            .get(Loans_API_URL + "account_activity?payeeAccountNumber=" + payeeAccountNumber, {

            })
            .then(response => {
                this.setState({ accountActivity: response.data }, () => {

                    // console.log("dsfsf" + response.data);
                })
            });
    }



    render() {
        // const accountInfo = this.props.location.state;

        const accountActivityObj = this.state.accountActivity;
         const accountActivityArray = Array.from(accountActivityObj);

        // console.log("cdsfcdsfsdfsdf" + this.state.accountActivity.date)

        return (
            <div class="container">


                <h1 class="firstWord">Account Activity</h1>
                <hr />

                <h4 class="alert alert-default" ng-bind-template="Hello {{account.name}} your balance is: {{account.runningBalance | currency}}" moneywarn="account.runningBalance" data-startbalance="{{account.startingBalace}}"></h4>

                <div class="row">
                    <div class="col-md-12">
                        
                        <h4>
                        {/* {
                                         accountActivityArray.map(x => <div>{x.description}</div>)
                                    } */}

                        </h4>


                        <hr />
                        <p>
                            <strong>Sort Transactions by:</strong>
                            <select ng-model="transType" class="form-control">
                                <option value=''>All</option>
                                <option value='credit'>Credit</option>
                                <option value='debit'>Debit</option>
                            </select>
                        </p>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                              
                                    {/* <tr> */}
                                    <td>
                                    {
                                         accountActivityArray.map(x => <tr>{x.date}</tr>)
                                    }

                                    </td>
                                   
                                    
                                    <td>
                                    {
                                         accountActivityArray.map(x => <tr>{x.description}</tr>)
                                    }

                                    </td>
                                   
                                   
                                   <td>
                                    {
                                         accountActivityArray.map(x => <tr>{x.amount}</tr>)
                                    }
                                    </td>
                                    {/* </tr> */}
                              
                            </tbody>

                        </Table>
                    </div>
                </div>
            </div>
        )
    }


}
