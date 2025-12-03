import React from 'react'

import Button from '../Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider'
import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar001 from '../navbar/Navbar001'

const Header = () => {
   const {
    isLoggedIn, setIsLoggedIn,
    email ,setEmail,
    theme, setTheme,
    loggedInUser, setLoggedInUser,
    permissions,setPermissions 
  
    } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = ()=>{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('loggedInUser')
    localStorage.removeItem('permissions')
    localStorage.removeItem('userId')
    localStorage.removeItem('user_id')
    localStorage.removeItem('email')  
    setIsLoggedIn(false)
    
    navigate('/login')
  }

  return (
    
    <>
    <Navbar001/>

    <nav className='navbar      pt-3 pb-3 align-items-start'>     
       <Link to="/" className='navbar-brand text-light' >Stock Prediction portal</Link>
      <div>
        {isLoggedIn ? (
          <>
          <Button  text='Tutorials' class='btn-info' url='/tutorDashboard'/>
                   &nbsp;
          <Button  text='dashboard' class='btn-info' url='/dashboard'/>
                   &nbsp;
           <button className='btn btn-outline-danger' onClick={handleLogout}> Logout</button>
          </>

        ):(
          <>
          <Button  text='Login' class='btn-outline-info' url='login'/>
        
        &nbsp;
        <Button text='Register' class='btn-info' url='/register' />
        
          </>
          
        )}

        
      </div>

    </nav>
    
    
    
    </>
    
  )
}

export default Header