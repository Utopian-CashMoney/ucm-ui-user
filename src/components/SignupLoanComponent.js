
import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import AuthService from "../services/authService";

const salaryRegex = /^[1-9][0-9]*$/
const amountRegex = /^[1-9][0-9]*$/
const termRegex = /^[1-9][0-9]*$/



const validationSchema = Yup.object().shape({

    salary: Yup.string()
    .matches(salaryRegex, 'Only 1-9 is allowed')
    .required('Salary is required'),

    amount: Yup.string()
    .matches(amountRegex, 'Only 1-9 is allowed')
    .required('Amount is required'),

    term: Yup.string()
        .matches(termRegex, 'Only 1-9 is allowed')
        .required('term is required'),
   
})

export default class SignupLoanComponent extends Component {

    componentDidMount() {
        document.title = 'Loan SignUp'
    }

    render() {   

        const loanInfo = this.props.location.state;
        
        return (
            <Formik 
                initialValues={{
                    salary:'',
                    amount:'',
                    term: ''
                }}  

                validationSchema = {validationSchema}

                onSubmit={(fields) => {
                    const currentUser = AuthService.getCurrentUser();


                    AuthService.loanSignup(currentUser.id, loanInfo.name, 
                        fields.salary, fields.amount,
                        fields.term, 4.5)
                        .then(
                        () => {

                           this.props.history.push({
                            pathname: '/confirmLoanSignup',
                            state: {
                                salary: fields.salary,
                                name: loanInfo.name,
                                balance: fields.amount,
                                start_date: loanInfo.start_date,
                                term : fields.term
                            }
                          })

                        },
                      );                          
                      
                }}
                
                        
                render={({ errors, status, touched }) => (
                    
                    <Form>
                      <div className="form-group">
                            <label htmlFor="salary">Salary <h7 style={{ color: 'red'}}>*</h7> </label>
                             <Field name="salary" type="text" placeholder = "Enter Salary Here" className={'form-control' + (errors.salary && touched.salary ? ' is-invalid' : '')} />
                             <ErrorMessage name="salary" component="div" className="invalid-feedback" />
                         </div>
                         <div className="form-group">
                            <label htmlFor="amount">Loan Amount <h7 style={{ color: 'red'}}>*</h7> </label>
                            <Field name="amount" type="text" placeholder = "Enter Loan Amount Here" className={'form-control' + (errors.amount && touched.amount ? ' is-invalid' : '')} />
                            <ErrorMessage name="amount" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="term">Loan Terms in Years <h7 style={{ color: 'red'}}>*</h7> </label>
                            <Field name="term" type="text" placeholder = "Enter Email Here" className={'form-control' + (errors.term && touched.term ? ' is-invalid' : '')} />
                            <ErrorMessage name="term" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                        <button type="submit" disabled = {errors.salary || errors.amount || errors.term ||  !touched.salary ||
                        !touched.amount || !touched.term}  className="btn btn-primary mr-2">Sign Up</button>                   
                        </div>
                    </Form>
                )}
            />
        )
    }

}