// Render Prop
import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';

const Basic = () => (
  <div>
    <h1>Any place in your app!</h1>
    <Formik
      initialValues={{projectName: '', owner: '', email: '', description: ''}}
      validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, {setSubmitting}) => {
        console.log(values);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({isSubmitting}) => (
        <Form>

          <Field type="text" name="projectName"/>
          <ErrorMessage name="projectName" component="div"/>
          <Field type="text" name="owner"/>
          <ErrorMessage name="owner" component="div"/>
          <Field type="email" name="email"/>
          <ErrorMessage name="email" component="div"/>
          <Field type="text" name="description"/>
          <ErrorMessage name="password" component="div"/>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Basic;