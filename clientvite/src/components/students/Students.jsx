import React from 'react'
import { useState,useContext, useEffect } from 'react'
import { AuthContext } from '../../AuthProvider';
import axiosInstance from '../../AxiosInstance';
import Button from '../Button'

const Students = () => {
      const [list,setList] = useState([])
      const {isLoggedIn, setIsLoggedIn,theme,setTheme} = useContext(AuthContext)
      const config ={'responseType':'blob' }

      useEffect(
        ()=>{
          const fetchProtectedData= async ()=>{
          try{
            const response = await axiosInstance.get('/students/')
            setList(response.data)
            console.log('response fetching the data:',response.data)
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
      <div className="main-body">
        <h1>List Students</h1>
        <div className="data-list">
          {       
          list.map(
            (student)=>{
              return(
                <>
                <li key={student.id}>
                  <div className="card">
                    <p>Id : {student.id}</p>
                    <p>Student Id: {student.student_id}</p>
                    <p>Name :{student.name}</p>
                    <p>Branch: <strong>{student.branch}</strong></p>
                  </div>

                </li>
                </>
              )
            }
          )
          } 
        </div>
      </div>
    </div>
    </>
   
  )
}

export default Students