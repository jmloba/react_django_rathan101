// https://www.youtube.com/watch?v=2-6K-TMA-nw


import React, { useState, useEffect, useContext } from 'react'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider(props) {

    const [user_Id, setUser_Id] = useState('')
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] =useState(false)
    const [theme, setTheme] = useState('light')
    const [email, setEmail] = useState('')
    const [permissions, setPermissions] = useState('')
    

    const value = {
        user_Id, setUser_Id,
        loggedInUser, setLoggedInUser,
        isLoggedIn, setIsLoggedIn,
        theme, setTheme,
        email, setEmail,
        permissions, setPermissions,
        
    }
    
    return  (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
        
    )


}