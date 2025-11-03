import React from 'react'
import axiosInstance from '../../AxiosInstance'
import { useEffect } from 'react'
import Button from '../Button'

const TutorDashboard = () => {
    useEffect(()=>{

        const fetchProtectedData =async ()=>{
            try{
                const response = await axiosInstance.get('/protected-view/' )
                console.log('Success:', response.data)

            }catch(error){
                console.error('Error fetching data', error)
            }
        }
        fetchProtectedData()
    },[])
  return (
    <>
    <div className="container">
        <div  className='text-dark'>Tutor Dashboard</div>
            <div className="dash-area-1">
            <Button text='Form001' className="btn btn-primary " 
                url='/tutorDashboard/form001' />
            <Button text='FormDropdown' className='btn btn-primary'
              url='/tutorDashboard/formdropdown'  />

            <Button text='Use Effect' className='btn btn-primary'
              url='/tutorDashboard/useEffect'  /> 
            </div>
    </div>
   
    </>
    
  )
}

export default TutorDashboard