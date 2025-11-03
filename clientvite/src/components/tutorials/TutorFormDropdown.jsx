import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axiosInstance from '../../AxiosInstance';


const TutorFormDropdown = () => {
  const [departments, setDepartments] = useState([])
  const [deptoption, setDeptOption] = useState(0)
  const handleSelect = (e)=>{
    e.preventDefault()
        console.log('e:', e.target)
    console.log('selected from dropdown', e.target.value)
    setDeptOption(e.target.value)

  }
  useEffect( 
    ()=>{

    const fetchProtectedData= async ()=>{
      try{
        const response = await axiosInstance.get('/department/')
        setDepartments(response.data)
     
        console.log('useEffect : Departments',response.data)
      }catch(error){
        console.error ('\n error (fetchProtectedData )fetching data',error.response)

      }
    }
    fetchProtectedData();
    },[]
    )  
  return (
    <>
    <div className="container">
      <div className='form-main'>

        
      
        <form action="">
          <label htmlFor="department">Department</label>
          <select className='form-select form-control ' onChange={handleSelect} >
            {
              departments.map(
                (department )=>(
                  <option value={department.id}>{department.deptname}</option>
              )
              )
            }
          </select>

              

        </form>
        </div>
    </div>
 
    </>
  )
}

export default TutorFormDropdown