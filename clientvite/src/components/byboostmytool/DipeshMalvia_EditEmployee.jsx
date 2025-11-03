

import React from 'react'
import './../../assets/css/formcss.css'
import { useState, useEffect } from 'react'
import axiosInstance from '../../AxiosInstance'
import { useNavigate, useParams } from 'react-router-dom'

const DipeshMalvia_EditEmployee = () => {

  const params = useParams()
  const [departmentList, setDepartmentList] = useState([])

  const [initialData,setInitialData] = useState({})


  const [genderList, setGenderList] = useState([])
  const [formErrors, setFormErrors] = useState({})  // empty object
  const [isSubmit, setIsSubmit] = useState(false)
  const navigate=useNavigate()
  

  const initialValues = {
    emp_id: "",
    emp_name: "",
    email: "",
    deptname: '1',
    gender: '2',
    designation :''
  }



  const [formValues, setFormValues] = useState(initialData)
  const handleImage =(e)=>{
    setEmpImage(e.target.files[0])
    setFormValues

  }
  const handleChange = (e) => {
    e.preventDefault()
    // console.log('handle change input fields', e.target)
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value })
    console.log('handleChange-form values are : ', formValues)


  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
     

  }

  const saveData= async()=>{
    const formData = new FormData()

    formData.append('emp_id',formValues.emp_id)
    formData.append('emp_name',formValues.emp_name)
    formData.append('email',formValues.email)
    formData.append('designation',formValues.designation)
    formData.append('deptname',formValues.deptname)
    formData.append('gender',formValues.gender)


    
    try{
      const response = await axiosInstance.put(`/employees/${params.id}/`,formData,
        {
          headers: {'Content-Type':'multipart/form-data' }
        }
        )
   
        console.log('response after saving:', response.data)
        // clear errors
        navigate('/')

  }catch(error){
      console.log(' boost my tool ', error.response)
    }


    alert('data saved', formValues)
  }

  useEffect(
    () => {
      console.log('form errors :', formErrors)
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log('form values are', formValues)
        alert('no more errors')
        saveData()

      }
    }, [formErrors]

  )
  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.emp_id) {
      errors.emp_id = 'Employee Id is required'

    }
    if (!values.emp_name) {
      errors.emp_name = 'Employee Name is required'

    } else if(values.emp_name.length <3){
      errors.emp_name = 'Name length  should be >3'

    }else if(values.emp_name.length >15){
      errors.emp_name = 'Name length  should be >15'

    }


    if (!values.email) {
      errors.email = 'Email is required'

    }else if(!regex.test(values.email)){
      errors.email = 'not a valid email'
    }
       if (!values.designation) {
      errors.designation = 'designation is required'

    }



    return errors

  }
  // department useEffect
  useEffect(
    () => {
      const fetchProtectedData = async () => {
        try {
          // department
          const response_dept = await axiosInstance.get('/department/')
          setDepartmentList(response_dept.data)
          console.log('useEffect department list :', response_dept)
        } catch (error) {
          console.log('\n error (fetchProtectedData )fetching department', error.response_dept)
        }
      }
      fetchProtectedData();
    }, []
  )
  // gender useEffect
  useEffect(
    () => {
      const fetchGenderProtectedData = async () => {
        try {
          // gender
          const response_gender = await axiosInstance.get('/gender/')
          setGenderList(response_gender.data)
          console.log('useEffect Gender list :', response_gender)
        } catch (error) {
          console.log('\n error (fetchProtectedData )fetching gender', error.response_gender)
        }
      }
      fetchGenderProtectedData();
    }, []
  )
  // edit data useEffect
  useEffect(
    () => {
      const fetchEditProtectedData = async () => {
        try {
          // record
          const response = await axiosInstance.get('/employees/'+params.id)
          setInitialData(response.data)
          setFormValues(response.data)
          
          console.log('useEffect edit record :', response.data)
        } catch (error) {
          console.log('\n error (fetchProtectedData )fetching gender', error.response)
        }
      }
      fetchEditProtectedData();
    }, []
  )



  return (
    <>
      <div className="container ">
        <h2>Edit Employee(Dipesh)</h2>

        <div className="form-main " >
          
          <div className="field">
                  <label htmlFor="">Id</label>
                  <input type="text"
                    className='form-control-plaintext'
                    defaultValue={params.id}
                    readonly
                  />
          </div>
          
          { initialData &&
            <form action="" onSubmit={handleFormSubmit}>
         
            <div className="ui form">
              {/* ------ emp_id--------- */}
              <div className="field">
                <label htmlFor="">Employee Id</label>
                <input type="number"
                  className='form-control'
                  name="emp_id"
                  defaultValue={initialData.emp_id}
                  
                  values={formValues.emp_id}
                  
                  placeholder="Employee Id"
                  onChange={handleChange}
                />
                <div className="form-errors">
                  <p>{formErrors.emp_id}</p>
                </div>


              </div>
              {/* ------ emp_name--------- */}
              <div className="field">
                <label htmlFor="">Name</label>
                <input type="text"
                  className='form-control'
                  name="emp_name"
                  defaultValue={initialData.emp_name}
                  values={formValues.emp_name}

                  placeholder=" Name"

                  onChange={handleChange}
                />
                <div className="form-errors">
                  <p>{formErrors.emp_name}</p>
                </div>

              </div>
              {/* ------ email--------- */}

              <div className="field">
                <label htmlFor="">Email</label>
                <input type="text"
                  className='form-control'
                  placeholder="Email"
                  name='email'
                  defaultValue={initialData.email}
                  values={formValues.email}
                  onChange={handleChange}

                />
                <div className="form-errors">
                  <p>{formErrors.email}</p>
                </div>


              </div>
            {/* ------ designation--------- */}

              <div className="field">
                <label htmlFor="">Designation</label>
                <input type="text"
                  className='form-control'
                  placeholder="Designation"
                  name='designation'
                  defaultValue={initialData.designation}
                  values={formValues.designation}
                  onChange={handleChange}

                />
                <div className="form-errors">
                  <p>{formErrors.designation}</p>
                </div>


              </div>              
              {/* ------ deptname--------- */}

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Department name </label>
                <div className="col-sm-8">
                  <select name="deptname" id="selectDepartment"
                    className='form-select' onChange={handleChange}
                    defaultValue={initialData.deptname}
                    values={formValues.deptname}
                  >
                    {
                      departmentList.map(
                        (department, index) => (
                          <option key={index} value={department.id}>{department.deptname}</option>
                        )
                      )
                    }
                  </select>


                </div>
                <div className="form-errors">
                  <p>{formErrors.deptname}</p>
                </div>
              </div>
              {/* ------ gender--------- */}

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Gender name </label>
                <div className="col-sm-8">
                  <select name="gender" id="selectGender"
                    className='form-select' onChange={handleChange}
                    defaultValue={initialData.gender}
                    values={formValues.gender}
                  >
                    {
                      genderList.map(
                        (gender, index) => (
                          <option key={index} value={gender.id}>{gender.gender}</option>
                        )
                      )
                    }
                  </select>


                </div>
                <div className="form-errors">
                  <p>{formErrors.gender}</p>
                </div>
              </div>


          {/* ------ display image--------- */}

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label"> Image </label>
            <div className=" offset-sm-4 col-sm-8">
                <img src={initialData.image} alt="..." 
               width={"80"}
                />
        
            </div>
  
          </div>  
          {/* creation date */}
        <div className="row mb-3">
            <label className="col-sm-4 col-form-label"> Created at </label>
            <div className=" offset-sm-4 col-sm-8">

        
            </div>
  
          </div>                         
          {/* ------ button--------- */}
              <button type='submit'
                className='fluid btn btn-primary'
              >Submit</button>


            </div>

          </form>

          }
        </div>

        <div className='form-values'>
          {Object.keys(formErrors).length === 0 && isSubmit?
          (
            <div className="ui message success"> 
               data validated
               
            </div>

          ):(
          <pre>
            {JSON.stringify(formValues, undefined, 2)}
          </pre>

          )}
        </div>


        <div className="form-errors">

        </div>

      </div>
    </>

  )
}

export default DipeshMalvia_EditEmployee
