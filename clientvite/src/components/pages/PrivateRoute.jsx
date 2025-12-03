import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children,isLoggedIn}) => {
  return (
    <div>{isLoggedIn?children:<Navigate to='/login' />}</div>
  )
}

export default PrivateRoute