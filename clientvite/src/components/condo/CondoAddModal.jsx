import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axiosInstance from '../../AxiosInstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import {useNavigate } from 'react-router-dom'

const CondoAddModal = () => {
    const [stmtDate,setStmtDate]=useState("")
    const [stmtAmt,setStmtAmt]=useState("")


    const [pymtDate,setPymtDate]=useState("")
    const [pymtAmt,setPymtAmt]=useState("")
    const [pymtRef,setPymtRef]=useState("")

    const [imgStmt,setImgStmt]=useState(null)
    const [imgPymt,setImgPymt]=useState(null)

    const [errors,setErrors]= useState({})
    const [success,setSuccess]=useState(false)
    const [loading,setLoading] = useState(false)
    const navigate=useNavigate()
    function handleStmtImage(e){
      setImgStmt(e.target.files[0])

    }
    function handlePymtImage(e){
      setImgPymt(e.target.files[0])

    }
    const handleDataSave = async (e)=>{
        e.preventDefault()
        console.log('stmt date: ', stmtDate)
        console.log('stmt amt:', stmtAmt)
         
        const formData = new FormData()
        formData.append('statement_date', stmtDate) 
        formData.append('statement_amount', stmtAmt) 
        formData.append('payment_date', pymtDate)
        formData.append('payment_amount', pymtAmt)
        formData.append('payment_ref', pymtRef)
        if (imgStmt !== null) {
            formData.append('img_stmt', imgStmt)
            } 

       if (imgPymt !== null) {
            formData.append('img_pymt', imgPymt)
            } 

   
   
     

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
            {/* add modal design */}
            <div className='modal fade' 
                id='addModalForm'
                tabIndex='-1' 
                aria-labelledby='exampleModalLabel'
                // aria-hidden='true'
            >
              <div className="modal-dialog modal-lg ">

                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className='modal-title' id='exampleModalLabel'>Add new record</h5>
                    <button type='button' className='btn-close' 
                    data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    
                    <div className="modal-body">
                    <form  method='post' onSubmit={handleDataSave}>
                        <div className="mb-3">
                            <label className="form-label">Statement Date</label>
                            <input type="date" className='form-control'
                            name='stmtDate' 
                            placeholder='stmtDate' 
                            value={stmtDate}
                            onChange={(e)=>setStmtDate(e.target.value)}
                            // required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Statement amount</label>
                            <input type="number" className='form-control'
                            name='stmtAmt' 
                            placeholder='stmtAmt' 
                            value={stmtAmt}
                            onChange={(e)=>setStmtAmt(e.target.value)}
                            // required 
                            />
                        </div>
                        
                          <div className="mb-3">
                            <label className="form-label">Payment Date</label>
                            <input type="date" className='form-control'
                            name='pymtDate' 
                            placeholder='pymtDate' 
                            value={pymtDate}
                            onChange={(e)=>setPymtDate(e.target.value)}
                            // required 
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label className="form-label">Payment Amount</label>
                            <input type="number" className='form-control'
                            name='pymtAmt' 
                            placeholder='pymtAmt' 
                            value={pymtAmt}
                            onChange={(e)=>setPymtAmt(e.target.value)}
                            // required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Payment Reference</label>
                            <input type="text" className='form-control'
                            name='pymtRef' 
                            placeholder='pymtRef' 
                            value={pymtRef}
                            onChange={(e)=>setPymtRef(e.target.value)}
                            // required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Statement Image </label>
                            <input type="file" className='form-control'
                            name='imgStmt' 
                            onChange={handleStmtImage}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Payment Image </label>
                            <input type="file" className='form-control'
                            name='imgPymt' 
                            onChange={handlePymtImage}
                            />
                        </div>

                        <div className="modal-footer d-block">
                            <button type='submit'
                            className='btn btn-warning float-end'
                             data-bs-dismiss='modal' 
                        > 
                        Submit </button>
                        </div>

                    </form>
                    </div>
                </div>
          
              </div>

            
            </div>
            {/* end modal design */}
            {/* ------ edit  modal design */}
            <div className='modal fade' 
                id='editModalForm'
                tabIndex='-1' 
                aria-labelledby='exampleModalLabel'
                // aria-hidden='true'
            >
              <div className="modal-dialog modal-lg ">

                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className='modal-title' id='exampleModalLabel'>Edit record</h5>
                    <button type='button' className='btn-close' 
                    data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className="modal-body">
                    <form  method='post' onSubmit={handleDataSave}>
                        <div className="mb-3">
                            <label className="form-label">Statement Date</label>
                            <input type="date" className='form-control'
                            name='stmtDate' 
                            placeholder='stmtDate' 
                            value={stmtDate}
                            onChange={(e)=>setStmtDate(e.target.value)}
                            // required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Statement amount</label>
                            <input type="number" className='form-control'
                            name='stmtAmt' 
                            placeholder='stmtAmt' 
                            value={stmtAmt}
                            onChange={(e)=>setStmtAmt(e.target.value)}
                            // required 
                            />
                        </div>
                        
                          <div className="mb-3">
                            <label className="form-label">Payment Date</label>
                            <input type="date" className='form-control'
                            name='pymtDate' 
                            placeholder='pymtDate' 
                            value={pymtDate}
                            onChange={(e)=>setPymtDate(e.target.value)}
                            // required 
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label className="form-label">Payment Amount</label>
                            <input type="number" className='form-control'
                            name='pymtAmt' 
                            placeholder='pymtAmt' 
                            value={pymtAmt}
                            onChange={(e)=>setPymtAmt(e.target.value)}
                            // required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Payment Reference</label>
                            <input type="text" className='form-control'
                            name='pymtRef' 
                            placeholder='pymtRef' 
                            value={pymtRef}
                            onChange={(e)=>setPymtRef(e.target.value)}
                            // required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Statement Image </label>
                            <input type="file" className='form-control'
                            name='imgStmt' 
                            onChange={handleStmtImage}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Payment Image </label>
                            <input type="file" className='form-control'
                            name='imgPymt' 
                            onChange={handlePymtImage}
                            />
                        </div>

                        <div className="modal-footer d-block">
                            <button type='submit'
                            className='btn btn-success float-end'
                             data-bs-dismiss='modal' 
                             > Save Edit Record </button>
                            <button type='submit'
                            className='btn btn- float-start'
                             data-bs-dismiss='modal' 
                             > Delete  Record </button>
                        </div>

                    </form>
                    </div>
                </div>
          
              </div>

            
            </div>
            {/* end modal design */}
    </>
  )
}

export default CondoAddModal