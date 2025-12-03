import React from 'react'
import { AuthContext } from '../../AuthProvider'
import { useState, useContext, useEffect } from 'react'
import axiosInstance from '../../AxiosInstance'



const Profile = () => {
  const {
    isLoggedIn, setIsLoggedIn,
    email ,setEmail,
    theme, setTheme,
    loggedInUser, setLoggedInUser,
    permissions,setPermissions 
 
   } = useContext(AuthContext)
  
  const [userPermissions, setUserPermissions] = useState([]);



  const handleSelectPermission =(e)=>{
    e.preventDefault();
  }
  
  

  useEffect(() => {
  const fetchPermissions = async () => {
    console.log('***-->> Fetching permissions for user: ***', loggedInUser);
      try {
    
          const token = localStorage.getItem('accessToken');
          const response = await axiosInstance.get('/user-permission/', {
              headers: {
                'Authorization': `Token ${token}`

              }
          });
          console.log('---->>>>Fetched permissions:', response.data.permissions);
          setUserPermissions(response.data.permissions);
      } catch (error) {
          console.error('Error fetching user permissions:', error);
      }
  };
  fetchPermissions();
  }, []);



  return (
    <>
    <div className="container">
      <h2>Profile</h2>
      <div className="container">
       <h2>Permissions</h2>
       <h5>user {loggedInUser}</h5>
       <div className="permission-display">
        
       </div>
       
       <form action="">
               {/* ------ permissions list--------- */}
                      
          <div className="row mb-3">
              <label className="col-sm-4 form-label">Permission List </label>
              <div className="col-sm-8">
                <select name="permissionItem"  id="selectPermission" 
                  className='form-select' onChange={handleSelectPermission}>
                  {

                    userPermissions.map(
                      (perm,index )=>(
                        <option key={index} value={perm}>{perm}</option>
                    )
                    )
                  }
                </select>
                
              </div>

          </div>
       </form>
        
      </div>
    </div>
    </>
    
  )
}

export default Profile