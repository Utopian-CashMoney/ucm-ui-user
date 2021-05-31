import React, { Component } from "react";


export default class BranchesComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Branches</h1>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Location Number</th>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">City</th>
                            <th scope="col">Opening Time</th>
                            <th scope="col">Closing Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>This branch</td>
                            <td>1234 Sample Rd</td>
                            <td>Somecity</td>
                            <td>07:00</td>
                            <td>21:00</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>That branch</td>
                            <td>1234 Sample Rd</td>
                            <td>Somecity</td>
                            <td>07:00</td>
                            <td>21:00</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>The branch</td>
                            <td>1234 Sample Rd</td>
                            <td>Somecity</td>
                            <td>07:00</td>
                            <td>21:00</td>
                        </tr>
                    </tbody>
                </table>
            </div>


        );
    }

}

