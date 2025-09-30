import React from 'react'
import { useState,useContext, useEffect } from 'react'
import { AuthContext } from '../../AuthProvider';
import axiosInstance from '../../AxiosInstance';
import Button from '../Button'
const Storemaster = () => {
    const [list,setList] = useState([])
    const config ={'responseType':'blob' }
    const {isLoggedIn, setIsLoggedIn,theme,setTheme} = useContext(AuthContext)
     useEffect(
        ()=>{
          const fetchProtectedData= async ()=>{
          try{
            const response = await axiosInstance.get('/store/masterfile/')
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
        <h1>Store Table</h1>
        <div className="data-list">
        {
          list.map((item)=>{
            return(
              <>
              <li>
                <div className="card" key={item.id}>
                  <p>Id: {item.id}</p>
                  <p>Description: {item.description}</p>
                  <p>Price : {item.price}</p>
                  <div className='img'>
                    <img src={item.image} alt="image" />

                  </div>
          
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

export default Storemaster