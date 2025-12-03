import React from 'react'
import { AuthContext } from '../../AuthProvider'
import { useState, useContext, useEffect } from 'react'
export  function  hasPermission (checkValues)  {
 const {
    isLoggedIn, setIsLoggedIn,
    email ,setEmail,
    theme, setTheme,
    loggedInUser, setLoggedInUser,
    permissions,setPermissions 
    } = useContext(AuthContext)

    
  console.log(' authcontext -> permissions type :', typeof(permissions))


   const valuesArray = Object.values(permissions).includes(checkValues);
   console.log('Permission :valuesArray : ', valuesArray)
   console.log('function permission -values array ', typeof ( valuesArray),  'search :', checkValues) 

  return valuesArray

}


