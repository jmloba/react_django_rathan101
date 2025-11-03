//https://www.youtube.com/watch?v=nYd1grOL0zs



import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axiosInstance from '../../AxiosInstance';
import Condo2Table from './Condo2Table';
import CondoAddModal2 from './CondoAddModal2';
import { createRoutesFromChildren } from 'react-router-dom';
import {useNavigate } from 'react-router-dom'

const Condo2 = () => {

  const navigate=useNavigate()
  const [posts,setPosts] = React.useState([])

  const[saving,setSaving]= useState(false)


  const [editPostId,setEditPostId]= useState(null)
  const [editFormData,setEditFormData]=useState({
    stmtDate :'', 
    stmtAmt :'',
    pymtDate:'',
    pymtAmt:'',
    pymtRef:'',
    imgStmt:null,
    imgPymt:null
  })
  //edit data value
  const handleEditChange= (input) => (e)=>{
    e.preventDefault()
    setEditFormData({...editFormData,[input]:e.target.value})

  }
  //save form data
  const handleFormSave = (e)=>{
    e.preventDefault()
    const savePost ={
      id:editPostId,
      statement_date : editFormData.stmtDate,
      statement_amount : editFormData.stmtAmt,
      payment_date: editFormData.pymtDate,
      payment_amount : editFormData.pymtAmt,
      payment_ref : editFormData.pymtRef,
      img_stmt : editFormData.imgStmt,
      img_pymt :editFormData.imgPymt


    }
    const newPost = [...posts]

  }

  const [addPost, setAddPost] = useState({
    stmtDate :'', 
    stmtAmt :'',
    pymtDate:'',
    pymtAmt:'',
    pymtRef:'',

    }
  )
  const [imgStmt,setImgStmt]=useState(null)
  const [imgPymt,setImgPymt]=useState(null)

  const handleChange = (input) => (e) =>{
    e.preventDefault()
    console.log(addPost)
    setAddPost({...addPost,[input]:e.target.value})
    console.log ('on change from input:', {input},e.target.value)

  } 
  function handleStmtImage(e){
      setImgStmt(e.target.files[0])

    }
  function handlePymtImage(e){
      setImgPymt(e.target.files[0])

    }
  // -----------------edit data
  const handleEditPostForm = (e,posts) =>{
    e.preventDefault()
    setEditPostId(posts.id)
    const formValues ={
      statement_date  :    posts.stmtDate,
      statement_amount :    posts.stmtAmt,
      payment_date:         posts.pymtDate,
      payment_amount:   posts.pymtAmt,
      payment_ref :     posts.pymtRef,
      img_stmt:imgStmt,
      img_pymt:imgPymt

     
    }
     setEditFormData(formValues)
  }
  // -----------------save-add data
  const handleAddPost= async (e)=>{
    e.preventDefault()
    
    const newPost={
      statement_date : addPost.stmtDate,
      statement_amount :addPost.stmtAmt,
      payment_date: addPost.pymtDate,
      payment_amount  : addPost.pymtAmt,
      payment_ref :addPost.pymtRef,
      img_stmt:imgStmt,
      img_pymt:imgPymt

      
    }
    const formData = new FormData()
    formData.append('statement_date', addPost.stmtDate) 
    formData.append('statement_amount',addPost.stmtAmt)
    formData.append('payment_date',addPost.pymtDate)
    formData.append('payment_amount',addPost.pymtAmt)
    formData.append('payment_ref',addPost.pymtRef)
    if (imgStmt !== null){
      formData.append('img_stmt', imgStmt)
    }
    if (imgPymt !== null){
      formData.append('img_pymt', imgPymt)
    }

    console.log('record to add: ',newPost)
    const newPosts =[...posts,newPost]
 
    //saving
    try{
      const response = await axiosInstance.post('/condobill/',formData,
           {
             headers: {'Content-Type':'multipart/form-data' }
          }
         )
        setSaving(true)
        console.log('response after saving:', response.data)
        // clear errors
            navigate('/condobill2')  


    }catch(error){
      console.log('error add post ',error.response.data)
    }
    // finally{
    // setSaving(false

    // )}
    
  }
  const handleDataSave=(e)=>{
    console.log('handle data save')
  }

  useEffect( 
    ()=>{
    const fetchProtectedData= async ()=>{
      try{
        const response = await axiosInstance.get('/condobill/')
        setPosts(response.data)
        setSaving(false)
        console.log('useeffect : response fetching the data ***condobill:',response.data)
      }catch(error){
        console.error ('\n error (fetchProtectedData )fetching data',error.response)

      }
    }
    fetchProtectedData();
    },[saving]
  )  
  return (
    <>
    <div className="container">
      <h2>Condo 2</h2>
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
        <Condo2Table data={posts} handleEditPostForm={handleEditPostForm}/>
      </div>
      {/* <CondoAddModal2/> */}
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
              <form  method='post' onSubmit={handleAddPost} >
                  <div className="mb-3">
                      <label className="form-label">Statement Date</label>
                      <input type="date" className='form-control'
                      name='stmtDate' 
                      placeholder='stmtDate' 
                       onChange={handleChange('stmtDate')}
                      required 
                      />
                  </div>
                  <div className="mb-3">
                      <label className="form-label">Statement amount</label>
                      <input type="number" className='form-control'
                      name='stmtAmt' 
                      placeholder='stmtAmt' 
                  
                      onChange={handleChange('stmtAmt')}
                      required 
                      />
                  </div>
                  
                    <div className="mb-3">
                      <label className="form-label">Payment Date</label>
                      <input type="date" className='form-control'
                      name='pymtDate' 
                      placeholder='pymtDate' 
                      
                      onChange={handleChange('pymtDate')}
                      // required 
                      />
                  </div>
                  
                  <div className="mb-3">
                      <label className="form-label">Payment Amount</label>
                      <input type="number" className='form-control'
                      name='pymtAmt' 
                      placeholder='pymtAmt' 
                      // value={pymtAmt}
                      onChange={handleChange('pymtAmt')}
                      // required 
                      />
                  </div>
                  <div className="mb-3">
                      <label className="form-label">Payment Reference</label>
                      <input type="text" className='form-control'
                      name='pymtRef' 
                      placeholder='pymtRef' 
                      onChange={handleChange('pymtRef')}
                      // required 
                      />
                  </div>
                  {/* ------ image--------- */}

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
                  
                     
                      onChange={handleEditChange('stmtDate')}
                      required 
                      />
                  </div>
                  <div className="mb-3">
                      <label className="form-label">Statement amount</label>
                      <input type="number" className='form-control'
                      name='stmtAmt' 
                      placeholder='stmtAmt' 
                  
                     onChange={handleEditChange('stmtAmt')}
                      required 
                      />
                  </div>
                  
                    <div className="mb-3">
                      <label className="form-label">Payment Date</label>
                      <input type="date" className='form-control'
                      name='pymtDate' 
                      placeholder='pymtDate' 
                      
                     onChange={handleEditChange('pymtDate')}
                      
                      required 
                      />
                  </div>
                  
                  <div className="mb-3">
                      <label className="form-label">Payment Amount</label>
                      <input type="number" className='form-control'
                      name='pymtAmt' 
                      placeholder='pymtAmt' 
                       onChange={handleEditChange('pymtAmt')}
           
                      required 
                      />
                  </div>
                  <div className="mb-3">
                      <label className="form-label">Payment Reference</label>
                      <input type="text" className='form-control'
                      name='pymtRef' 
                      placeholder='pymtRef' 
                
                       onChange={handleEditChange('pymtRef')}
                      required 
                      />
                  </div>
                  {/* ------ image--------- */}

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


    </div>
 
    </>

  )
}

export default Condo2