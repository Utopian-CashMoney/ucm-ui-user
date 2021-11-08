import React, { Component } from "react";
import AuthService from "../services/authService";
import axios from "axios";
import authService from "../services/authService";

const API_URL2 = "http://localhost:8081/api/loans/";



export default class LoanStatusComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {

            loanInfo: {
                user_loan_id: '',
                salary: '',
                startDate: '',
                isAccepted: '',
                term: '',
                status: ''
            },

            currentUser: { id: "" }

        };

    }

    componentDidMount() {

        document.title = 'Loan Status'


        const currentUser = AuthService.getCurrentUser();
        this.setState({ currentUser: currentUser, userReady: true })
        // this.getUser(currentUser.id);
        this.getLoanStatus(currentUser.id);
        const loanInfo000 = JSON.parse(localStorage.getItem('loanINFO'));

        this.setState({ loanInfo: loanInfo000 });
    }


    getLoanStatus(userId) {
        return axios.
            get(API_URL2 + "loan_status?userId=" + userId)
            .then(response => {
                // this.setState({ loanInfo: response.data }, () => {
                //      const loanInfoArray = Array.from(response.data);

                //     this.setState({ loanInfo: loanInfoArray.map(x => x.status) }, () => {


                // })

                localStorage.setItem("loanINFO", JSON.stringify(response.data));
                console.log("inside getting" + JSON.stringify(this.state.loanInfo));
                return response.data;
            })
            .catch(err => console.log(err));
    }


    render() {

        const currentUser = this.state.currentUser;
        const ssss = this.state.loanInfo;

        //  console.log("SSSSSS: " + ssss)
        // const userAccountsArray = Array.from(status);

        // const isDebit = userAccountsArray.filter(x => (x.account_type.type === 'DEBIT'))
        const loanInfoArray = Array.from(ssss);

        return (
            //    <h1>
            // {

            <div>
                <div class="loanStatusDiv"> Loan Status </div>
                {
                    loanInfoArray.map(x =>

                        <div class="row">

                            <div className="row">
                                <div className="card">
                                    <h3 class="text-center"> Loan</h3>
                                    {/* <hr></hr> */}
                                    {/* <h5>Cashmoney Home Loan for Purchasing new House:</h5>
                                <hr></hr> */}
                                    <h3 class="loanInfo"> SALARY : <h3 class='loanInfo2'>{x.salary} </h3></h3>
                                    <h3 class="loanInfo"> APPLY DATE : <h3 class='loanInfo2'> {x.startDate} </h3> </h3>
                                    <h3 class="loanInfo"> Term(Years) : <h3 class='loanInfo2'> {x.term} </h3> </h3>
                                    <h3 class="loanInfo"> STATUS : <h3 class='loanInfo2'> {x.status} </h3></h3>

                                </div>
                            </div>
                        </div>
                    )
                }

            </div>




        )
    }





}