
// https://www.youtube.com/watch?v=qAQ6c1L23-0&t=261s
// by stepbystep

import React from 'react'
import { useState,useContext, useEffect } from 'react'
import { AuthContext } from '../../AuthProvider';
import axiosInstance from '../../AxiosInstance';
import axios from 'axios';
import Button from '../Button'
import ViewStudent from '../students/ViewStudent'
import {useNavigate } from 'react-router-dom'

const Students = () => {
      const [list,setList] = useState([])
      const {isLoggedIn, setIsLoggedIn,theme,setTheme} = useContext(AuthContext)
      const config ={'responseType':'blob' }
      const navigate=useNavigate()

      const DisplayDetails = (id)=>{
        console.log('Id no to edit:',id)
        navigate('/student/view/'+id)
      }
      const EditDetails = (id)=>{
        console.log('Id no to edit:',id)
        navigate('/student/edit/'+id)
      }
      const RemoveDetails = async (id)=>{
           console.log('Id no to delete:',id)
        if (window.confirm('Are you sure you want to delete')){
          try{
            const response = await axiosInstance.delete(`/students/${id}/`)
            alert("removed student data successfully")
            window.location.reload()
         
          }catch(error){
            console.log('error in deletion', error.message)
   navigate('/student')  
          }
    
        }
 
      }

      useEffect(
        ()=>{
          const fetchProtectedData= async ()=>{
          try{
            const response = await axiosInstance.get('/students/')
    
            setList(response.data)
            console.log(' fetching the data:',response.data)
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
        <div className="group-button">
          <Button text=' Add Student ' class=" btn-outline-primary" url='/student-add' /> 
           {/* <Button text='ViewStudent ' class=" btn-outline-primary" url='/student-view' />  */}

        </div>

        <div className="data-list">
          <table>
            <thead>
              <tr>
                <th>id  </th>
                <th>Student Id</th>
                <th>Name</th>
                <th>Branch</th>
                <th>Action</th>
             
             
              </tr>

            </thead>
            <tbody>
              {
               list && list.map((student,index)=>(
              <tr key={index}>
                <td>{student.id}</td>
                <td>{student.student_id}</td>
                <td>{student.name}</td>
                <td>{student.branch}</td>
                <td>
                  <button onClick={()=>DisplayDetails(student.id)}
                  className='btn btn-info btn-sm'>view</button>
                  <button 
                    onClick={()=>{
                    EditDetails(student.id)
                    }
                    }
                    className='btn btn-warning btn-sm'>Edit
                  </button>
                  {/* delete */}
                    <button 
                    onClick={()=>{
                    RemoveDetails(student.id)
                    }
                    }
                    className='btn btn-danger btn-sm'>Delete
                  </button>

                </td>

              </tr>

              )
              
            )
              
              }

           
            </tbody>

          </table>
        </div>
      </div>
    </div>
    </>
   
  )
}

export default Students