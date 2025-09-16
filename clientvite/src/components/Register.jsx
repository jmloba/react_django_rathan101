import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
  const [username , setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors,setErrors]= useState({})
  const [success, setSuccess] = useState(false)
  const [loading , setLoading] = useState(false)


  // form submission

  const handleRegistration= async(e)=>{
    e.preventDefault()
    setLoading(true)
    console.log ('username ', username)
    console.log ('email  ', email)
    setErrors({})
    const userData ={
      username, email,password
    }
    console.log('userdata', userData)
    try{

      const response = await axios.post('http://127.0.0.1:8000/api/v1/register/',userData)
      console.log('response :', response.data)
      console.log('registration successful')

      // clear error
      setErrors({})
      setSuccess(true)
      
    }catch(error){
      setErrors(error.response.data)
      console.error('Registration error :',errors);
      

    }finally{
      setLoading(false)
    }


    
  }
  return (
    <>
    <div className='container container-1  '>
      <div className="row justify-content-center">
        <div className="col-md-6 p-5 bg-light-dark rounded" >
          <h3 className='text-light text-center form-title'>Create an Account</h3>
          <form action="" onSubmit={handleRegistration}>
            <div className="mb-3">
              <input type="text" className='form-control ' placeholder='Enter Username' value={username} onChange={(e)=> setUsername(e.target.value)}/>
              <small>{errors.username && 
                <div className='text-danger'>{errors.username}</div>}
              </small>

            </div>
            <div className='mb-3'>
              <input type="email" className='form-control mb-3' placeholder='Enter Email' value ={email} onChange={(e)=>setEmail(e.target.value)}/>
              <small>
                {errors.email && <div className='text-danger'>{errors.email}</div>}
              </small>
            </div>
            <div className='mb-3'>
              <input type="password" className='form-control ' placeholder='Enter Epassword' value={password} onChange={(e)=>setPassword(e.target.value)}/>
              <small>
                {errors.password && <div className='text-danger'>{errors.password}</div>}
              </small>

            </div>
            {success && 
            <div className="alert alert-success">
              <strong>Registration </strong> 
              
              </div>
            }
            {loading ?(
             <button type = 'submit' className='btn btn-info d-block mx-auto' disabled >
              <FontAwesomeIcon icon={faSpinner} spin/>
              Please Wait</button> 
            ):(
            <button type = 'submit' className='btn btn-info d-block mx-auto'>Register</button>
            )}



            

          </form>
        </div>
      </div>
      
    </div>
    
    </>
  )
}

export default Register