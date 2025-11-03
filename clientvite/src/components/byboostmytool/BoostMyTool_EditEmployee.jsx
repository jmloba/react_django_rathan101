import React from 'react'
import { useEffect, useState } from 'react'

import './../../assets/css/formcss.css'
import axiosInstance from '../../AxiosInstance';
import {useNavigate } from 'react-router-dom'


const BoostMyTool_EditEmployee = () => {

  const [departmentList,setDepartmentList]= useState([])
  const [genderList,setGenderList]= useState([])


  const [empId,setEmpId] = useState('')
  const [empName,setEmpName]= useState('')
  const [empEmail, setEmpEmail] = useState('')
  const [empDeptId,setEmpDeptId]= useState('')
  const [empGenderId, setEmpGenderId] = useState('')

  const [empImage,setEmpImage]=useState(null)  
  const navigate=useNavigate()

  const handleImage =(e)=>{
    setEmpImage(e.target.files[0])
  }

  const handleSelectDept=(e)=>{
    e.preventDefault()
    
    setEmpDeptId(e.target.value)
    console.log ('handleselect department', e.target.value)
  }
  const handleSelectGender = (e)=>{
    e.preventDefault()
    setEmpGenderId(e.target.value)
    console.log ('handleselect gender', e.target.value)
  }

  const handleAddPost= async (e)=>{
    e.preventDefault()
    console.log('empid',empId)
    // console.log('empname',empName)
    // console.log('image',empImage)
    const formData = new FormData()
    formData.append('emp_id',empId)
    formData.append('emp_name',empName)
    formData.append('email',empEmail)

    formData.append('deptname',empDeptId)
    formData.append('gender',empGenderId)

    
    // formData.append('email',email)

    console.log('see formData', formData)

    if (empImage!==null){
         formData.append('image',empImage)
    }   
    console.log('record to edit: ',formData)
    try{
      const response = await axiosInstance.put('/employees/',formData,
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
  }


  useEffect( 
    ()=>{
    const fetchProtectedData= async ()=>{
      try{
        // department
        const response_dept = await axiosInstance.get('/department/')
        setDepartmentList(response_dept.data)
        console.log('useEffect department list :', response_dept)
        
        const response_gender = await axiosInstance.get('/gender/')
        setGenderList(response_gender.data)
        console.log('useEffect gender list :', response_gender)

      }catch(error){
        
        console.log ('\n error (fetchProtectedData )fetching department',error.response_dept)

      }
    }
    fetchProtectedData();
    },[]
  )  
  return (
    <>
    <div className="container">
       <h3>Edjt Employee</h3>
      <div  className='form-main'>
          <div className="mb-3">
            <label className="form-label"> Id </label>
           <input type="text" className='form-control-plaintext'
           defaultValue={""}
           
            placeholder='empId' 
            onChange={(e)=>setEmpId(e.target.value)
            }
            readOnly 
            />

          </div>        
       
        <form action="" onSubmit={handleAddPost}>


          {/* ------ id--------- */}
          <div className="mb-3">
            <label className="form-label">Employee Id </label>
            <input type="text" className='form-control'
            name='empId' 
            placeholder='empId' 
            onChange={(e)=>setEmpId(e.target.value)
            }
            required 
            />

          </div>          
          {/* ------ name--------- */}
          <div className="mb-3">
            <label className="form-label">Employee Name </label>
            <input type="text"
            name = 'empName'
            placeholder = 'name'
            onChange={(e)=>setEmpName(e.target.value)}
            />

          </div>     

          {/* ------ email--------- */}
          <div className="mb-3">
            <label className="form-label">Employee Email </label>
            <input type="text" 
            name='empEmail'
            placeholder='Email'
            onChange={(e)=>setEmpEmail(e.target.value)}
            />

            
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
          {/* ------ gender list--------- */}
                      
          <div className="mb-3">
              <label className="form-label">Gender </label>
              <select name="gendername"  id="selectGender" 
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


          {/* ------ image--------- */}

          <div className="mb-3">
              <label className="form-label"> Image </label>
              <input type="file" className='form-control'
              name='empImage' 
              onChange={handleImage}
              />
          </div>

          {/* ------ submit--------- */}                              
          <div className="">
            <button type='submit' className='btn btn-primary float-end'>  Submit </button>
          </div>

        </form>


      </div>


    </div>
    </>
    
  )
}

export default BoostMyTool_EditEmployee