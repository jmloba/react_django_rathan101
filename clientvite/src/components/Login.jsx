import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceFive, faSpinner, faStepBackward } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'
import axiosInstance from '../AxiosInstance'

import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'
import "../assets/css/formcss.css"

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [errors, setErrors] = useState('')
  const [user, setUser] = useState(null);
  const {
    isLoggedIn, setIsLoggedIn,
    email ,setEmail,
    theme, setTheme,
    loggedInUser, setLoggedInUser,
    permissions,setPermissions ,
    user_Id,setUser_Id
     

  } = useContext(AuthContext)

  const [afterLogin, setAfterLogin] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log('check if already loggedin', isLoggedIn)

    const userData = { username, password }
    console.log('user input: ', userData)
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData)

      console.log('*****--->>during login -->response : ', response.data)
      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      localStorage.setItem('loggedInUser', username)
      setAfterLogin(true)  
      setIsLoggedIn(true) 
      setLoggedInUser(username)
      

      // console.log('value of isloggedin:', isLoggedIn)
      // navigate('/')

    } catch (error) {
      console.log('response is :', error.response)
      console.log('invalid credential (login)')
      setErrors('Invalid Credentials...')
    } finally {
      setLoading(false)
    }
  }


  useEffect(
    () => {
      console.log('1.routine to fetch user data')
      const fetchProtectedData = async () => {
        try {
          const token = localStorage.getItem('accessToken')
          // check url from app_api
          // path('user-data/', views.get_user_data, name='user_data'),
          const response_user = await axiosInstance.get('/user-data/',
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
            }
          )
          console.log('1.user data -->>',response_user.data)
          setEmail(response_user.data.email)
          // navigate('/')
          
        } catch (error) {
          console.error('error getting userdata', error.response)
        }
      }
      fetchProtectedData();
    }, [afterLogin]
  )

  useEffect(
    () => {
      console.log('2.routine to fetch user data   ** permission')
      const fetchProtectedData = async () => {
        try {
          const token = localStorage.getItem('accessToken')
          const response_perm = await axiosInstance.get('/user-permission/',
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
              },

            }

          )
          console.log ('******** getting permission   **** -->>',response_perm.data)        
          setPermissions(response_perm.data.permissions)
          localStorage.setItem('permissions', response_perm.data.permissions)
         
          console.log('2. is logged in -->', isLoggedIn)
          navigate('/')
        } catch (error) {
          console.error('error getting userdata', error.response_perm)
        }
      }
      fetchProtectedData();
    }, [afterLogin]
  )

  return (
    <>
      <div className='container container-1  '>
        <div className="row justify-content-center">
          <div className="col-md-6 p-5 bg-light-dark rounded" >
            <h3 className='text-center form-title'>Login to Portal</h3>

            <form onSubmit={handleLogin} >
              <div className="mb-3">
                <input type="text" className='form-control ' 
                placeholder='Enter Username' value={username} 
                onChange={(e) => setUsername(e.target.value)} />

              </div>
              <div className='mb-3'>
                <input type="password" className='form-control ' 
                placeholder='Enter Epassword' value={password} 
                onChange={(e) => setPassword(e.target.value)} />

              </div>
              {errors &&
                <div className='alert alert-danger'>{errors}</div>
              }

              {loading ? (
                <button type='submit' className='btn btn-info d-block mx-auto' disabled >
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Logging In</button>
              ) : (
                <button type='submit' className='btn btn-info d-block mx-auto'>Login</button>
              )}

            </form>
          </div>
        </div>

      </div>

    </>
  )
}



export default Login