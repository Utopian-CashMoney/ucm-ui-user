import React, { Component } from "react";
import AuthService from "../services/authService";
import axios from "axios";
import Modal from 'react-modal';



const API_URL = "http://localhost:8000/auth/";
const Accounts_API_URL = "http://localhost:8081/api/creditcards/";


export default class CreditCardSignupComponent extends Component {

    constructor(props) {
        super(props);
        // this.handleCardSignup = this.handleCardSignup.bind(this);

        this.state = {
            creditCard: [
                {
                    name: '',
                    type: '',
                    apr: ''
                }
            ]
            ,
            currentUser: { username: "" },
            errorMessage: ''
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);

    }

    componentDidMount() {

        document.title = 'Credit Cards Signup';

        //  const creditCard = AuthService.getAllCreditCardsFromStorage();


        //  this.setState({ creditCard: creditCard })
        this.getCards();

        const currentUser = AuthService.getCurrentUser();
        this.setState({ currentUser: currentUser, userReady: true })
        this.getUser(currentUser.id);



    }

    getUser(userId) {
        axios
            .get(API_URL + "getUser?userId=" + userId)
            .then(response => {
                this.setState({ currentUser: response.data }, () => {
                })
            })
            .catch(err => console.log(err));
    }

    getCards() {
        // axios
        //     .get(API_URL + "get_credit_cards")
        //     .then(response => {
        //         this.setState({ creditCard: response.data }, () => {

        //         })
        //     })
        axios
            .get(Accounts_API_URL + "credit_card_on_offer")
            .then(response => {
                this.setState({ creditCard: response.data }, () => {

                })
            })
            .catch(err => console.log(err));
    }

    handleCardSignup(userId, cardName) {
        AuthService.userCreditCardSignup(userId, cardName)
            .then(response => {
                this.props.history.push("/home/user_account");
            })
            .catch(error => {
                this.setState({
                    errorMessage: error.message
                })

                console.log("ERRORRRRR: " + error)
            })

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
        this.props.history.push("/home/user_account");
    }



    render() {
        const { currentUser } = this.state;
        const creditCardObj = this.state.creditCard;
        const creditCardArray = Array.from(creditCardObj);

        return (
            <div>
                <h1 className="cardTitle">Our Top Credit Cards</h1>
                <div class="containerCard">

                    <div class="wrapper">
                        <img class="creditcardImg1" src="https://cdn.wallethub.com/common/product/images/creditcards/500/capital-one-secured-credit-card-1412383c.png"></img>
                        <img class="creditcardImg1" src="https://cdn.wallethub.com/common/product/images/creditcards/500/capital-one-secured-credit-card-1412383c.png"></img>
                        <img class="creditcardImg1" src="https://cdn.wallethub.com/common/product/images/creditcards/500/capital-one-secured-credit-card-1412383c.png"></img>

                    </div>


                    <div class="wrapper2">
                        {creditCardArray.map(x =>
                            <div class='creditName'>
                                <h5>CashMoney {x.name}</h5>
                                <h7 class='creditNameTwo'>CREDIT CARD</h7>
                                <li class='creditAprPerks'>APR: {x.apr}</li>
                                <li class='creditAprPerks'>{x.perks}</li>
                                <button class='creditApplyBtn' onClick={() => { this.handleCardSignup(currentUser.id, x.name); this.handleOpenModal(); }}>Apply Now</button>
                                <button class='creditLearnInfoBtn'>More Info</button>
                            </div>)}
                    </div>

                    <div class="wrapper3">
                        {/* <a href="/creditCardSignupSuccess">
                            <button className="btnApply" onClick={() => { this.handleCardSignup(currentUser.id, name)}}>Apply</button>
                        </a>
                        <a href="/creditCardSignupSuccess">
                            <button className="btnApply" onClick={() => { this.handleCardSignup(currentUser.id, nameTwo)}}>Apply</button>
                        </a>
                        <a href="/creditCardSignupSuccess">
                            <button className="btnApply" onClick={() => { this.handleCardSignup(currentUser.id, nameThree)}}>Apply</button>
                        </a> */}

                    </div>



                    {this.state.errorMessage &&

                        <Modal className='ModalStyle' isOpen={this.state.isOpen} onRequestHide={this.handleHideModal}>
                            <div class="modal-header">

                                <div class="modal-title">
                                    <h4 className='accountDeleteConfirm'>Better Luck Next Time </h4>
                                </div>

                            </div>

                            <div class="modal-body">
                                <h4>
                                    "Loan Signup limit reached! Please Pay Off the current loans and come back at future time to re-apply,
                                    Thank You!"
                        </h4>
                            </div>

                            <div class="modal-footer">

                                <button className='btn btn-default' onClick={this.handleHideModal}>
                                    Close
                                </button>

                            </div>
                        </Modal>
                    }
                </div>
            </div>
        )
    }

}

