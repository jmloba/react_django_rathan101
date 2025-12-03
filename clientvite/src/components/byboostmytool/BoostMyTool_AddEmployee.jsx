// boostmytool
// https://www.youtube.com/watch?v=XBfZxrLcDC8&t=4475s



import React from 'react'
import { useEffect, useState } from 'react'
import './../../assets/css/formcss.css'
import axiosInstance from '../../AxiosInstance';
import {useNavigate, Link } from 'react-router-dom'




const BoostMyTool_AddEmployee = () => {

  const [departmentList,setDepartmentList]= useState([])
  const [genderList,setGenderList]= useState([])


  const [emp_id,setEmp_Id] = useState('')
  const [emp_name,setEmp_Name]= useState('')
  const [email, setEmail] = useState('')
  const [deptname,setDeptName]= useState('')
  const [gender, setGender] = useState('')
  const [designation, setDesignation] = useState('')
  const [price, setPrice] = useState('')

  const [empImage,setEmpImage]=useState(null)  

  const [validationErrors,setValidationErrors]= useState({})
  const navigate=useNavigate()

  const handleImage =(e)=>{
    setEmpImage(e.target.files[0])
  }

  const handleSelectDept=(e)=>{
    e.preventDefault()
    
    setDeptName(e.target.value)
    console.log ('handleselect department', e.target.value)
  }
  const handleSelectGender = (e)=>{
    e.preventDefault()
    setGender(e.target.value)
    console.log ('handleselect gender', e.target.value)
  }

  const handleAddPost = async (e)=>{
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
    console.log('record to add: ',formData)
    try{
      const response = await axiosInstance.post('/employees/',formData,
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

  
  async function handleSubmitAddData(event){
    event.preventDefault()
      
    const formData = new FormData(event.target)
    const emp_Data = Object.fromEntries(formData.entries())

    console.log('Submission of data', emp_Data)

    if (!emp_Data.emp_id 
      || !emp_Data.emp_name
      || !emp_Data.price 
      || !emp_Data.designation
      || !emp_Data.email 
      || !emp_Data.deptname  


      || !emp_Data.image.name
    ){
      alert('please fill up all fields')
      return



    }
   try{
      const response = await axiosInstance.post('/employees/',formData,
        {
          headers: {'Content-Type':'multipart/form-data' }
        }
        )
        if(response.status===201){
          // employee created successfully
          alert('Employee created successfully')
        console.log('response after saving:', response.data)
        // clear errors
        navigate('/boostmytool-employee')          

        }else if (response.status===400){
          alert("Validation error")
          setValidationErrors(response)
        }else{
          alert('Unable to create employee')
        }

   


    }catch(error){
      console.log(' boost my tool ', error.response.data.emp_id)
      alert(error.response.data.emp_id)
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
       <h3>Add Employee - container by boostmytool</h3>
      <div  className='form-main '>
       
        <form action="" onSubmit={handleSubmitAddData}>

          {/* ------ id--------- */}
          <div className="row mb-3 ">
            <label className=" col-sm-4 ">Employee Id </label>
            <div className="col-sm-8">
              <input type="text" className='form-control'
              name='emp_id' 
              placeholder='empId' 
              onChange={(e)=>setEmp_Id(e.target.value)
              }
              // required

              />
              <span className='text-danger'>{validationErrors.emp_id}</span>

            </div>

          </div>          
          {/* ------ name--------- */}
          <div className="row mb-3">
            <label className="col-sm-4  ">Employee Name </label>
            <div className="col-sm-8">
              <input type="text" className='form-control'
              name = 'emp_name'
              placeholder = 'Name'
              onChange={(e)=>setEmp_Name(e.target.value)}
              />
              <span className="text-danger">{validationErrors.emp_name}</span>

            </div>

          </div>     
          {/* ------ sample price--------- */}
           <div className="row mb-3">
            <label className=" col-sm-4  ">sample price</label>
            <div className="col-sm-8">
              <input type="number" className='form-control'
              name='price' 
              step="0.01"
              min="1"
              placeholder='price' 
              onChange={(e)=>setPrice(e.target.value)
              }
              // required 
              />
              <span className='text-danger'></span>

            </div>

          </div>    

          {/* ------ designation--- */}
          <div className="row mb-3">
            <label className="col-sm-4  ">Designation</label>
            <div className="col-sm-8">
              <textarea type="text" className='form-control' 
              name='designation'
              placeholder='Designation'
              rows="4"
              onChange={(e)=>setDesignation(e.target.value)}
              />
              <span className='text-danger'>{validationErrors.designation}</span>
            </div>
          </div>         
          {/* ------ email--------- */}
          <div className="row mb-3">
            <label className="col-sm-4  ">Employee Email </label>
            <div className="col-sm-8">
              <input type="email" className='form-control' 
              name='email'
              placeholder='Email'
              onChange={(e)=>setEmail(e.target.value)}
              />
              <span className='text-danger'></span>
            </div>
          </div>             
          {/* ------ deptname--------- */}
                      
          <div className="row mb-3">
              <label className="col-sm-4  ">Department name </label>
              <div className="col-sm-8">
                <select name="deptname"  id="selectDepartment" 
                  className='form-select' onChange={handleSelectDept}>
                  {
                    departmentList.map(
                      (department,index )=>(
                        <option key={index} value={department.id}>{department.deptname}</option>
                    )
                    )
                  }
                </select>
                <span className='text-danger'>{validationErrors.deptname}</span>

              </div>
          </div>
          {/* ------ gender list--------- */}
                      
          <div className="row mb-3">
              <label className="col-sm-4 form-label">Gender </label>
              <div className="col-sm-8">
                <select name="gender"  id="selectGender" 
                  className='form-select' onChange={handleSelectGender}>
                  {
                    genderList.map(
                      (gender,index )=>(
                        <option key={index} value={gender.id}>{gender.gender}</option>
                    )
                    )
                  }
                </select>
                <span className='text-danger'>{validationErrors.gender}</span>
              </div>

          </div>


          {/* ------ image--------- */}

          <div className="row mb-3">
            <label className="col-sm-4  "> Image </label>
            <div className="col-sm-8">
              <input type="file" className='form-control'
                name='image' 
                onChange={handleImage}
              />
              <span className='text-danger'></span>
            </div>
  
          </div>

          {/* ------ submit--------- */}                              
          <div className="row">
            <div className="offset-sm-4 col-sm-4 d-grid">
              <button type='submit' className='btn btn-primary'>submit</button>

            </div>
            <div className="col-sm-4 d-grid">
              <Link to='/boostmytool-employee' className='btn btn-secondary' role='button'
              >Cancel</Link>

            </div>
            
          </div>

        </form>


      </div>


    </div>
    </>
    
  )
}

export default BoostMyTool_AddEmployee