import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import AuthService from "../services/authService";

const userNameRegEx = /^[a-zA-Z0-9_.-]*$/
const passwordRegEx = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[?@#$%^&+=])(?=\S+$).{8,}/
const phoneRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
const firstLastNameRegEx = /^[a-zA-Z]+$/
const cityStateRegEx = /^[A-Za-z]+$/
const zipcodeRegEx = /^[0-9]+$/;

const validationSchema = Yup.object().shape({

    username: Yup.string()
        .matches(userNameRegEx, 'No special characters allowed')
        .required('Username is required!'),

    email: Yup.string()
        .max(100, 'Email cant be longer than 100 characters')
        .email('Email is invalid')
        .required('Email is required!'),

    phone: Yup.string()
        .matches(phoneRegEx, 'Phone number is not valid')
        .max(12, 'Phone cant be more than 12 letters long')
        .required('Phone is required!'),

    first_name: Yup.string()
        .matches(firstLastNameRegEx, 'Special Characters and numbers are not allowed')
        .max(25, 'First Name cant be more than 25 letters long')
        .required('First Name is required!'),

    last_name: Yup.string()
        .matches(firstLastNameRegEx, 'Special Characters and numbers are not allowed')
        .max(25, 'Last Name cant be more than 25 letters long')
        .required('Last Name is required!'),
    
    address: Yup.string()
    .max(300, 'Address cant be more than 300 letters long')
    .required('Address is required!'),

    city: Yup.string()
    .matches(cityStateRegEx, 'Special Characters and numbers are not allowed')
    .max(50, 'City cant be more than 50 letters long')
    .required('city is required!'),

    state: Yup.string()
    .matches(cityStateRegEx, 'Special Characters and numbers are not allowed')
    .max(50, 'State cant be more than 50 letters long')
    .required('state is required!'),
    
    zipcode: Yup.string()
    .matches(zipcodeRegEx, 'Only numbers allowed')
    .max(9, 'Zipcode cant be more than 9 numbers long')
    .required('Zipcode is required!')

})


export default class UpdateUserProfileComponent extends Component {
    render() {

        const UserInfo = this.props.location.state;
        return (
            <Formik
                initialValues={{
                    username: UserInfo.username,
                    email: UserInfo.email,
                    phone: UserInfo.phone,
                    first_name: UserInfo.firstName,
                    last_name: UserInfo.lastName,
                    address: UserInfo.address,
                    city: UserInfo.city,
                    state: UserInfo.state,
                    zipcode: UserInfo.zipcode
                }}

                validationSchema={validationSchema}

                onSubmit={(fields) => {

                    AuthService.updateUserInfo(AuthService.getCurrentUser().id, fields.username, fields.email, fields.password,
                        fields.phone, fields.first_name, fields.last_name, fields.address,
                        fields.city, fields.state, fields.zipcode)
                        .then(
                            () => {
                                this.props.history.push({
                                    pathname: '/profile',
                                    state: {
                                    }
                                })
                                window.location.reload();
                            },
                        );
                }}


                render={({ errors, status, touched }) => (

                    <Form>
                        <div className="form-group">
                            <label htmlFor="username">UserName <h7 style={{ color: 'red' }}>*</h7> </label>
                            <Field name="username" type="text" placeholder={UserInfo.username} disabled={true} className={'form-control' + (errors.username ? ' is-invalid' : '')} />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email <h7 style={{ color: 'red' }}>*</h7> </label>
                            <Field name="email" type="text" placeholder={UserInfo.email} className={'form-control' + (errors.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone <h7 style={{ color: 'red' }}>*</h7> </label>
                            <Field name="phone" type="text" placeholder={UserInfo.phone} className={'form-control' + (errors.phone ? ' is-invalid' : '')} />
                            <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="first_name">First Name <h7 style={{ color: 'red' }}>*</h7> </label>
                            <Field name="first_name" type="text" placeholder={UserInfo.firstName} disabled={true} className={'form-control' + (errors.first_name ? ' is-invalid' : '')} />
                            <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Last Name <h7 style={{ color: 'red' }}>*</h7> </label>
                            <Field name="last_name" type="text" placeholder={UserInfo.lastName} disabled={true} className={'form-control' + (errors.last_name ? ' is-invalid' : '')} />
                            <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                             <label htmlFor="address">Address <h7 style={{ color: 'red'}}>*</h7> </label>
                             <Field name="address" type="text" placeholder = "Enter Address Here" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
                             <ErrorMessage name="address" component="div" className="invalid-feedback" />
                         </div>
                         <div className="form-group">
                             <label htmlFor="city">City <h7 style={{ color: 'red'}}>*</h7> </label>
                             <Field name="city" type="text" placeholder = "Enter City Here" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} />
                             <ErrorMessage name="city" component="div" className="invalid-feedback" />
                         </div>
                         <div className="form-group">
                             <label htmlFor="state">State <h7 style={{ color: 'red'}}>*</h7> </label>
                             <Field name="state" type="text" placeholder = "Enter State Here" className={'form-control' + (errors.state && touched.state ? ' is-invalid' : '')} />
                             <ErrorMessage name="state" component="div" className="invalid-feedback" />
                         </div>
                         <div className="form-group">
                             <label htmlFor="zipcode">Zipcode <h7 style={{ color: 'red'}}>*</h7> </label>
                             <Field name="zipcode" type="text" placeholder = "Enter Zipcode Here" className={'form-control' + (errors.zipcode && touched.zipcode ? ' is-invalid' : '')} />
                             <ErrorMessage name="zipcode" component="div" className="invalid-feedback" />
                         </div>

                        <div className="form-group">
                            <button type="submit" disabled={errors.username || errors.email || errors.phone || errors.first_name || errors.last_name || errors.address ||
                            errors.city || errors.state || errors.zipcode} className="btn btn-primary mr-2">Update</button>
                        </div>
                    </Form>
                )}
            />
        )
    }

}
