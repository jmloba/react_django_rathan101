// form validation dipesh malvia
//  https://www.youtube.com/watch?v=EYpdEYK25Dc&t=896s   


import React, { use } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axiosInstance from '../../AxiosInstance'
import ImageUpload from '../functions/ImageUpload'


const EmployeeAdd = () => {
  const [isSubmit, setIsSubmit] = useState(false)
  const navigate = useNavigate()


  const [departmentList, setDepartmentList] = useState([])
  const [genderList, setGenderList] = useState([])

  const [formImage, setFormImage] = useState('');
  const [formErrors, setFormErrors] = useState({})  // empty object

  const initialValues = {

    emp_id: '',
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    dept: '',
    gender: '',
    sal_basic: 0,
    sal_housing: 0,
    sal_transportation: 0


  }

  const [formValues, setFormValues] = useState(initialValues)


  const resetFunction = () => {
    setFormValues({
     
    emp_id: '',
    firstname: '',
    middlename: '',
    lastname: '',

    email: '',

    dept: '',
    gender: '',

    sal_basic: '0',
    sal_housing:0,
    sal_transportation: 0

    })
  }
  const handleImageChange = (e) => {
    setFormImage(e.target.files[0]);
    console.log('Selected file:', formImage);
  }


  const handleChanges = (e) => {
    e.preventDefault();
    console.log('handleChange-event target name and value : ', e.target.name, e.target.value)

    setFormValues({ ...formValues, [e.target.name]: [e.target.value] })
    console.log('handleChange-form values are : ', formValues)
  }
  const validate = (values) => {
    const errors = {}
    // regex used to validate email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.emp_id) {
      errors.emp_id = 'Employee Id is required'
    }
    if (!values.firstname) {
      errors.firstname = 'Firstname is required'
    }
    if (!values.middlename) {
      errors.middlename = 'Middlename is required'
    }
    if (!values.lastname) {
      errors.lastname = 'Lastname is required'
    }
     // *** Here is how to use the regex for email validation ***
    if (!values.email) {
      errors.email = 'Email is required'
    }else if(!regex.test(values.email)){
      errors.email = 'This is not a valid email format'
    }
    if (!values.dept) {
      errors.dept = 'department  is required'
    }
    if (!values.gender) {
      errors.gender = 'gender is required'
    }

    if (!values.sal_basic) {
      errors.sal_basic= 'basic salary is required'
    }else if (isNaN(values.sal_basic)) {
      errors.sal_basic = 'basic salary must be a number'
    } else if (Number(values.sal_basic) < 0) {
      errors.sal_basic = 'basic salary must be non-negative'
    } 
    if (!values.sal_transportation) {
      errors.sal_transportation= 'transportation allowance is required'
    }else if (isNaN(values.sal_transportation)) {
      errors.sal_transportation = 'transportation allowance must be a number'
    } else if (Number(values.sal_transportation) < 0) {
      errors.sal_transportation = 'transportation allowance must be non-negative'
    } 
    if (!values.sal_housing) {
      errors.sal_housing= 'housing allowance is required'
    }else if (isNaN(values.sal_housing)) {
      errors.sal_housing = 'housing allowance must be a number'
    } else if (Number(values.sal_housing) < 0) {
      errors.sal_housing = 'housing allowance must be non-negative'
    } 


    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // setFormErrors(validate(formValues))
    const errors = validate(formValues);
    setFormErrors(errors);
    // setIsSubmit(true)
    console.log('handleSubmit - form values are : ', formValues)
    if (Object.keys(formErrors).length === 0) {
      setIsSubmit(true)

      const payload = {
            emp_id       : String(formValues.emp_id || '').trim(),
            firstname    : String(formValues.firstname || '').trim(),
            middlename   : String(formValues.middlename || '').trim(),
            lastname     : String(formValues.lastname || '').trim(),
            email        : String(formValues.email || '').trim() || null, // Allow null if optional in Django model
        designation : 'test designation', 

        deptname: parseInt(formValues.dept),
        
        gender : parseInt(formValues.gender), 
        
        employee_salary: [
          {
          sal_basic: Number(formValues.sal_basic) || 0.0,
          sal_transportation: Number(formValues.sal_transportation) || 0.0,
          sal_housing: Number(formValues.sal_housing) || 0.0,
          }
        ]
      };

      if (!payload.lastname || !payload.firstname || !payload.emp_id) {
            console.error("Required fields are empty after cleaning. Stopping submission.");
            setIsSubmit(false);
            return;
        }
 
      try {
        const response = await axiosInstance.post('/employees/', payload )
        console.log('Full API response (Employee and Salary created):', response.data);
        console.log('Employee and salary data submitted successfully!');
        navigate('/employees')
      } catch (error) {
        console.error('Error submitting employee and salary data:', error.response ? error.response.data : error.message);
        // Handle errors
      }

    
    } else{
      console.log('handleSubmit - form errors are : ', formErrors)
      console.log("Validation failed on client side, stopping submission.");
      console.log("Errors:", errors);
    }
  }




  useEffect(
    () => {
      const fetchProtectedData = async () => {
        try {
          // department
          const response_dept = await axiosInstance.get('/department/')
          setDepartmentList(response_dept.data)
          console.log('useEffect department list :', response_dept)

          const response_gender = await axiosInstance.get('/gender/')
          setGenderList(response_gender.data)
          console.log('useEffect gender list :', response_gender)
        } catch (error) {
          console.log('\n error (fetchProtectedData )fetching department', error.response_dept)
        }
      }
      fetchProtectedData();
    }, []
  )
  useEffect(
    () => {
      console.log('useEffect - form errors changed:', formErrors)
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log('useEffect - No form errors, form submitted successfully')
      }
    }, [formErrors]
  )

  return (
    <>
      <div className="container">
        <h1 className='text-center'>Employee Entry</h1>
        <div className="row">
          <div className="col-md-8">

            <form onSubmit={handleSubmit} enctype="multipart/form-data">
              {/* empid */}
              <div className="row">
                <dif className="form-group">
                  <label htmlFor="emp_id" className='col-md-4'>Employee Id*</label>
                  <input type="text"
                    placeholder='Enter Employee Id'
                    className='form-control col-md-8'
                    name='emp_id'
                    value={formValues.emp_id}
                    onChange={(e) => handleChanges(e)}
                  />
                  <div className="form-errors">
                    <p>{formErrors.emp_id}</p>
                  </div>


                </dif>
              </div>
              {/* firstname, middlename, lastname  rows */}
              <div className="row">
                {/* firstname */}
                <dif className="form-group col-md-4">
                  <label htmlFor="firstnamne" className='col-md-4'>Firstname*</label>
                  <input type="text"
                    placeholder='First Name'
                    className='form-control col-md-8'
                    name='firstname'
                    value={formValues.firstname}
                    onChange={(e) => handleChanges(e)}
                  />
                  <div className="form-errors">
                    <p>{formErrors.firstname}</p>
                  </div>



                </dif>


                {/* middlename */}
                <div className="form-group col-md-4">
                  <label htmlFor="middlename" className='col-md-4'>Middle Name*</label>
                  <input type="text"
                    placeholder='Middle Name'
                    className='form-control col-md-8'
                    name='middlename'
                    value={formValues.middlename}
                    onChange={(e) => handleChanges(e)}

                  />
                  <div className="form-errors">
                    <p>{formErrors.middlename}</p>
                  </div>


                </div>

                {/* lastname */}
                <dif className="form-group col-md-4">
                  <label htmlFor="lastname" className='col-md-4'>last Name*</label>
                  <input type="text"
                    placeholder='Middle Name'
                    className='form-control col-md-8'
                    name='lastname'
                    value={formValues.lastname}
                    onChange={(e) => handleChanges(e)}
                  />
                  <div className="form-errors">
                    <p>{formErrors.lastname}</p>
                  </div>


                </dif>
              </div>
              {/* email,dept,gender row */}
              <div className="row">
                <div className="form-group col-md-4">
                  <label htmlFor="email" className='col-md-4'>Email</label>
                  <input type="email"
                    placeholder='Email'
                    className='form-control col-md-8'
                    name='email'

                    value={formValues.email}
                    onChange={(e) => handleChanges(e)}
                  />
                  <div className="form-errors">
                    <p>{formErrors.email}</p>
                  </div>


                </div>
                <div className="form-group col-md-4 ">
                  <label className="col-sm-4  ">Department name </label>
                  <div className="col-sm-8">
                    <select name="dept" id="selectDepartment"
                      className='form-select'
                      // onChange={(e)=>setFormValues({...formValues, dept: e.target.value})}
                      onChange={(e) => handleChanges(e)}
                    >
                      {
                        departmentList.map(
                          (department, index) => (
                            <option key={index} value={department.id}>{department.deptname}</option>
                          )
                        )
                      }
                    </select>

                    <div className="form-errors">
                      <p>{formErrors.dept}</p>
                    </div>
                  </div>
                </div>


                <div className="form-group col-md-4 ">
                  <label className="col-sm-4  ">Gender</label>
                  <div className="col-sm-8">
                    <select name="gender" id="selectGender"
                      className='form-select'
                      // onChange={(e)=>setFormValues({...formValues, dept: e.target.value})}
                      onChange={(e) => handleChanges(e)}
                    >
                      {
                        genderList.map(
                          (gender, index) => (
                            <option key={index} value={gender.id}>{gender.gender}</option>
                          )
                        )
                      }
                    </select>

                    <div className="form-errors">
                      <p>{formErrors.dept}</p>
                    </div>

                  </div>
                </div>
              </div>

              {/* basic salary row */}

              <div className="row">
                {/* --  basic -- */}
                <div className="form-group col-md-4">
                  <label htmlFor="email" className='col-md-4'>Basic Salary </label>
                  <input type="number"
                    placeholder='Basic Salary'
                    className='form-control col-md-8'
                    name='sal_basic'

                    value={formValues.sal_basic}
                    onChange={(e) => handleChanges(e)}
                  />
                  <div className="form-errors">
                    <p>{formErrors.sal_basic}</p>
                  </div>


                </div>


                {/* --  transpo -- */}
                <div className="form-group col-md-4">
                  <label htmlFor="email" className='col-md-4'>Transportation Allowance </label>
                  <input type="number"
                    placeholder='Transportation'
                    className='form-control col-md-8'
                    name='sal_transportation'

                    value={formValues.sal_transportation}
                    onChange={(e) => handleChanges(e)}
                  />
                  <div className="form-errors">
                    <p>{formErrors.sal_transportation}</p>
                  </div>


                </div>                
                {/* --  housing -- */}
                <div className="form-group col-md-4">
                  <label htmlFor="email" className='col-md-4'>Housing Allowance (Yearly) </label>
                  <input type="number"
                    placeholder='Housing'
                    className='form-control col-md-8'
                    name='sal_housing'

                    value={formValues.sal_housing}
                    onChange={(e) => handleChanges(e)}
                  />
                  <div className="form-errors">
                    <p>{formErrors.sal_housing}</p>
                  </div>


                </div>        
              </div>


              {/* image row */}
              <div className="row">
                {/* <div className="form-group col-md-6 ">
                  <label htmlFor="image" className='col-md-4'>Image</label>
                  <input type="file"
                    className='form-control col-md-8'
                    name='image'
                    onChange={(e) => handleImageChange(e)}
                  />
                </div> */}
              </div>
              {/* button rows */}
              <div className="row">

                <div className="row buttons mt-3 col-md-6" >
                  <div className="col-md-6 mb-3">
                    <button className='btn btn-primary' type='submit'>Submit</button>
                  </div>
                  <div className="col-md-6 mb-3">
                    <button className='btn btn-primary' type='button'
                      onClick={resetFunction}
                    >Reset</button>
                  </div>

                </div>

              </div>

            </form>
          </div>

          <div className="form-values col-md-3 offset-md-1">
            {Object.keys(formErrors).length === 0 && isSubmit ?
              (
                <div className="ui message success">
                  <pre> {JSON.stringify(formValues, undefined, 2)} </pre>
                </div>) :
              (<pre>
                {JSON.stringify(formValues, undefined, 2)}
              </pre>)}

            (<pre>
              {formImage && JSON.stringify(formImage.name, undefined, 2)}
            </pre>)
          </div>



        </div>
        <div className="form">






        </div>

      </div>
    </>
  )
}

export default EmployeeAdd