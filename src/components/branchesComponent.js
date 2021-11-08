import React, { Component } from "react";
import PropTypes from 'prop-types';
import BranchService from "../services/branchService"

export default class BranchesComponent extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            branches: null,
            error: null
        };
    }

    componentDidMount() {
        document.title = 'Branches';


        BranchService.all().then(response => {
            console.log(response.data)
            this.setState({
                branches: response.data
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
        let content = <span>No content</span>;
        if (this.state.branches) {
            content = <div>
                <h3>Branches</h3>
                <table className ="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Location</th>
                            <th scope="col">Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.branches.map((branch) =><tr>
                            <td>{branch.name}</td>
                            <td>{branch.streetAddress}, {branch.city}, {branch.zip}</td>
                            <td>{branch.openingTime} - {branch.closingTime}</td> 
                        </tr>)}
                    </tbody>
                </table>
            </div>
        }
        else if (this.state.error) {
            content = <div className="alert alert-danger">{this.state.error}</div>
        }
        return (<div className="container">
            {content}
        </div>);
    }
    
}