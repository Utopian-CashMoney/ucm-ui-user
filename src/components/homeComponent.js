import React, { Component } from "react";
import AuthService from "../services/authService";
import axios from "axios";
import "../App.css";
import { compose } from "redux";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import Modal from 'react-modal';
import authService from "../services/authService";

const Accounts_API_URL = "http://localhost:8081/api/creditcards/";

const accounts_url = "http://localhost:8081/api/user_account/";

const customStyles = {
    content: {
        width: '800px'
    },
};


const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }

    console.log("dscfdsfcsdcsdfcsd" + value)
};


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: { id: '' },
            isOpen: false,
            password: '',
            amount: '',
            payeeAccountNumber: '',

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


        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.handleSubmitPayment = this.handleSubmitPayment.bind(this);
        this.loanType = this.loanType.bind(this);
        this.handleUserAccount = this.handleUserAccount.bind(this);


    }

    componentDidMount() {

        document.title = 'User DashBoard'

        const currentUser = AuthService.getCurrentUser();
        this.setState({ currentUser: currentUser });

        this.getUserAccount(currentUser.id);

    }


    getUserAccount(userId) {

        return axios.
            get(accounts_url + "accounts?userId=" + userId, {
            })
            .then(response => {
                this.setState({ userAccount: response.data }, () => {
                })
            })
            .catch(err => console.log(err));

    }

    handleOpenModal() {
        this.setState({
            isOpen: true,
        });
    }

    handleHideModal() {
        this.setState({
            isOpen: false
        });
        window.location.reload();
    }

    loanType(accountNumber) {

        this.setState({
            payeeAccountNumber: accountNumber
        })
    }



    handleSubmitPayment(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        const { currentUser } = this.state;

        if (this.checkBtn.context._errors.length === 0) {


            AuthService.submitPayment(currentUser.id, this.state.amount, this.state.payeeAccountNumber).then(
                () => {

                    //  AuthService.logout();

                    //  this.props.history.push("/login");
                    //  window.location.reload();

                },
                error => {

                    const resMessage =
                        <h5>Not enough balance / Input amount is greater then balance to be paid</h5>

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        }

        else {
            this.setState({
                loading: false
            });
        }
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value,

        });
    }

    handleUserAccount(accountName, accountNumber) {
       // console.log("fdninhuhbuhn" + this.state.payeeAccountNumber)

        this.props.history.push({
             pathname: '/userAccountActivity',
            
            state: {
                accountName : accountName,
                payeeAccountNumber: accountNumber,

                }
        })

    }



    render() {
        const userAccountsObj = this.state.userAccount;
        const userAccountsArray = Array.from(userAccountsObj);

        const isDebit = userAccountsArray.filter(x => (x.accountType.type === 'DEBIT'))
        const debitArray = Array.from(isDebit);

        const isCreditAccount = userAccountsArray.filter(x => x.accountType.type === 'CREDIT')
        const creditArry = Array.from(isCreditAccount);

        const isLoan = userAccountsArray.filter(x => (x.accountType.type === 'LOAN'))
        const loanArray = Array.from(isLoan);

        return (
            <div class='homeCard'>

                <h1 class='h1Custom' >Bank Accounts</h1>

                {isDebit ? (
                    <h4>
                        {
                            debitArray.map(x => <div class="bankAccountCreditCard"> <h4 class='h4CustomD'>DEBIT</h4><h4 class='h4CustomA'> <div onClick ={() => {this.handleUserAccount(x.accountType.name, x.accountNumber)}}>{x.accountType.name} ({x.accountNumber.replace(/.(?=.{4})/g, '.')})</div>
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
                            loanArray.map(x => <div class="bankAccountCard">

                                <h4 class='h4CustomD'>LOAN</h4>


                                <h4 class='h4CustomA'> <div onClick ={() => {this.handleUserAccount(x.accountType.name, x.accountNumber)}}>{x.accountType.name} ({x.accountNumber.replace(/.(?=.{4})/g, '.')})</div>

                            <h4 class='bankAccountCardBalance'> ${x.balance} </h4>
                                    <h4 class='bankAccountCardRemainingBalance'> ${x.balance} </h4>
                                    <h4 class='h4CustomB'> Remaining balance</h4>


                                    {x.balance > 0 ? (
                                        <h4>
                                            {
                                                <a onClick={(e) => { this.handleOpenModal(); this.loanType(x.accountNumber); }}><h4 class='h4CustomC'> Pay Loan
                                                <h7 class='h7CustomA'> | </h7>
                                                </h4></a>

                                            }
                                        </h4>
                                    ) : (
                                        <a ><h4 class='h4CustomCisDisabled'> Pay Loan
                                        <h7 class='h7CustomA'> | </h7>
                                        </h4></a>
                                    )}


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
                            creditArry.map(x => <div class="bankAccountCreditCard"> <h4 class='h4CustomD'>Credit Card</h4><h4 class='h4CustomA'><div onClick ={ () => this.handleUserAccount(x.accountType.name, x.accountNumber)}>{x.accountType.name} ({x.accountNumber.replace(/.(?=.{4})/g, '.')})</div>
                         <h4 class='bankAccountCardBalance'> ${x.balance} </h4>
                                <h4 class='bankAccountCardRemainingBalance'> ${x.balance} </h4>
                                <h4 class='h4CustomB'> Remaining balance</h4>
                                {x.balance > 0 ? (
                                    <h4>
                                        {
                                            <a onClick={(e) => { this.handleOpenModal(); this.loanType(x.accountNumber); }}><h4 class='h4CustomC'> Pay Card
                            <h7 class='h7CustomA'> | </h7>
                                            </h4></a>
                                        }
                                    </h4>
                                ) : (
                                    <a ><h4 class='h4CustomCisDisabled'> Pay Card
                                <h7 class='h7CustomA'> | </h7>
                                    </h4></a>
                                )}


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
                <Modal style={customStyles} className='ModalStyle' isOpen={this.state.isOpen} onRequestHide={this.handleHideModal}>
                    <div class="modal-header">

                        <div class="modal-title">
                            <h4 className='accountDeleteConfirm'>Choose account to pay from! </h4>
                        </div>

                    </div>

                    <div class="modal-body">
                        <h4>
                            {
                                debitArray.map(x => <div >
                                    <label className='modelbodyPayFrom' for="accountNumber">Pay From:  </label>
                                    <select name="accounts" id="accounts">
                                        <option value="DEBIT"> {x.accountType.name} ({x.accountNumber.replace(/.(?=.{4})/g, '.')}) </option>
                                    </select>
                                </div>
                                )}
                        </h4>


                        <div class="modal-body">

                            <Form onSubmit={this.handleSubmitPayment}
                                ref={c => {
                                    this.form = c;
                                }}>

                                <div className="form-group">
                                    <label class='modelbodyAmount' htmlFor="amount">Amount</label>
                                    <Input
                                        className="form-control"
                                        className="loanPayAmount"
                                        type="number"
                                        step="any"
                                        name="amount"
                                        value={this.state.amount}
                                        onChange={this.onChangeAmount}
                                        validations={[required]}
                                    />

                                </div>



                                {this.state.message && (
                                    <div className="form-group">
                                        <div className="alert alert-danger" role="alert">
                                            {this.state.message}
                                        </div>
                                    </div>
                                )}


                                <CheckButton
                                    style={{ display: "none" }}
                                    ref={c => {
                                        this.checkBtn = c;
                                    }}
                                />

                            </Form>
                        </div>

                    </div>

                    <div class="modal-footer">

                        <button className='btn btn-default' onClick={this.handleHideModal}>
                            Close
                        </button>

                        <button className='btn btn-primary' onClick={this.handleSubmitPayment} >
                            Confirm
                        </button>

                    </div>

                </Modal>
            </div>

        )
    }
}