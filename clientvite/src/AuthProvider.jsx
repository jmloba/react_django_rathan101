import React from 'react'
import {useState, useContext,createContext} from 'react'


// create the context
const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const[ isLoggedIn,setIsLoggedIn] =useState(
        !!localStorage.getItem('accessToken')
    )
    const [theme,setTheme]=useState('light')
    const [loggedInUser,setLoggedInUser]=useState('')
  return (
    <AuthContext.Provider value={
      {isLoggedIn,setIsLoggedIn,  
        theme ,setTheme,
        loggedInUser,setLoggedInUser}
        }>
        {children
        }
    </AuthContext.Provider>
  )
}

export default AuthProvider
export {AuthContext} 