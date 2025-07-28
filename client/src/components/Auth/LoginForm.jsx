import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../store/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "../../validation/user.validation";
import styles from "./authForm.module.scss";

const LoginForm = () => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    dispatch(loginUserThunk(values))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={loginValidationSchema}
    >
      {() => (
        <Form className={styles.form}>
          {error && <p>Invalid data</p>}
          <h2>Sing in</h2>
          <Field name="email" type="email" placeholder="email" />
          <ErrorMessage name="email" />
          <Field name="password" type="password" placeholder="password" />
          <ErrorMessage name="password" />
          <button type="submit" className={styles['btn-submit']}>Login</button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
