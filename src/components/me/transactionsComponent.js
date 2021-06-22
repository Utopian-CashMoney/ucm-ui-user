import React, { Component } from "react";
import {Pagination, Table} from "react-bootstrap";
import TransactionService from "../../services/transactionsService"

function Transaction(props) {
    return <tr>
        <td>{props.account}</td>
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
        this.state = {
            transactions: null,
            error: null,
            currentUser: null,
        }
    }
    componentDidMount() {
        TransactionService.get().then(response => {
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

    render() {
        let tableBody = null;

        return <div>
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item key={1} active={true}>1</Pagination.Item>
                <Pagination.Item key={2}>2</Pagination.Item>
                <Pagination.Item key={3}>3</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
            <Table striped hover size="sm">
                <thead>
                <tr>
                    <th>Account</th>
                    <th>Message</th>
                    <th>Amount</th>
                    <th>Destination</th>
                    <th>Timestamp</th>
                    <th>Status</th>
                </tr>
                </thead>
                {tableBody}
            </Table>
        </div>;
    }
}