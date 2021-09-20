import React, { Component } from "react";
import AuthService from "../services/authService";
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';


const passwordRegEx = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[?@#$%^&+=])(?=\S+$).{8,}/

const validationSchema = Yup.object().shape({

    password: Yup.string()
        .matches(passwordRegEx, 'Atleast 8 character long, 1 Uppercase, 1 Lowercase, 1 number, 1 Special Character($, #, @, !,%,^,&,*,(,))')
        .max(50, 'Password cant be more than 50 letters long')
        .required('Password is required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required("Confirm Password is required"),
})

export default class ResetPasswordComponent extends Component {

    componentDidMount() {
        document.title = 'Reset Password'
    }

    render() {
        return (

            <Formik
                initialValues={{
                    password: '',
                    confirmPassword: ''
                }}

                onSubmit={(fields) => {

                    var url_string = window.location.href;
                    var url = new URL(url_string);
                    var email = url.searchParams.get("email");
                    console.log(email);

                    AuthService.resetPassword(fields.password, email);
                    this.props.history.push("/login");
                    window.location.reload();

                }}

                validationSchema={validationSchema}

                render={({ errors, status, touched }) => (
                    <Form>
                        <div id="card">
                            <div id="card-content">
                                    <div className="form-group">
                                        <label className="labelForgetPassword" htmlFor="password">Password <h7 style={{ color: 'red' }}>*</h7> </label>
                                        <Field name="password" type="text" placeholder="Password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label className="labelForgetPassword" htmlFor="confirmPassword">Confirm Password <h7 style={{ color: 'red' }}>*</h7> </label>
                                        <Field name="confirmPassword" type="text" placeholder="Confirm Password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '') } />
                                        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                    </div>
                                    <button className="passwordReset" type="submit" disabled={!touched.password || errors.password || !touched.confirmPassword || errors.confirmPassword}>Send</button>
                                    <p class="message">Not registered? <a href="/signup">Create an account</a></p>
                            </div>
                        </div>

                    </Form>
                )}
            />
        )
    }

}