import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import axiosInstance from '../../AxiosInstance'
import Button from '../Button'

const Dashboard = () => {
    
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
    <div className='container-2'>
        <div  className='text-dark'>Dashboard</div>
        <div className='dash-area-1'>
        <Button text='Books' class="btn-info" url='/books' />
        <Button text='Condo' class="btn-info" url='/condobill' />
        <Button text='Condo Add' class="btn-info" url='/condo-add' />      
        <Button text='Employees' class="btn-info" url='/employees' />
        <Button text='Students' class="btn-info" url='/students' />
        <Button text='Store Masterfile' class="btn-info" url='/storemasterfile' />
        
        <Button text='Sample Data Table' class="btn-info" url='/sampledatatable' />
        </div>
    </div>
    
    </>
    
  )
}


export default Dashboard