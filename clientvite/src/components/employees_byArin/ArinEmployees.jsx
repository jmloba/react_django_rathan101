
import React from 'react'


import { useState } from 'react'
import { useEffect } from 'react'
import axiosInstance from '../../AxiosInstance';
import {useNavigate } from 'react-router-dom'

const ArinEmployees = () => {

  const [data,setData]=useState([])
  const [editData, setEditData]= useState('')
  
  const [departmentList,setDepartmentList]= useState([])
  const [genderList,setGenderList] = useState([])
  const [email,setEmail]=useState('')

  const [editId,setEditId]=useState(0)

  const [empId,setEmpId] = useState('')
  const [empName,setEmpName]= useState('')

  const [empDeptId,setEmpDeptId]= useState('')

  const [deptValue,setDeptValue]=useState(0)

  const [deptName,setDeptName]= useState('')

  const [genderValue,setGenderValue]=useState('')

  const [genderName,setGenderName]=useState('')
  const [empImage,setEmpImage]=useState(null)
  const navigate=useNavigate()

  const handleEditSave = async(e)=>{
    e.preventDefault()
    console.log ('edit button save pressed')
    // try{
      
    //    const response_edit = await axiosInstance.get('/employees/')
    //     setData(response.data)
    //     console.log('useeffect : response fetching the data ***employees:',response.data)

    // }catch(error){
    //   console.log('error edit button pressed', error.message)
    // }
  }
  // fill edit variables
  const fillEditVariables =()=>{
    console.log('ab')
    setEditId(editData.id)
    setEmpId(editData.emp_id)

    setEmpName(editData.emp_name)
    setGenderValue(editData.gender)

    setEmpDeptId(editData.deptname)
    console.log('from edit value ',empDeptId)
  }
  // get the record to edit
  const handleEditButton = async (id,e)=>{
    e.preventDefault()
    console.log (`edit button pressed  ${id}`)
  try{
      
      const response_edit = await axiosInstance.get(`/employees/${id}`)
      setEditData(response_edit.data)
      console.log('record to edit:',response_edit.data)
      fillEditVariables()

    }catch(error){
      console.log('error edit button pressed', error.message)
    }

  }
  const handleImage =(e)=>{
  
    setEmpImage(e.target.files[0])

  }
  const handleEmail=(e)=>{
    e.preventDefault()
    setEmail(e.target.value)
    console.log('entered email',email)
  }
  const handleSelectDept=(e)=>{
    e.preventDefault()
    console.log ('handleselect department')
    setEmpDeptId(e.target.value)
  }

  const RemoveDetails= async(id)=>{
  
    if (window.confirm(`Are you sure you want to delete record ${id}`)){
      try{
              const response = await axiosInstance.delete(`/employees/${id}/`)
              alert("removed employees data successfully")
              window.location.reload()
      }catch(error){
        console.log('error in deletion :',error.message)
      }
    }
  
  
  }
  const handleSelectGender=(e)=>{
    e.preventDefault()
    console.log ('handleselectgender')
    setGenderValue(e.target.value)
  }
  
  const handleAddPost= async (e)=>{
    e.preventDefault()
    console.log('empid',empId)
    console.log('empname',empName)
    console.log('image',empImage)
    const formData = new FormData()
    formData.append('emp_id',empId)
    formData.append('emp_name',empName)
    formData.append('deptname',empDeptId)
    formData.append('gender',genderValue)
    formData.append('email',email)

    if (empImage!==null){
         formData.append('image',empImage)
    }   
    console.log('record to add: ',formData)
    try{
      const response = await axiosInstance.post('/employees/',formData,
        {
          headers: {'Content-Type':'multipart/form-data' }
        }
        )
   
        console.log('response after saving:', response.data)
        // clear errors
          navigate('/dashboard/')  

    }catch(error){
      console.log('Arin Employees add error', error.messages)
    }
  }

  useEffect( 
    ()=>{
    const fetchProtectedData= async ()=>{
      try{
        // list of employees
        const response = await axiosInstance.get('/employees/')
        setData(response.data)
        console.log('useeffect : response fetching the data ***employees:',response.data)

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
        <div className="table-title">
          <div className="col-sm-6">
            <h4>Manage Employees</h4>

          </div>
          <div className="col-sm-6">
              <button type='button' 
                className='me-3 btn btn-primary ml-auto d-block mb-2'
                data-bs-toggle='modal'
                data-bs-target='#addModalForm'>
                 Add Data +
              </button>
            
          </div>
        </div>
         
        <div className="table-area">
          <table>
            <thead>
                <tr>
                  <th>id</th>
                  <th>Emp Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>image</th>
                  <th>Action</th>

                </tr>

            </thead>
            <tbody>
            { data &&  data.map((employee,index)=>(
              <tr  key={index}>
                <td>{employee.emp_id}</td>
                <td>{employee.emp_name}</td>
                <td>{employee.emp_gender}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>
                  <img src={employee.image} alt='image'/>
                </td>
                <td>
                    
              
                  <button className='btn btn-danger btn-sm ' onClick={()=>{
                    RemoveDetails(employee.id)
                  }}>delete</button>

                  <button type='button' 
                  className='me-3 btn btn-primary ml-auto d-block mb-2'
                  data-bs-toggle='modal'
                  data-bs-target='#editModalForm'
                  onClick={(e)=>handleEditButton(employee.id,e)}
                  >
                    Edit - {employee.id}
                </button>
                </td>

              </tr>
            ))
          
            }
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

                  <form  method='post' onSubmit={handleAddPost} >


                      <div className="mb-3">
                          <label className="form-label">Employee Id </label>
                          <input type="text" className='form-control'
                          name='empId' 
                          placeholder='empId' 
                          onChange={(e)=>
                            setEmpId(e.target.value)
                          }
                          required 
                          />
                      </div>

                      <div className="mb-3">
                          <label className="form-label">Emp name </label>
                          <input type="text" className='form-control'
                          name='empName' 
                          placeholder='empName' 
                      
                          onChange={(e)=>(setEmpName(e.target.value))}
                          required 
                          />
                               
                      </div>
                      {/* ------ gender--------- */}
                      <div className="mb-3">
                          <label className="form-label">Gender </label>
                          <select name="gendername" id="selectGender " 
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
                      
                    
                      {/* ------ deptname--------- */}
                      
                      <div className="mb-3">
                          <label className="form-label">Department name </label>
                          <select name="departmentname"  id="selectDepartment" 
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
                                  
                      {/* ------ email--------- */}
                      <div className="mb-3">
                          <label className="form-label">Email  </label>
                          <input type="email" className='form-control'
                          name='email' 
                          placeholder='email' 
                          onChange={handleEmail}
                          
                           
                          />
                      </div>
                      
                    
                      {/* ------ image--------- */}

                      <div className="mb-3">
                          <label className="form-label"> Image </label>
                          <input type="file" className='form-control'
                          name='empImage' 
                          onChange={handleImage}
                          />
                      </div>

                  

                      {/* ------ submit--------- */}

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
                  <h5 className='modal-title' id='exampleModalLabel'>Edit Employee </h5>
                  <button type='button' 
                  className='btn-close' 
                  data-bs-dismiss='modal' aria-label='Close'></button>
                  </div>
                  <div className="modal-body">

                  <form  method='post' onSubmit={handleEditSave} >
                      <div className="mb-3">
                          <label className="form-label">record Number  </label>
                          <input type="text" className='form-control'
                          name='editId' 
                          placeholder='editId' 
                          value={editId}
                          
                          disabled 
                          />
                      </div>

                      <div className="mb-3">
                          <label className="form-label">Employee Id </label>
                          <input type="text" className='form-control'
                          name='empId' 
                          placeholder='empId' 
                          value={empId}

                          onChange={(e)=>setEmpId(e.target.value)}
                          required 
                          />
                      </div>

                      <div className="mb-3">
                          <label className="form-label">Emp name </label>
                          <input type="text" className='form-control'
                          name='empName' 
                          placeholder='empName' 
                          value={empName}
                      
                          onChange={(e)=>(setEmpName(e.target.value))}
                          required 
                          />
                               
                      </div>
                      {/* ------ gender--------- */}
                      <div className="mb-3">
                          <label className="form-label">Gender </label>
                          <select name="gendername" id="selectGender " 
                           value={genderValue} className='form-select' onChange={handleSelectGender}>
                            {
                              genderList.map(
                                (gender )=>(
                                  <option value={gender.id}>{gender.gender}</option>
                              )
                              )
                            }
                          </select>
                      </div>
                      
                    
                      {/* ------ deptname--------- */}
                      
                      <div className="mb-3">
                          <label className="form-label">Department name </label>
                          <select name="departmentname"  id="selectDepartment"  
                          value={empDeptId}
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
                                  
                      {/* ------ email--------- */}
                      <div className="mb-3">
                          <label className="form-label">Email  </label>
                          <input type="email" className='form-control'
                          name='email' 
                          placeholder='email' 
                          onChange={handleEmail}
                          
                           
                          />
                      </div>
                      
                    
                      {/* ------ image--------- */}

                      <div className="mb-3">
                          <label className="form-label"> Image </label>
                          <input type="file" className='form-control'
                          name='empImage' 
                          onChange={handleImage}
                          />
                      </div>

                  

                      {/* ------ submit--------- */}

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

export default ArinEmployees