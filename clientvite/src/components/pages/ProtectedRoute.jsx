import React from 'react'
import { Navigate} from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const ProtectedRoute = ({isLoggedIn}) => {
  return (
    <>
    {isLoggedIn ? <Outlet />:<Navigate to='/login' />}
    </>
  )
  
    
  
  
  
}

export default ProtectedRoute