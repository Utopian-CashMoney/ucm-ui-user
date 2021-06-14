import React, { Component } from "react";
import {Pagination, Table} from "react-bootstrap";

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
        this.state = {}
    }
    componentDidMount() {
    }

    render() {
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
                <tbody>
                <Transaction account="Account" reason="Reason" amount="Amount" destination="Destination" timestamp="Timestamp" status="Status"/>
                </tbody>
            </Table>
        </div>
    }
}