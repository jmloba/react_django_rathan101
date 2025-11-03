import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axiosInstance from '../../AxiosInstance';
import CondoTable from './CondoTable';
import CondoAddModal from './CondoAddModal';


const Condo1 = () => {
    const [data,setData] = React.useState([])

    useEffect( 
    ()=>{
    const fetchProtectedData= async ()=>{
      try{
        const response = await axiosInstance.get('/condobill/')
        setData(response.data)
        console.log('response fetching the data condobill:',response.data)


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
            <h1>Condo Bills 1</h1>
            <h4>
                Fetching data from Api / Displaying in Table
            </h4>
            
            <div className="d-flex flex-row">
              <button type='button' 
                className='me-3 btn btn-primary ml-auto d-block mb-2'
                data-bs-toggle='modal'
                data-bs-target='#addModalForm'>
                 Add Data +
              </button>


            </div>

           
            
            <div className="data-list">  
              <CondoTable data={data}/>
            </div>
            <CondoAddModal/>


 

      </div>
    </div>
    </>
  )
}

export default Condo1