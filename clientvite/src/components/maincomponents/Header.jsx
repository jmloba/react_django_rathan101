import React from 'react'

import Button from '../Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider'
import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'

const Header = () => {
  const { isLoggedIn,setIsLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = ()=>{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    console.log ('logout pressed')
    navigate('/login')
  }

  return (
    
    <>
    <nav className='navbar container pt-3 pb-3 align-items-start'>     
       <Link to="/" className='navbar-brand text-light' >Stock Prediction portal</Link>
      <div>
        {isLoggedIn ? (
          <>
           
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