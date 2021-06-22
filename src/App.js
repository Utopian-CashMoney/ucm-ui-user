import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'mdbreact/dist/css/mdb.css';

import "./App.css";
import LoanOnOfferComponent from "./components/LoansOnOfferComponent";
import SignupLoanComponent from "./components/SignupLoanComponent";

import AuthService from "./services/authService";
import Home from "./components/homeComponent";
import SignUp from "./components/signupComponent";
import Login from "./components/loginComponent";
import Profile from "./components/profile";
import {Switch, Route, Link} from "react-router-dom";
import AccountsComponent from "./components/accountsComponent";
import CardsOnOfferComponent from "./components/cardsOnOfferComponent";
import RegisterUserAccount from "./components/user_account/register"

import ConfirmLoanSignupComponent from "./components/ConfirmLoanSignupComponent";
import LoanSignupSuccessComponent from "./components/LoanSignupSuccessComponent";
import BranchesComponent from "./components/branchesComponent";
import UpdateUserProfileComponent from "./components/UpdateUserProfileComponent";

import BranchesComponent from "./components/branchesComponent";
import TransactionsComponent from "./components/me/transactionsComponent";
import {Dropdown, Nav, NavItem, NavLink} from "react-bootstrap";


class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: undefined,
        };

    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
            });
        }

    }

    logOut() {
        AuthService.logout();
    }

    render() {

        const {currentUser} = this.state;

        return (
            <div>
                <Nav className="navbar navbar-expand navbar-dark bg-dark">
                    {currentUser !== undefined ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/signup"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                    <div className="navbar-nav ml-auto">
                        <Dropdown as={NavItem} className="nav-item dropdown">
                            <Dropdown.Toggle as={NavLink}>Accounts</Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu bg-dark">
                                <Dropdown.Item>
                                    <Nav.Link as={Link} to={"/accounts"} className="nav-link">What We Offer</Nav.Link>
                                </Dropdown.Item>
                                <hr className="dropdown-divider nav-item"/>
                                <Dropdown.Item>
                                    <Nav.Link as={Link} disabled={true} className="nav-link">My Accounts</Nav.Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Nav.Link as={Link} to={"/me/transactions"} className="nav-link">My Transactions</Nav.Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Nav.Item>
                            <Link to={"/loans"} className="nav-link">Loans</Link>
                        </Nav.Item>
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/cards"} className="nav-link">Cards</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/branches"} className="nav-link">Branches</Link>
                        </li>
                    </div>
                </Nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path="/home" component={Home}/>
                        <Route exact path="/signup" component={SignUp}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/profile" component={Profile}/>
                        {/* This is not permanent; I just have no idea where else this is going */}
                        <Route exact path="/accounts" component={AccountsComponent}/>
                        <Route exact path="/cards" component={CardsOnOfferComponent}/>
                        <Route exact path="/branches" component={BranchesComponent}/>
                        <Route exact path="/user_account/register" component={RegisterUserAccount}/>
                        <Route exact path="/updateProfile" component={UpdateUserProfileComponent} />
                        <Route exact path="/loans" component={LoanOnOfferComponent}/>
                        <Route exact path="/signupLoan" component={SignupLoanComponent}/>
                        <Route exact path="/me/transactions" component={TransactionsComponent}/>
                        <Route exact path="/confirmLoanSignup" component={ConfirmLoanSignupComponent} />
                        <Route exact path="/loanSignupSuccess" component={LoanSignupSuccessComponent} />
                    </Switch>
                </div>
            </div>
}

export default App;
