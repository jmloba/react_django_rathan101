import React from 'react'
import { useContext, useState } from 'react';
import { AuthContext} from '../../AuthProvider'
import axiosInstance from '../../AxiosInstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import {useNavigate } from 'react-router-dom'
const BooksAdd = () => {
  const {isLoggedIn, setIsLoggedin,theme,setTheme} = useContext(AuthContext)

  const [title,setTitle]=useState("")
  const [errors,setErrors]= useState({})
  const[success,setSuccess]=useState(false)
  const [loading,setLoading] = useState(false)
  const [cover,setCover]=useState(null)
  const navigate=useNavigate()
  
  function handleImage(e){
    setCover(e.target.files[0])
  }
    const handleSaveBook = async (e)=>{
    e.preventDefault()
    const formData = new FormData()

    formData.append('title', title)
    if (cover !== null) {
      formData.append('cover', cover)
    } 
    setLoading(true)
    try{
      const response = await axiosInstance.post('/books/',formData ,
         {
             headers: {'Content-Type':'multipart/form-data' }
          }
      )
      // clear errors
      setErrors({})
      setSuccess(true)
        navigate('/books')


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
    <div className='main-body'>

        <h1>Add Books</h1>
        <div className='add-form'>
          
          {isLoggedIn ?(
            <div>Logged in</div>
          ):(
            <div>
              not logged in
            </div>
          )}
          <div className="container">
             <form  method='POST' onSubmit={handleSaveBook}>
            <div className="form-group">
                <input type="text" 
                className="form-control form-control-lg"
                placeholder="Title"
                name="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}/> 

            </div>
            <div className="form-group">
              
              <label>Select Cover(Image)</label>
              <input type="file" 
                className="form-control form-control-lg"
                
                name="cover"
                onChange={handleImage}

                // multiple
                // onChange={(e)=>setImage(e.target.files[0,1])}
                />
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
    
    </div>
    </>
    
  )
}

export default BooksAdd