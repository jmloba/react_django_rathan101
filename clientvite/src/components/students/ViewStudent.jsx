
// https://www.youtube.com/watch?v=qAQ6c1L23-0&t=261s
// 1:33:00
import React from 'react'
import Button from '../Button'
import { useParams } from 'react-router-dom'
import {useState, useEffect } from 'react'
import { AuthContext } from '../../AuthProvider';
import axiosInstance from '../../AxiosInstance';
import axios from 'axios';

const ViewStudent = () => {
  const {studentid} = useParams();
  const [studentData,setStudentData]= useState({})
  console.log (useParams())
  console.log('student id :', studentid)

      useEffect(
        ()=>{
          const fetchProtectedData= async ()=>{
          try{
            const response = await axiosInstance.get(`/students/${studentid}`)
    
            setStudentData(response.data)
            console.log(' fetching the data:',response.data)
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
            <h2>View Student Details</h2>
            <div className="group-button">
                <Button text='Back' class="btn-primary Btn" url='/student' />
            </div>
            <div className="container">
              { studentData && <div className="details">
                <p><strong>Id</strong>{studentData.id}</p>
                 <p><strong>Student Id</strong>{studentData.id}</p>
                
                <p><strong>name</strong>{studentData.name}</p>
                <p><strong>branch</strong>{studentData.branch}</p>
                <p><strong></strong></p>
              </div>
}

            </div>


        </div>
    </div>
    </>
  )
}

export default ViewStudent