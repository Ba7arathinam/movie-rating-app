import React from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";

const moviValidationSchema =yup.object({
  email:yup.string().min(10,"need a bigger email😊").required("Email is required 🤷‍♂️"),
  password:yup.string().min(4,"need a bigger password😊").required("password is required 🤷‍♂️"),
});

export function BasicForm() {
  const {handleSubmit,values,handleChange,handleBlur,touched,errors} = useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema:moviValidationSchema,
    onSubmit:(value) => { console.log("form value:",value);},
  });
  return (
      <form  className="add-movie-form" onSubmit={handleSubmit}>
      <input  value={values.email} 
      name="email" type="email" 
      placeholder='Email'
      onBlur={handleBlur} 
      onChange={handleChange}/>
      {errors.email&&touched.email ? errors.email :null}
      <input value={values.password} 
      name="password"type="text" 
      placeholder='Password'
      onBlur={handleBlur} 
      onChange={handleChange}/>
      {errors.password && touched.password ? errors.password :null}
      <button type ="submit" >Submit</button>
      </form>
  );
}
