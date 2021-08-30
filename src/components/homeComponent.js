import React, { Component } from "react";
import AuthService from "../services/authService";
import axios from "axios";
import "../App.css";
import { compose } from "redux";

const API_URL = "http://localhost:8000/auth/";




export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: { id: '' },

            userAccount: {
                accountNumber: '',

                balance: '',

                user: {
                    id: '',
                    username: '',
                },

                account_type: {
                    id: '',
                    name: '',
                    type: '',
                    allow_credit: ''
                }
            }

        };

        this.getUserAccount = this.getUserAccount.bind(this);

    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        this.setState({ currentUser: currentUser });

        this.getUserAccount(currentUser.id);

    }


    getUserAccount(userId) {

        return axios.
            get(API_URL + "user_account?userId=" + userId, {
            })
            .then(response => {
                this.setState({ userAccount: response.data }, () => {
                })
            })
            .catch(err => console.log(err));

    }

    divClick() {
        console.log("INSIDE DIV CLICK")
    }



    render() {
        const userAccountsObj = this.state.userAccount;
        const userAccountsArray = Array.from(userAccountsObj);

        const isDebit = userAccountsArray.filter(x => (x.account_type.type === 'DEBIT'))
        const debitArray = Array.from(isDebit);


        const isCreditAccount = userAccountsArray.filter(x => x.account_type.type === 'CREDIT')
        const creditArry = Array.from(isCreditAccount);

        const isLoan = userAccountsArray.filter(x => (x.account_type.type === 'LOAN'))
        const loanArray = Array.from(isLoan);


        return (
            <div class='homeCard'>

            <h1 class='h1Custom' >Bank Accounts</h1>

            {isDebit ? (
                <h4>
                    {
                        debitArray.map(x => <div class="bankAccountCreditCard"> <h4 class='h4CustomD'>DEBIT</h4><h4 class='h4CustomA'>{x.account_type.name} ({x.accountNumber.replace(/.(?=.{4})/g, '.')})
                         <h4 class='bankAccountCardBalance'> ${x.balance} </h4>
                            <h4 class='bankAccountCardRemainingBalance'> ${x.balance} </h4>
                            <h4 class='h4CustomB'> Remaining balance</h4>
                            <h4 class='h4CustomE'> Transfer money
                            <h7 class='h7CustomA'> | </h7>
                            </h4>


                            <div class="dropup">
                                <button class="dropbtn">Options</button>
                                <div class="dropup-content">
                                    <a href="#">Account details</a>
                                    <a href="#">Account and routing numbers </a>
                                    <a href="#">Statements and documents</a>
                                    <a href="#">Account services</a>
                                    <a href="#">Transfer activity</a>
                                </div>
                            </div>



                        </h4>

                            <h4 class='bankAccountCardBalanceText'> Current Balance</h4>
                        </div>)
                    }
                </h4>
            ) : (
                <div></div>
            )}

            {isLoan ? (
                <h4>
                    {
                        loanArray.map(x => <div class="bankAccountCard" onClick={this.divClick}> 
                        
                            <h4 class='h4CustomD'>LOAN</h4> 
                    

                        <h4 class='h4CustomA'> {x.account_type.name} ({x.accountNumber.replace(/.(?=.{4})/g, '.')})

                            <h4 class='bankAccountCardBalance'> ${x.balance} </h4>
                            <h4 class='bankAccountCardRemainingBalance'> ${x.balance} </h4>
                            <h4 class='h4CustomB'> Remaining balance</h4>
                            <h4 class='h4CustomC'> Pay Loan
                            <h7 class='h7CustomA'> | </h7>
                            </h4>


                            <div class="dropup">
                                <button class="dropbtn">Options</button>
                                <div class="dropup-content">
                                    <a href="#">Account details</a>
                                    <a href="#">Account and routing numbers </a>
                                    <a href="#">Statements and documents</a>
                                    <a href="#">Account services</a>
                                    <a href="#">Transfer activity</a>
                                </div>
                            </div>

                        </h4>
                            <h4 class='bankAccountCardBalanceText'> Current Balance</h4>

                        </div>)
                    }

                </h4>
            ) : (
                <div></div>
            )}
    
            {isCreditAccount ? (
                <h4>
                    {
                        creditArry.map(x => <div class="bankAccountCreditCard"> <h4 class='h4CustomD'>Credit Card</h4><h4 class='h4CustomA'>{x.account_type.name} ({x.accountNumber.replace(/.(?=.{4})/g, '.')})
                         <h4 class='bankAccountCardBalance'> ${x.balance} </h4>
                            <h4 class='bankAccountCardRemainingBalance'> ${x.balance} </h4>
                            <h4 class='h4CustomB'> Remaining balance</h4>
                            <h4 class='h4CustomC'> Pay Card
                            <h7 class='h7CustomA'> | </h7>
                            </h4>


                            <div class="dropup">
                                <button class="dropbtn">Options</button>
                                <div class="dropup-content">
                                    <a href="#">Account details</a>
                                    <a href="#">Account and routing numbers </a>
                                    <a href="#">Statements and documents</a>
                                    <a href="#">Account services</a>
                                    <a href="#">Transfer activity</a>
                                </div>
                            </div>



                        </h4>

                            <h4 class='bankAccountCardBalanceText'> Current Balance</h4>
                        </div>)
                    }
                </h4>
            ) : (
                <div></div>
            )}
        </div>

        )
    }
}