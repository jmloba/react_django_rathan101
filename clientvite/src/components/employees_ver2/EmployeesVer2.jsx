import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axiosInstance from '../../AxiosInstance';

const EmployeesVer2 = () => {
  // list
  const [data, setData] = useState([])
  const [employeeEdit,setEmployeeEdit] = useState('')

  const [departmentList, setDepartmentList] = useState([])
  const [genderList, setGenderList] = useState([])
  // record variable fields
  const [formId,setFormId] = useState('')

  const [formEmpId,setFormEmpId] = useState('')
  const [formName, setFormName] =useState('')
  const [formEmail,setFormEmail]= useState('')

  const [formGenderCode,setFormGenderCode]=useState('')

  const [formDeptCode,setFormDeptCode] = useState('')

  const [formImage,setFormImage]=useState(null)

  const handleSelectDept=(e)=>{
    e.preventDefault()
    console.log ('handleselect department')
    setFormDeptCode(e.target.value)
  }
  const handleSelectGender=(e)=>{
     e.preventDefault()
    console.log ('handleselect gender')
    setFormGenderCode(e.target.value)
  }
  const handleImage =(e)=>{
  
    setFormImage(e.target.files[0])

  }
  // init edit variables
  const init_data_edit=()=>{
    console.log('initializing data to edit')
    console.log('retrieved data',employeeEdit)
    setFormId(employeeEdit.id)
  }
  // click edit and retrieve record
  const EditDetails =(id,updatedEmployee) =>{
  // e.preventDefault()
    console.log('Id no to edit:',id)
   
  }
      
  const handleInitForm =(e)=>{
    e.preventDefault()
    setFormId('')
    setFormName('')
    setFormEmail('')
    setFormGenderCode('')
    setFormDeptCode('')
    setFormImage(null)  
    console.log (' handle init form ')
    console.log('var :',formEmpId)
    console.log('varname :',formName)
    console.log('varemail:', formEmail)
    console.log('vargender:',formGenderCode)
    console.log('vardepartment', formDeptCode)
    console.log('formImage:', formImage)
  }
  //addform submit
  const handleAddSubmit=async (e)=>{
    e.preventDefault()
    console.log('click add submit')
    const formData = new FormData()
    formData.append('emp_id',formEmpId)
    formData.append('emp_name',formName)
    formData.append('deptname',formDeptCode)
    formData.append('gender',formGenderCode)
    formData.append('email',formEmail)
    if (formImage!==null){
      formData.append('image',formImage)

    }
    try{
      const response = await axiosInstance.post('/employees/',formData,
        {
          headers: {'Content-Type':'multipart/form-data' }
        }
        )
   
        console.log('response after saving:', response.data)
   
          navigate('/dashboard/')  

    }catch(error){
      console.log('Add employee ver 2', error.messages)
    }

  }

  
     useEffect( 
    ()=>{
    const fetchProtectedData= async ()=>{
      try{
        // list of employees
        const response = await axiosInstance.get('/employees/')
        setData(response.data)
        console.log(' Employee list: --  >>>>',response.data)

        // department
        const response_dept = await axiosInstance.get('/department/')
        setDepartmentList(response_dept.data)
        console.log('useEffect department list :', response_dept)
        
        // gender
        const response_gender = await axiosInstance.get('/gender/')
        setGenderList(response_gender.data)
        console.log('useEffect gender list :', response_gender)

        
      }catch(error){
        console.error ('\n error (fetchProtectedData )fetching data',error.response)
          console.error ('\n error (fetchProtectedData )fetching department',error.response_dept)

      }
    }
    fetchProtectedData();
    },[]
  )  

  return (
   <>
   <div className="container">
    <h3>Employees Ver2</h3>
    <div className="main-body">
      <h4>Table</h4>
             <div className="col-sm-6">
              <button type='button' 
                className='me-3 btn btn-primary ml-auto d-block mb-2'
                data-bs-toggle='modal'
                data-bs-target='#addModalForm'
                onClick={handleInitForm}>
                  
                 Add Data +
              </button>
            
          </div>
      <table>
        <thead>
          <tr >
            <th>id</th>
            <th>employee id</th>
            <th>name</th>
            <th>deptcode</th>
            <th>dept name</th>
            <th>gendercode</th>    
            <th>gender</th>
            <th>Image</th>
            <th>action</th>
          </tr>

        </thead>
        <tbody>

      
        {data.map((employee,index)=>{
          return(
            <>
 <tr key={index}>
              <td> {employee.id}</td>
              <td>{employee.emp_id}</td>
              <td>{employee.emp_name}</td>
              <td>{employee.deptname}</td>
              <td>{employee.department}</td>
              <td>{employee.gender}</td>

              <td>{employee.emp_gendername}</td>
              <td>
                  <img src= {employee.image} alt="" />  
              </td>
              <td>
                <button type='button' 
                className='me-3 btn btn-primary ml-auto d-block mb-2'
                data-bs-toggle='modal'
                onClick={EditDetails(employee.id)}
               

               
                >
                 edit {employee.id}
              </button>
              </td>
            </tr>
            
            </>
          )
    
        })}


        </tbody>
      </table>
      
          {/* ---------add modal---------- */}
          <div className='modal fade' 
              id='addModalForm'
              tabIndex='-1' 
              aria-labelledby='exampleModalLabel'
              // aria-hidden='true'
          >
            <div className="modal-dialog modal-lg ">

              <div className="modal-content">
                  <div className="modal-header">
                  <h5 className='modal-title' id='exampleModalLabel'>Add Employee </h5>
                  <button type='button' className='btn-close' 
                  data-bs-dismiss='modal' aria-label='Close'></button>
                  </div>
                  <div className="modal-body">

                  <form  method='post' onSubmit={handleAddSubmit}>

                    {/* form empid */}
                    <div className="mb-3">
                        <label className="form-label">Employee Id </label>
                        <input type="text" className='form-control'
                        name='formEmpId' 
                        placeholder='formEmpId' 
                        onChange={(e)=>
                          setFormEmpId(e.target.value)
                        }
                        required 
                        />
                    </div>

                    {/* form empname */}
                    <div className="mb-3">
                        <label className="form-label">Employee Name </label>
                        <input type="text" className='form-control'
                        name='formName' 
                        placeholder='formName' 
                        onChange={(e)=>
                          setFormName(e.target.value)
                        }
                        required 
                        />
                    </div>
                    {/* ------ deptname--------- */}
                    
                    <div className="mb-3">
                      <label className="form-label">Department name </label>
                      <select name="formDeptCode"  id="formDeptCode" 
                        className='form-select' onChange={handleSelectDept}>
                        {
                          departmentList.map(
                            (department )=>(
                              <option value={department.id}>{department.deptname}</option>
                          )
                          )
                        }
                      </select>
                    </div>
                    {/* ------ gender--------- */}
                      
                    <div className="mb-3">
                      <label className="form-label">Gender  </label>
                      <select name="formGenderCode"  id="formGenderCode" 
                        className='form-select' onChange={handleSelectGender}>
                        {
                          genderList.map(
                            (gender )=>(
                              <option value={gender.id}>{gender.gender}</option>
                          )
                          )
                        }
                      </select>
                    </div>

                         {/* ------ email--------- */}         
                    <div className="mb-3">
                      <label className="form-label">Employee Name </label>
                      <input type="text" className='form-control'
                        name='formEmail' 
                        placeholder='formEmail' 
                        onChange={(e)=>
                          setFormEmail(e.target.value)
                        }
                        required 
                        />
                    </div>
                       
                      {/* ------ image--------- */}

                      <div className="mb-3">
                          <label className="form-label"> Image </label>
                          <input type="file" className='form-control'
                          name='formImage' 
                          onChange={handleImage}
                          />
                      </div>

                    
                      <div className="modal-footer d-block">
                          <button type='submit'
                          className='btn btn-warning float-end'
                            data-bs-dismiss='modal' 
                      > 
                      Submit </button>
                      </div>


            
                
                  </form>
                  </div>
              </div>
        
            </div>

          
          </div>
           
          {/* ---------edit modal---------- */}
          <div className='modal fade' 
              id='editModalForm'
              tabIndex='-1' 
              aria-labelledby='exampleModalLabel'
              // aria-hidden='true'
          >
            <div className="modal-dialog modal-lg ">

              <div className="modal-content">
                  <div className="modal-header">
                  <h5 className='modal-title' id='exampleModalLabel'>editEmployee </h5>
                  <button type='button' className='btn-close' 
                  data-bs-dismiss='modal' aria-label='Close'></button>
                  </div>
                  <div className="modal-body">

                  <form  method='post' onSubmit={handleAddSubmit}>
          {/* recordid  */}
                    <div className="mb-3">
                        <label className="form-label">Employee Id </label>
                        <input type="number" className='form-control'
                        name='formId' 
                        placeholder='formId' 
                        value={formId}
                      
                        disabled
                        />
                    </div>
                    {/* form empid */}
                    <div className="mb-3">
                        <label className="form-label">Employee Id </label>
                        <input type="text" className='form-control'
                        name='formEmpId' 
                        placeholder='formEmpId' 
                        onChange={(e)=>
                          setFormEmpId(e.target.value)
                        }
                        required 
                        />
                    </div>

                    {/* form empname */}
                    <div className="mb-3">
                        <label className="form-label">Employee Name </label>
                        <input type="text" className='form-control'
                        name='formName' 
                        placeholder='formName' 
                        onChange={(e)=>
                          setFormName(e.target.value)
                        }
                        required 
                        />
                    </div>
                    {/* ------ deptname--------- */}
                    
                    <div className="mb-3">
                      <label className="form-label">Department name </label>
                      <select name="formDeptCode"  id="formDeptCode" 
                        className='form-select' onChange={handleSelectDept}>
                        {
                          departmentList.map(
                            (department )=>(
                              <option value={department.id}>{department.deptname}</option>
                          )
                          )
                        }
                      </select>
                    </div>
                    {/* ------ gender--------- */}
                      
                    <div className="mb-3">
                      <label className="form-label">Gender  </label>
                      <select name="formGenderCode"  id="formGenderCode" 
                        className='form-select' onChange={handleSelectGender}>
                        {
                          genderList.map(
                            (gender )=>(
                              <option value={gender.id}>{gender.gender}</option>
                          )
                          )
                        }
                      </select>
                    </div>

                         {/* ------ email--------- */}         
                    <div className="mb-3">
                      <label className="form-label">Employee Name </label>
                      <input type="text" className='form-control'
                        name='formEmail' 
                        placeholder='formEmail' 
                        onChange={(e)=>
                          setFormEmail(e.target.value)
                        }
                        required 
                        />
                    </div>
                       
                      {/* ------ image--------- */}

                      <div className="mb-3">
                          <label className="form-label"> Image </label>
                          <input type="file" className='form-control'
                          name='formImage' 
                          onChange={handleImage}
                          />
                      </div>

                    
                      <div className="modal-footer d-block">
                          <button type='submit'
                          className='btn btn-warning float-end'
                            data-bs-dismiss='modal' 
                      > 
                      Submit </button>
                      </div>


            
                
                  </form>
                  </div>
              </div>
        
            </div>

          
          </div>
     
      
    </div>

   </div>
   </>
  )
}

export default EmployeesVer2