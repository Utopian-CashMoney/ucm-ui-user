import React, { Component } from "react";
import AuthService from "../services/authService";
import axios from "axios";


const API_URL = "http://localhost:8000/auth/";


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
        };

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
        axios
            .get(API_URL + "get_credit_cards")
            .then(response => {
                this.setState({ creditCard: response.data }, () => {

                })
            })
            .catch(err => console.log(err));
    }

    handleCardSignup(userId, cardName) {
        AuthService.userCreditCardSignup(userId, cardName);
        this.props.history.push("/home/user_account")
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
                                <button class='creditApplyBtn' onClick={() => { this.handleCardSignup(currentUser.id, x.name)}}>Apply Now</button>
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
                </div>
            </div>
        )
    }

}

