import { ErrorMessage ,Form,Field, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateValidationSchema } from "../../validation/user.validation";
import { updateUserThunk } from "../../store/authSlice";
import styles from "./authForm.module.scss";
const UpdateUserForm = (props) => {
    const {setIsUpdate}=props
  const { user, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    const data ={}
    if(values.name){
      data.name=values.name
    }
     if(values.email){
      data.email=values.email
    }
     if(values.password){
      data.password=values.password
    }
    dispatch(updateUserThunk({ id: user._id, values:data }));
    setIsUpdate(false)
  };
  return (
    <Formik
      initialValues={{
        name: user?.name || ``,
        email: user?.email || ``,
        password: ``,
      }}
      validationSchema={updateValidationSchema}
      onSubmit={onSubmit}
    >
      {() => {
        return  ( 
          <div className={styles['center-container']}>
          <Form className={styles['update-profile']}>
            {error && <p>Email is already exists</p>}
            <h2>Update Profile</h2>
            <Field name="name" type="text" placeholder="Name" />
            <ErrorMessage name="name" />
            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" />
            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" />
            <button type="submit" >
              update
            </button>
          </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default UpdateUserForm;
