import React from 'react'

import { useState,useContext, useEffect } from 'react'
import { AuthContext } from '../../AuthProvider';
import axiosInstance from '../../AxiosInstance';

import { Link, useParams } from 'react-router-dom'
import Button from '../Button';

import {useNavigate } from 'react-router-dom'

const EditStudent = () => {
  const {isLoggedIn, setIsLoggedin,theme,setTheme} = useContext(AuthContext)
  
  const {studentid} = useParams();
  const [studentData,setStudentData]= useState([])

  const [id,setId]= useState('')
  const [studId,setStudId] = useState('')
  const [studName,setStudName] = useState('')
  const [studBranch,setStudBranch] = useState('')

  const [errors,setErrors]= useState({})
  const[success,setSuccess]=useState(false)
  const [loading,setLoading]=useState(false)

  const [validation,setValidation] = useState(false)

  const navigate=useNavigate()




    const handleSaveRecord = async (e)=>{
    e.preventDefault()
    console.log(' handle add record')
    console.log ('id', studId)
    console.log('name',studName)
    console.log('branch',studBranch)

    const formData = new FormData()
    // formData.append('id',studentid)
    formData.append('student_id',studId)
    formData.append("name",studName)
    formData.append("branch",studBranch)

    console.log('form data to save is :', formData)
    try{
      setLoading(true)
      console.log('studentid is  :::', {studentid})
      const response = await axiosInstance.put(`/students/${studentid}/`,formData
        ,
           {
           
             headers: {'Content-Type':'application/json' }
          }
         )
      console.log('response after saving:', response)
      alert('Student Data Saved Successfully')
      setErrors({})
      setSuccess(true)
      setLoading(false)
    
      navigate('/student')  
    }catch(error){
       setSuccess(false)
      console.log('error in saving:', error.response)
      setErrors(error.response.data)
    
    }finally{
      setLoading(false)
    }

  }
  console.log (useParams())
  console.log('student id :', studentid)

  useEffect(
  ()=>{
    const fetchProtectedData= async ()=>{
    try{
      const response = await axiosInstance.get(`/students/${studentid}/`)

      
      console.log('Student data', response.data)
      setId(response.data.id)
      setStudId(response.data.student_id)
      setStudName(response.data.name)
      setStudBranch(response.data.branch)
      console.log('id  if record',id)

  
    }catch(error){
      console.log ('\n error (fetchProtectedData )fetching data',error.response)
    }
  }
  fetchProtectedData();
  },[]
  )


  return (
  <>
    <div className="container">
      <div className="main-body">
        <h2>edit Student Details
        <div className="group-button">
            <Button text='Students' class="btn-primary Btn" url='/students' />
        </div>
        <div className="form-div">
          <form  onSubmit={handleSaveRecord}>
            <div className=" mb-3">
                <label className="form-label">Student Id </label>
                <input type="text" className='form-control'
                id='studId'
                name='studId' 
                placeholder='studId'  
                value={studId} required
                onMouseDown={()=>setValidation(true)}
                onChange={(e)=>
                  {
                    setStudId(e.target.value)
                   
                  }}
                />
                {studId.length===0 && validation && <span>Student Id is required</span>}
            </div>
            <div className=" mb-3">
                <label className="form-label">Name</label>
                <input type="text" className='form-control'
                id='studName'
                name='studName' 
                placeholder='studName'  
                value={studName} required
                 onMouseDown={()=>setValidation(true)}
                onChange={(e)=>setStudName(e.target.value)}
                />
                {studName.length===0  && validation && <span>Please enter name </span>}
            </div>
           <div className=" mb-3">
                <label className="form-label">Branch</label>
                <input type="text" className='form-control'
                id='studBranch'
                name='studBranch' 
                placeholder='studBranch'  
                value={studBranch} required
                 onMouseDown={()=>setValidation(true)}
                onChange={(e)=>setStudBranch(e.target.value)}
                />
                {studBranch.length===0 && validation && <span>Branch is required  </span>}
            </div>
            <div className="group-button">
              <button type='submit' className='btn btn-primary'>Update</button>
              <Link to='/student' className='btn btn-secondary'>Back </Link>

            </div>

          </form>
        </div>



        </h2>
      </div>
    </div>
    </>
  )
}

export default EditStudent