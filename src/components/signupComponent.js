import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import AuthService from "../services/authService";

const userNameRegEx = /^[a-zA-Z0-9_.-]*$/
const passwordRegEx = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[?@#$%^&+=])(?=\S+$).{8,}/
const phoneRegEx = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
const firstLastNameRegEx = /^[a-zA-Z]+$/





const validationSchema = Yup.object().shape({
                    
    username: Yup.string()
    .matches(userNameRegEx, 'No special characters allowed')
    .required('Username is required'),

    email: Yup.string()
        .max(100, 'Email cant be longer than 100 characters')
        .email('Email is invalid')
        .required('Email is required'),

    password: Yup.string()
        .matches(passwordRegEx, 'Atleast 8 character long, 1 Uppercase, 1 Lowercase, 1 number, 1 Special Character')
        .max(50, 'Password cant be more than 50 letters long')
        .required('Password is required'),

    phone: Yup.string()
        .matches(phoneRegEx, 'Phone number is not valid')
        .max(12, 'Phone cant be more than 12 letters long')
        .required('Phone is required'),

    first_name:  Yup.string()
        .matches(firstLastNameRegEx, 'Special Characters and numbers are not allowed')
        .max(25, 'First Name cant be more than 25 letters long')
        .required('First Name is required'),

    last_name:  Yup.string()
        .matches(firstLastNameRegEx, 'Special Characters and numbers are not allowed')
        .max(25, 'Last Name cant be more than 25 letters long')
        .required('Last Name is required') 
   
})


export default class signupComponent extends Component {
    render() {        
        return (
            <Formik 
                initialValues={{
                    username:'',
                    email: '',
                    password: '',
                    phone: '',
                    first_name:'',
                    last_name:'',
                }}  

                validationSchema = {validationSchema}

                onSubmit={(fields) => {

                    AuthService.signup(fields.username, fields.email, fields.password,
                        fields.phone, fields.first_name, fields.last_name)
                        .then(
                        () => {
                          this.props.history.push("/login");
                          window.location.reload();                        

                        },
                      );                          
                      
                }}
                
                        
                render={({ errors, status, touched }) => (
                    
                    <Form>
                      
                      <div className="form-group">
                            <label htmlFor="username">UserName <h7 style={{ color: 'red'}}>*</h7> </label>
                             <Field name="username" type="text" placeholder = "Enter Username Here" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                             <ErrorMessage name="username" component="div" className="invalid-feedback" />
                         </div>
                        <div className="form-group">
                            <label htmlFor="email">Email <h7 style={{ color: 'red'}}>*</h7> </label>
                            <Field name="email" type="text" placeholder = "Enter Email Here" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password <h7 style={{ color: 'red'}}>*</h7> </label>
                            <Field name="password" type="password" placeholder = "Enter Password Here" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                             <label htmlFor="phone">Phone <h7 style={{ color: 'red'}}>*</h7> </label>
                             <Field name="phone" type="text" placeholder = "Enter Phone Here" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                             <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                         </div>
                         <div className="form-group">
                             <label htmlFor="first_name">First Name <h7 style={{ color: 'red'}}>*</h7> </label>
                             <Field name="first_name" type="text" placeholder = "Enter First Name Here" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} />
                             <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                         </div>
                         <div className="form-group">
                             <label htmlFor="last_name">Last Name <h7 style={{ color: 'red'}}>*</h7> </label>
                             <Field name="last_name" type="text" placeholder = "Enter Last Name Here" className={'form-control' + (errors.last_name && touched.last_name ? ' is-invalid' : '')} />
                             <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                         </div>

                        <div className="form-group">
                        <button type="submit" disabled = {errors.username || errors.email || errors.password || errors.phone || errors.first_name || errors.last_name || !touched.username ||
                        !touched.email || !touched.password || !touched.phone || !touched.first_name || !touched.last_name}  className="btn btn-primary mr-2">Register</button>
                            
                        </div>
                    </Form>
                )}
            />
        )
    }

}