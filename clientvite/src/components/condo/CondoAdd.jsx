import React from 'react'
import { useContext, useState } from 'react';
import { AuthContext} from '../../AuthProvider'
import axiosInstance from '../../AxiosInstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import {useNavigate } from 'react-router-dom'


const CondoAdd = () => {
    const { 
      isLoggedIn,setIsLoggedIn,
      theme,setTheme,
      loggedInUser,setLoggedInUser
    } = useContext(AuthContext)

    const [stmtDate,setStmtDate]=useState("")
    const [stmtAmt,setStmtAmt]=useState("")


    const [pymtDate,setPymtDate]=useState("")
    const [pymtAmt,setPymtAmt]=useState("")
    const [pymtRef,setPymtRef]=useState("")

    const [imgStmt,setImgStmt]=useState(null)
    const [imgPymt,setImgPymt]=useState(null)

    function handleStmtImage(e){
      setImgStmt(e.target.files[0])

    }
     function handlePymtImage(e){
      setImgPymt(e.target.files[0])

    }


    const [errors,setErrors]= useState({})
    const [success,setSuccess]=useState(false)
    const [loading,setLoading] = useState(false)
    const navigate=useNavigate()

    const handleCondoSave = async (e)=>{
      e.preventDefault()
     
      console.log('stmtDate:', stmtDate)
      console.log('stmtAmt:', stmtAmt)

      const formData = new FormData()
      formData.append('statement_date', stmtDate) 
      formData.append('statement_amount', stmtAmt) 
      
      formData.append('payment_date', pymtDate)
      formData.append('payment_amount', pymtAmt)
 
      formData.append('payment_ref', pymtRef)
      formData.append('img_stmt', imgStmt)
      formData.append('img_pymt', imgPymt)

      setLoading(true)  
      try{
        const response = await axiosInstance.post('/condobill/',formData,
           {
             headers: {'Content-Type':'multipart/form-data' }
          }
         )
        console.log('response after saving:', response)
        // clear errors
        setErrors({})
        setSuccess(true)
        navigate('/condobill')  
      }catch(error){ 
        setSuccess(false)
        console.log('error in saving:', error.response)
        setErrors(error.response.data)
        
      }finally{
        setLoading(false) 
      }


    }


  return (
    <>

     <div className='main-body  '>
      <div className="mainhead">
        <h2>Add Condo</h2>
              <p>Logged in user : {loggedInUser}</p>
      </div>

      <div className="container">
        <form action="" method='POST' onSubmit={handleCondoSave}>
         
          <div className="form-group">
            <input type="date" 
            className="form-control form-control-lg"
            placeholder="Statement Date"
            name="stmtDate"
            value={stmtDate}
            onChange={(e)=>setStmtDate(e.target.value)}/> 
          </div>
          <div className="form-group">
            <input type="number" 
            className="form-control form-control-lg"
            placeholder="Statement amount"
            name="stmtAmt"
            value={stmtAmt}
            onChange={(e)=>setStmtAmt(e.target.value)}/> 
          </div>

          <div className="form-group">
            <input type="date" 
            className="form-control form-control-lg"
            placeholder="Payment Date"
            name="pymtDate"
            value={pymtDate}
            onChange={(e)=>setPymtDate(e.target.value)}/> 
          </div>
          <div className="form-group">
            <input type="number" 
            className="form-control form-control-lg"
            placeholder="Payment Amount"
            name="pymtAmt"
            value={pymtAmt}
            onChange={(e)=>setPymtAmt(e.target.value)}/> 
          </div>
          <div className="form-group">
            <input type="text" 
            className="form-control form-control-lg"
            placeholder="Payment Ref"
            name="pymtRef"
            value={pymtRef}
            onChange={(e)=>setPymtRef(e.target.value)}/> 
          </div>

          <div className="form-group">
            <input type="file" 
            className="form-control form-control-lg"
            name="imgStmt"
            onChange={handleStmtImage}/> 
            {/* 
            multiple
            onChange={(e)=>setImage(e.target.files[0,1])} 
            */}
          </div>

          <div className="form-group">
            <input type="file" 
            className="form-control form-control-lg"
            name="imgPymt"
            onChange={handlePymtImage}/> 
            {/* 
            multiple
            onChange={(e)=>setImage(e.target.files[0,1])} 
            */}
          </div>

          {success &&
            <div className="alert alert-success">"Data saved..."</div>
             
              } 

            {loading ? (
               <button type='submit' className='btn btn-info d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin/>Please wait</button>
            ):(
               <button type='submit' className='btn btn-info d-block mx-auto'>Save</button>

            )
            
            }
        </form>

      </div>


     </div>
    </>
   
  )
}

export default CondoAdd