import React, { Component } from "react";
import {DashboardLayout} from './Layout';


 import house from '../house.jpg';


export default class LoansOnOfferComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <DashboardLayout>
            <div class="row">
                <h3 class = "text-center">Available Loans</h3>
                <div className="col">
                    <div className="card card-container">
                        <h3 class = "text-center">Home Loan</h3>
                        <img src={house} />
                        <hr></hr>
                        Cashmoney Premium card with low interest and stuff.
                        <hr></hr>
                        <a class="btn btn-primary" href="#" role="button">Sign Up</a>
                    </div>
                </div>
                <div className="row">
                    <div className="card card-container">
                        <h3 class = "text-center">Auto Loan</h3>
                        {/* <img src={cardimage} /> */}
                        <hr></hr>
                        Cashmoney Next card with things.
                        <hr></hr>
                        <a class="btn btn-primary" href="#" role="button">Sign Up</a>
                    </div>
                </div>
                <div className="row">
                    <div className="card card-container">
                        <h3 class = "text-center">Personal Loan</h3>
                        {/* <img src={cardimage} /> */}
                        <hr></hr>
                        Cashmoney Other card with other things.
                        <hr></hr>
                        <a class="btn btn-primary" href="#" role="button">Sign Up</a>
                    </div>
                </div>

            </div>
            </DashboardLayout>

        );
    }

}