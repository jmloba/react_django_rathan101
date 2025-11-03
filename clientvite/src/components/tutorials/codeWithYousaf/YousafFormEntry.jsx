// https://www.youtube.com/watch?v=H63Pd_lXkeQ&t=1135s
//https://www.youtube.com/watch?v=H63Pd_lXkeQ&t=1135s

import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axiosInstance from '../../../AxiosInstance'

const YousafFormEntry = () => {
  const [isSubmit, setIsSubmit] = useState(false)

  const [formErrors, setFormErrors] = useState({})  // empty object
  const [formValues, setFormValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    contact: '',
    subject: '',
    resume: '', // file
    url: '',
    about: ''

  })
  const handleChanges = (e) => {
    e.preventDefault();
    setFormValues({ ...formValues, [e.target.name]: [e.target.value] })
    console.log('handleChange-form values are : ', formValues)
  }
  const handleReset = (e) => {
    e.preventDefault()
    console.log('Reset pressed')
    setFormValues({ firstname: '', lastname: 'xxx', email: '' })


  }


  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.firstname) {
      errors.firstname = 'Firstname is required'
    }
    if (!values.lastname) {
      errors.lastname = 'Lastname is required'
    }
    if (!values.email) {
      errors.email = 'Email is required'
    }

    if (!values.contact) {
      errors.contact = 'Contact is required'
    }
    if (!values.gender) {
      errors.gender = 'Gender is required'
    }
    if (!values.subject) {
      errors.subject = 'Subject is required'
    }
    if (!values.resume) {
      errors.resume = 'Resume is required'
    }
    if (!values.url) {
      errors.url = 'URL is required'
    }
    if (!values.about) {
      errors.about = 'About is required'
    }
    console.log('errors are :', errors)
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('on submit -->> values are:', formValues)
    setFormErrors(validate(formValues))
    setIsSubmit(true)

  }
  const saveData = () => {
    console.log('save data')

  }

  // when form errors change
  useEffect(
    () => {
      console.log('form errors :', formErrors)
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log('form values are', formValues)


        // alert('no more errors')
        saveData()

      } else {
        alert('form error' + Object.keys(formErrors).length)
      }

    }, [formErrors]

  )
  return (
    <>
      <div className="container">
        <h1>Form entry</h1>
        <form onSubmit={handleSubmit}>

          <div className="row ">
            {/* firstnamne */}
            <div className="form-group mb-3 col-md-6">
              <label htmlFor="firstname" className='col-md-4'>First Name*</label>
              <input type="text"
                placeholder='Enter Firstname'
                className='form-control col-md-8'
                name='firstname'
                values={formValues.firstname}
                onChange={(e) => handleChanges(e)}
              />
              <div className="form-errors">
                <p>{formErrors.firstname}</p>
              </div>
            </div>
            {/* lastname */}
            <div className="form-group mb-3  col-md-6">
              <label htmlFor="lastname" className='col-md-4'>Last Name*</label>
              <input type="text"
                placeholder='Enter LastName'
                className='form-control col-md-8'
                name='lastname'
                values={formValues.lastname}

                onChange={(e) => handleChanges(e)}

              />
              <div className="form-errors">
                <p>{formErrors.lastname}</p>
              </div>
            </div>
          </div>
          <div className="row">
            {/* email */}
            <div className="form-group mb-3  col-md-6 ">
              <label htmlFor="email" >Email*</label>
              <input type="email"
                placeholder='Enter Email '
                className='form-control'
                name='email'
                values={formValues.email}
                onChange={(e) => handleChanges(e)}
              />
              <div className="form-errors">
                <p>{formErrors.email}</p>
              </div>
            </div>
            {/* contact */}
            <div className="form-group mb-3  col-md-6">
              <label htmlFor="contact" >Contact*</label>
              <input type="text"
                placeholder='Enter Phone number'
                className='form-control'
                name='contact'
                values={formValues.contact}
                onChange={(e) => handleChanges(e)}
              />
              <div className="form-errors">
                <p>{formErrors.contact}</p>
              </div>

            </div>
          </div>
          <div className="row">
            {/* gender */}
            <div className="form-group mb-3 col-md-6 ">
              <div className="gender-group">
                <label htmlFor="gender" >Gender*</label>
                <input type="radio"
                  name='gender' 
                  value='1'
                  values={formValues.gender}  
                  onChange={(e) => handleChanges(e)} /> Male
                <input type="radio" 

                  name='gender' 
                  value='2'
                  values={formValues.gender} 
                  onChange={(e) =>  handleChanges(e)} /> Female
                <input type="radio" 
                  values={formValues.gender} 
                  name='gender' 
                  value='3'
                onChange={(e) => handleChanges(e)} /> Other

              </div>

              <div className="form-errors">
                <p>{formErrors.gender}</p>
              </div>

            </div>
            {/* subject */}
            <div className="form-group mb-3 col-md-6 ">
              <label htmlFor="subject">Subject</label>
              <select name="subject" id="subject" className='form-control'
                onChange={(e) => handleChanges(e)}>
                <option value="1">Math</option>
                <option value="2">Physics</option>
                <option value="3">English</option>
              </select>

              <div className="form-errors">
                <p>{formErrors.subject}</p>
              </div>
            </div>
          </div>
          <div className="row">
          {/* resume */}
          <div className="form-group mb-3  col-md-6">
            <label htmlFor="resume">Resume</label>
            <input type="file"
              className='form-control'
              placeholder='select file'
              name='resume'
              onChange={(e) => handleChanges(e)}
            />
            <div className="form-errors">
              <p>{formErrors.resume}</p>
            </div>

          </div>
          {/* url */}
          <div className="form-group mb-3  col-md-6">
            <label htmlFor="url">URL</label>
            <input type="text" name='url'
              placeholder='enter url'
              onChange={(e) => handleChanges(e)}
            />
            <div className="form-errors">
              <p>{formErrors.url}</p>
            </div>

          </div>
          </div>





          {/* about */}
          <div className="form-group mb-3  ">
            <label htmlFor="about">about</label>
            <textarea name="about" id="" cols="30" rows='10'
              placeholder='about'
              onChange={(e) => handleChanges(e)}
            ></textarea>
            <div className="form-errors">
              <p>{formErrors.about}</p>
            </div>


          </div>
          {/* button area */}
          <div className="button-area mt-3">
            <button type='button'
              className='btn btn-warning btn-sm '
              onClick={handleReset}
            >Reset</button>
            <button type='submit'

              className='btn btn-primary btn-sm '
            >Submit</button>
          </div>

        </form>
        <div className='form-values'>
          {Object.keys(formErrors).length === 0 && isSubmit ?
            (
              <div className="ui message success">
                data validated
   <pre>

                {JSON.stringify(formValues, undefined, 3)}
              </pre>
              </div>

            ) : (
              <pre>

                {JSON.stringify(formValues, undefined, 3)}
              </pre>

            )}
        </div>



      </div>
    </>

  )
}

export default YousafFormEntry