import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import axiosInstance from '../../AxiosInstance'
import Button from '../Button'

const Dashboard = () => {

  useEffect(() => {

    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get('/protected-view/')
        console.log('Success:', response.data)

      } catch (error) {
        console.error('Error fetching data', error)
      }
    }
    fetchProtectedData()
  }, [])
  return (
    <>
      <div className='container'>
        <div className='text-dark'>Dashboard</div>
        <div className='dash-area-1'>

          <Button text='Books' class="btn-primary Btn" url='/books' />
          <Button text='Store Masterfile' class="btn-primary Btn" url='/storemasterfile' />
          <Button text='Sample Data Table' class="btn-primary Btn" url='/sampledatatable' />
        </div>
        <div className="dash-area-1">
          <Button text='Students' class="btn-primary Btn" url='/student' />
        </div>

        <div className="dash-area-1">
          <Button text='Employees' class="btn-primary Btn" url='/employees' />
          <Button text='Employees-ver2'
            class="btn-primary Btn" url='/employees-ver2' />
        </div>
        <div className="dash-area-1">
          <h3>bY ARIN</h3>
          <Button text='Employees (arin-unfinished edit)'
            class="btn-primary Btn"
            url='/arin-employees' />
        </div>
        
        <div className="dash-area-1">
          <h3>by boostmytool</h3>
          <div className="dash-area-2">
            <Button text='Employee' class="btn-primary Btn" 
            url='/boostmytool-employee' />
          </div>
        </div>

        <div className="dash-area-1">
          <div className="dash-area-2">
            <Button text='Condo' class="btn-primary Btn" url='/condobill' />
            <Button text='Condo1 modal' class="btn-primary Btn" 
            url='/condobill1' />

            <Button text='Condo2 modal' class="btn-primary Btn" 
            url='/condobill2' />


          </div>
          <div className="dash-area-2">

            <Button text='Condo Add' class="btn-primary Btn" url='/condo-add' />
          </div>

        </div>
      </div>

    </>

  )
}


export default Dashboard