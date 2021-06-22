import React, { Component } from "react";
import {Table} from "react-bootstrap";
import PageControls from "../pageControls";
import TransactionService from "../../services/transactionsService"

/**
 * Transaction element
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
function Transaction(props) {
    return <tr key={props.index}>
        <th scope="col">{props.accountNumber}</th>
        <td>{props.reason}</td>
        <td>{props.amount}</td>
        <td>{props.destination}</td>
        <td>{props.timestamp}</td>
        <td>{props.status}</td>
    </tr>
}

export default class TransactionsComponent extends Component {
    constructor(props) {
        super(props);

        this.getPage = this.getPage.bind(this);

        this.state = {
            transactions: null,
            error: null,
            currentUser: null
        }
    }
    componentDidMount() {
        this.getPage(1)
    }

    render() {
        let tableBody = null;
        let alert = null;
        let pageControls = null;
        if(this.state.transactions) {
            tableBody = <tbody>
            {this.state.transactions.content.map((value, index) => (
                <Transaction accountNumber={value.accountNumber} reason={value.reason} amount={value.amount}
                destination={value.destination} timestamp={value.timestamp} status={value.status} index={index}/>
            ))}
            </tbody>
            pageControls = <PageControls activePage={this.state.transactions.number} pageCount={this.state.transactions.totalPages} callback={this.getPage} />
        }
        else if(this.state.error) {
            alert = <div className="alert alert-danger">{this.state.error}</div>
        }
        else {

        }

        return <div>
            {alert}
            {pageControls}
            <Table striped hover size="sm">
                <thead>
                <tr>
                    <th scope={"col"}>Account</th>
                    <th scope={"col"}>Message</th>
                    <th scope={"col"}>Amount</th>
                    <th scope={"col"}>Destination</th>
                    <th scope={"col"}>Timestamp</th>
                    <th scope={"col"}>Status</th>
                </tr>
                </thead>
                {tableBody}
            </Table>
        </div>;
    }

    getPage(page) {
        TransactionService.get(page).then(response => {
            this.setState({
                transactions: TransactionService.parse(response)
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
    }
}