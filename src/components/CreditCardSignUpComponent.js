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
        const creditCard = AuthService.getAllCreditCardsFromStorage();


        this.setState({ creditCard: creditCard })
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

    }



    render() {

        const creditCard = this.state.creditCard;
        const { currentUser } = this.state;

        // Fix this mess with loop or something after


        const name = Object.values(creditCard.map(x => x.name))[0]
        const type = Object.values(creditCard.map(x => x.type))[0]
        const apr = Object.values(creditCard.map(x => x.apr))[0]
        const perks = Object.values(creditCard.map(x => x.perks))[0]

        const nameTwo = Object.values(creditCard.map(x => x.name))[1]
        const typeTwo = Object.values(creditCard.map(x => x.type))[1]
        const aprTwo = Object.values(creditCard.map(x => x.apr))[1]
        const perksTwo = Object.values(creditCard.map(x => x.perks))[1]

        const nameThree = Object.values(creditCard.map(x => x.name))[2]
        const typeThree = Object.values(creditCard.map(x => x.type))[2]
        const aprThree = Object.values(creditCard.map(x => x.apr))[2]
        const perksThree = Object.values(creditCard.map(x => x.perks))[2]

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
                        <h5 > * Name: {name}</h5>
                        <h5 > * Name: {nameTwo} </h5>
                        <h5 > * Name: {nameThree} </h5>
                        <h5 > * Card: {type} </h5>
                        <h5 > * Card: {typeTwo} </h5>
                        <h5 > * Card: {typeThree} </h5>
                        <h5 > * APR: {apr} </h5>
                        <h5 > * APR: {aprTwo} </h5>
                        <h5 > * APR: {aprThree} </h5>
                        <h5 > * Perks: {perks} </h5>
                        <h5 > * Perks: {perksTwo} </h5>
                        <h5 > * Perks: {perksThree} </h5>
                    </div>

                    <div class="wrapper3">
                        <a href="/creditCardSignupSuccess">
                            <button className="btnApply" onClick={() => { this.handleCardSignup(currentUser.id, name)}}>Apply</button>
                        </a>
                        <a href="/creditCardSignupSuccess">
                            <button className="btnApply" onClick={() => { this.handleCardSignup(currentUser.id, nameTwo)}}>Apply</button>
                        </a>
                        <a href="/creditCardSignupSuccess">
                            <button className="btnApply" onClick={() => { this.handleCardSignup(currentUser.id, nameThree)}}>Apply</button>
                        </a>

                    </div>
                </div>
            </div>


        )
    }

}

