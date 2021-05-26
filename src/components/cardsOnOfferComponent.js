import React, { Component } from "react";

import cardimage from '../assets/Card.png';


export default class CardsOnOfferComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="row">
                <h3 class = "text-center">Available Cards</h3>
                <div className="col">
                    <div className="card card-container">
                        <h3 class = "text-center">Premium Card</h3>
                        <img src={cardimage} />
                        <hr></hr>
                        Cashmoney Premium card with low interest and stuff.
                        <hr></hr>
                        <a class="btn btn-primary" href="#" role="button">Sign Up</a>
                    </div>
                </div>
                <div className="col">
                    <div className="card card-container">
                        <h3 class = "text-center">Next Card</h3>
                        <img src={cardimage} />
                        <hr></hr>
                        Cashmoney Next card with things.
                        <hr></hr>
                        <a class="btn btn-primary" href="#" role="button">Sign Up</a>
                    </div>
                </div>
                <div className="col">
                    <div className="card card-container">
                        <h3 class = "text-center">Other Card</h3>
                        <img src={cardimage} />
                        <hr></hr>
                        Cashmoney Other card with other things.
                        <hr></hr>
                        <a class="btn btn-primary" href="#" role="button">Sign Up</a>
                    </div>
                </div>

            </div>
            

        );
    }

}

