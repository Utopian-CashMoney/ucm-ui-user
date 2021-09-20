import React, { Component } from "react";
import AccountService from "../services/accountService"
import AuthService from "../services/authService";
import { Redirect } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({

    email: Yup.string()
        .max(100, 'Email cant be longer than 100 characters')
        .email('Email is invalid')
        .required('Email is required'),
})

export default class ForgetPasswordComponent extends Component {

    componentDidMount() {
        document.title = 'Forget Password'
    }

    render() {
        return (

            <Formik
                initialValues={{
                    email: ''
                }}


                onSubmit={(fields) => {

                    AuthService.forgetPassword(fields.email);

                    this.props.history.push("/forgetPasswordEmail");
                    window.location.reload();

                    <div>Hello</div>

                }}

                validationSchema={validationSchema}

                render={({ errors, status, touched }) => (
                    <Form>
                        <div id="card2">
                            <div id="card-content2">
                                <div className="form-group">
                                    <label className="labelForgetPassword" className="forgetEmail" htmlFor="email">Email <h7 style={{ color: 'red' }}>*</h7> </label>
                                    <Field name="email" type="text" placeholder="Enter Email Here" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} className="forgetPasswordField" />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
                                <button className="forgetSend" type="submit" disabled={!touched.email || errors.email}>Send</button>
                                <p class="message">Not registered? <a href="/signup">Create an account</a></p>
                            </div>
                        </div>
                    </Form>
                )}
            />
        )
    }

}