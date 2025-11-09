import React from 'react'
import {useState,useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceFive, faSpinner, faStepBackward } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const Login = () => {
    const [username , setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate()
    const [errors,setErrors] = useState('')
    const { 
      isLoggedIn,setIsLoggedIn,
      theme,setTheme,
      loggedInUser,setLoggedInUser

    } = useContext(AuthContext)

    const handleLogin = async (e)=>{
      e.preventDefault()
      setLoading(true)
      console.log('check if already loggedin',isLoggedIn)
      
      const userData = {username, password}
      console.log('user input: ',userData)
      try{
        const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData)
        
        localStorage.setItem('accessToken',response.data.access)
        localStorage.setItem('refreshToken',response.data.refresh)
        localStorage.setItem('loggedInUser',username)
        setIsLoggedIn(true)
        setLoggedInUser(username)
        console.log (loggedInUser)
        console.log('response is :', response.data)
        console.log('userlogged in :',loggedInUser)
        console.log('logged in successfully  *****')
        navigate('/')
        // console.log('value of isloggedin:', isLoggedIn)
        
      }catch(error){
        console.error('response is :', error.response.data)
        console.log('invalid credential (login)')
        setErrors('Invalid Credentials...')

      }finally{
        setLoading(false)
      }
    }
  return (
    <>
    <div className='container container-1  '>
      <div className="row justify-content-center">
        <div className="col-md-6 p-5 bg-light-dark rounded" >
          <h3 className='text-light text-center form-title'>Login to Portal</h3>
          <form onSubmit={handleLogin} >
            <div className="mb-3">
              <input type="text" className='form-control ' placeholder='Enter Username' value={username} onChange={(e)=> setUsername(e.target.value)}/>

            </div>
            <div className='mb-3'>
              <input type="password" className='form-control ' placeholder='Enter Epassword' value={password} onChange={(e)=>setPassword(e.target.value)}/>

            </div>
            {errors && 
              <div className='alert alert-danger'>{errors}</div>
            }

            {loading ?(
             <button type = 'submit' className='btn btn-info d-block mx-auto' disabled >
              <FontAwesomeIcon icon={faSpinner} spin/>
              Logging In</button> 
            ):(
            <button type = 'submit' className='btn btn-info d-block mx-auto'>Login</button>
            )}

          </form>
        </div>
      </div>
      
    </div>
    
    </>
  )
}



export default Login