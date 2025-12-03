import React from 'react'
import {useState, useContext,createContext} from 'react'
import { useEffect } from 'react'



// create the context
const AuthContext = createContext(null)

const AuthProvider = ({children}) => {


    const[ isLoggedIn,setIsLoggedIn] =useState(
        !!localStorage.getItem('accessToken')
    )

    const [theme,setTheme]=useState('light')
    const [email,setEmail]=useState('')
    

    const [loggedInUser,setLoggedInUser]=useState('')
    const [permissions,setPermissions]=useState('')
    const [user_Id,setUser_Id]=useState('')

    const role='user'

   const [allPerm,setAllPerm] = useState([])    

  useEffect(() => {
    // Save user to localStorage whenever it changes

        setLoggedInUser(localStorage.getItem('loggedInUser'))
        setIsLoggedIn(true)

        

        const perm =localStorage.getItem('permissions')
        setPermissions(perm)
        // setUser_Id(localStorage.getItem('user_id'))

        // console.log('perm is :' ,typeof(perm), perm)
            const arrayOfValues = perm.split(',');
     
        

    
    

  }, [loggedInUser]);    
    return (
    <AuthContext.Provider value={{
        isLoggedIn,setIsLoggedIn,
        email ,setEmail,
        theme ,setTheme,
        loggedInUser,setLoggedInUser,
        permissions,setPermissions,
        user_Id,setUser_Id
        
    }}>
        {children
        }
    </AuthContext.Provider>
  )
}

export default AuthProvider
export {AuthContext} 