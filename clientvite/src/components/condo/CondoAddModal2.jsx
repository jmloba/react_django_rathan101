// modal input
// https://www.youtube.com/watch?v=nYd1grOL0zs 
// 27:55
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axiosInstance from '../../AxiosInstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import {useNavigate } from 'react-router-dom'

const CondoAddModal2 = () => {
    // const [stmtDate,setStmtDate]=useState("")
  const handleDataSave = (e)=>{
    e.preventDefault()
    console.log(' handle data save ')
    
  }

  return (
    <>
{/* ---------add modal---------- */}
    <div className='modal fade' 
        id='addModalForm'
        tabIndex='-1' 
        aria-labelledby='exampleModalLabel'
        // aria-hidden='true'
    >
      <div className="modal-dialog modal-lg ">

        <div className="modal-content">
            <div className="modal-header">
            <h5 className='modal-title' id='exampleModalLabel'>Add new record ##</h5>
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
                
                    // onChange={(e)=>setStmtDate(e.target.value)}
                    // onChange={handleChange('stmtDate')}
                    // required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Statement amount</label>
                    <input type="number" className='form-control'
                    name='stmtAmt' 
                    placeholder='stmtAmt' 
                
                    // onChange={handleChange('stmtAmt')}
                    // required 
                    />
                </div>
                
                  <div className="mb-3">
                    <label className="form-label">Payment Date</label>
                    <input type="date" className='form-control'
                    name='pymtDate' 
                    placeholder='pymtDate' 
                    
                    // onChange={handleChange('pymtDate')}
                    // required 
                    />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Payment Amount</label>
                    <input type="number" className='form-control'
                    name='pymtAmt' 
                    placeholder='pymtAmt' 
                    // value={pymtAmt}
                    // onChange={handleChange('pymtAmt')}
                    // required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Payment Reference</label>
                    <input type="text" className='form-control'
                    name='pymtRef' 
                    placeholder='pymtRef' 
                    // value={pymtRef}
                    // onChange={(e)=>setPymtRef(e.target.value)}
                    // required 
                    />
                </div>
                {/* ------ image--------- */}

                {/* <div className="mb-3">
                    <label className="form-label">Statement Image </label>
                    <input type="file" className='form-control'
                    name='imgStmt' 
                    // onChange={handleStmtImage}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Payment Image </label>
                    <input type="file" className='form-control'
                    name='imgPymt' 
                    // onChange={handlePymtImage}
                    />
                </div> */}

                {/* ------ image--------- */}

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

{/* ---------edit modal---------- */}
  
    <div className='modal fade' 
        id='editModalForm'
        tabIndex='-1' 
        aria-labelledby='exampleModalLabel'
        // aria-hidden='true'
    >
      <div className="modal-dialog modal-lg ">

        <div className="modal-content">
            <div className="modal-header">
            <h5 className='modal-title' id='exampleModalLabel'>Edit  ##</h5>
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
                
                    // onChange={(e)=>setStmtDate(e.target.value)}
                    // onChange={handleChange('stmtDate')}
                    // required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Statement amount</label>
                    <input type="number" className='form-control'
                    name='stmtAmt' 
                    placeholder='stmtAmt' 
                
                    // onChange={handleChange('stmtAmt')}
                    // required 
                    />
                </div>
                
                  <div className="mb-3">
                    <label className="form-label">Payment Date</label>
                    <input type="date" className='form-control'
                    name='pymtDate' 
                    placeholder='pymtDate' 
                    
                    // onChange={handleChange('pymtDate')}
                    // required 
                    />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Payment Amount</label>
                    <input type="number" className='form-control'
                    name='pymtAmt' 
                    placeholder='pymtAmt' 
                    // value={pymtAmt}
                    // onChange={handleChange('pymtAmt')}
                    // required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Payment Reference</label>
                    <input type="text" className='form-control'
                    name='pymtRef' 
                    placeholder='pymtRef' 
                    // value={pymtRef}
                    // onChange={(e)=>setPymtRef(e.target.value)}
                    // required 
                    />
                </div>
                {/* ------ image--------- */}

                {/* <div className="mb-3">
                    <label className="form-label">Statement Image </label>
                    <input type="file" className='form-control'
                    name='imgStmt' 
                    // onChange={handleStmtImage}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Payment Image </label>
                    <input type="file" className='form-control'
                    name='imgPymt' 
                    // onChange={handlePymtImage}
                    />
                </div> */}

                {/* ------ image--------- */}

                <div className="modal-footer d-block">
                    <button type='submit'
                    className='btn btn-success float-end'
                      data-bs-dismiss='modal' > Save Row </button>
                             <button type='submit'
                    className='btn btn-danger float-start'
                      data-bs-dismiss='modal' > Delete Row </button>
                </div>

            </form>
            </div>
        </div>
  
      </div>

    
    </div>







    </>
  )
}

export default CondoAddModal2