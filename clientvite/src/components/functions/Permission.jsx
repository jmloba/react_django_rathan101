import React from 'react'
import { AuthContext } from '../../AuthProvider'
import { useState, useContext, useEffect } from 'react'


export  function  hasPermission (checkValues)  {
 const {
    isLoggedIn, setIsLoggedIn,
    email ,setEmail,
    theme, setTheme,
    loggedInUser, setLoggedInUser,
    permissions,setPermissions ,
    user_Id,setUser_Id
    } = useContext(AuthContext)

  // if permissions is null or undefined.
  const effectivePermissions = permissions ?? {}; 

  const valuesArray = Object.values(effectivePermissions).includes(checkValues); 
  
  
  return valuesArray

}


