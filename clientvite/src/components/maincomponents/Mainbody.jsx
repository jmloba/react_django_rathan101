import React from 'react'
import Button from '../Button'
import { AuthContext } from '../../AuthProvider'
const mainbody = () => {

const {
    isLoggedIn, setIsLoggedIn,
    email ,setEmail,
    theme, setTheme,
    loggedInUser, setLoggedInUser,
    permissions,setPermissions 
     

  } = useContext(AuthContext)
  return (
    <>
    <div className="container">
      <div className="p-5  bg-light-dark  rounded text-center"  > 
        <h3 className='text-light'>stock prediction portal</h3>
        <p className='text-light lead'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nesciunt obcaecati minus magnam, omnis est, fuga accusamus corrupti nobis porro eveniet amet assumenda voluptatum asperiores quae enim! Consequatur debitis sed quasi possimus dolor quos et enim at ratione maxime, doloribus, dignissimos repudiandae vel sapiente voluptates eligendi dolores atque rem incidunt veniam earum eum? Harum, corrupti!</p>

        <p>Email is  : {email}</p>

        
        <Button text='Login' class='btn-outline-warning'
          />
      </div>
       
       
    </div>
    </>
  )
}

export default mainbody