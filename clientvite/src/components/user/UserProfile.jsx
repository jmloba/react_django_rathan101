import React from 'react'
import { useState ,useContext,useEffect} from 'react'
import { AuthContext } from '../../AuthProvider';

const UserProfile = () => {
  const {
    isLoggedIn, setIsLoggedIn,
    theme, setTheme,
    loggedInUser, setLoggedInUser

  } = useContext(AuthContext)
  return (
    <>
    <div className="container text-center">
      <div>
            {isLoggedIn ? (
                <>
                    <h1>Welcome, {loggedInUser}</h1>
                    <p>Current Theme: {theme}</p>
                    <button onClick={() => setIsLoggedIn(false)}>
                        Log Out
                    </button>
                </>
            ) : (
                <p>Please log in.</p>
            )}
        </div>
    </div>


    </>


  )
}

export default UserProfile