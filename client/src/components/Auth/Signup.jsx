import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { setUser } from '../../walletstore/userSlice'
import { setWallet } from '../../walletstore/walletSlice'
import { useDispatch } from 'react-redux'

export default function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialValues = {
    name: '',
    email: '',
    cnic: '',
    contact: '',
    address: '',
    role: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contact: Yup.string().required('Contact number is required'),
    address: Yup.string().required('Address is required'),
    cnic: Yup.string().required('CNIC is required'),
    role: Yup.string().required('Role is required'),
    password: Yup.string().required('Password is required'),
  });


  const onSubmit = async (values, { setSubmitting }) => {
    try {
      handleSignup(values);
    } catch (error) {
      console.error('Submition failed:', error);
    }
    setSubmitting(false);
  };

  const handleSignup = (values) => {
    try {
      axios.post(`http://localhost:5000/sign_up`, {
        name: values.name,
        email: values.email,
        address: values.address,
        contact: values.contact,
        cnic: values.cnic,
        role: values.role,
        password: values.password,
      }).then((res)=>{
        if (res.data.token){
          localStorage.setItem('token', res.data.token)
          dispatch(setUser(res.data.user))
          dispatch(setWallet(res.data.wallet))
          navigate('/')
        }
      }).catch((error)=>{
        toast.error(error.message)
      })
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded p-8 shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Name:</label>
              <Field type="text" name="name" id="name" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email:</label>
              <Field type="email" name="email" id="email" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="cnic" className="block mb-2">CNIC:</label>
              <Field type="text" name="cnic" id="cnic" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="cnic" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="contact" className="block mb-2">Contact:</label>
              <Field type="text" name="contact" id="contact" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="contact" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block mb-2">Role:</label>
              <Field as="select" name="role" id="role" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500">
                <option value="" disabled>
                  Select a role
                </option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block mb-2">Address:</label>
              <Field type="text" name="address" id="address" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">Password:</label>
              <Field type="password" name="password" id="password" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
      <p className="mt-4">Already have an account? <Link to="/" className="text-blue-500">Login</Link></p>
    </div>
  );
}