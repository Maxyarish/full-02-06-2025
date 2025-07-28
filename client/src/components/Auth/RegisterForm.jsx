import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerValidationSchema } from '../../validation/user.validation';
import { registerUserThunk } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from './authForm.module.scss';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error}= useSelector((state) => state.auth);
    const onSubmit = (values) => {
        dispatch(registerUserThunk(values)).unwrap().then(()=>{
            navigate('/login');
        }).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div>
            <Formik  initialValues={{name:'', email: '', password: '' }} onSubmit={onSubmit} validationSchema={registerValidationSchema}>{
                ()=>{
                    return <Form className={styles.form}>
                        {error && <p>Email is already exisr</p>}
                        <h2>Sign Up</h2>
                        <Field name='name' type='text' placeholder='name'/>
                        <ErrorMessage name='name'/>
                        <Field name='email' type='email' placeholder='email'/>
                        <ErrorMessage name='email'/>
                        <Field name='password' type='password' placeholder='password'/>
                        <ErrorMessage name='password'/>
                        <button type='submit' className={styles['btn-submit']}>Register</button>
                    </Form>
                }
}</Formik>
        </div>
    );
}

export default RegisterForm;
