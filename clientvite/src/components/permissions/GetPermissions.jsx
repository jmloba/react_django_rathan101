import React from 'react'
import {useState} from 'react'

export const GetPermissions = async () => {
  const [permissions,setPermissions] = useState([])

  try {
    const token = localStorage.getItem('accessToken')
    const response_perm = await axiosInstance.get('/userpermission/',
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    )
    console.log('permission list ->', response_perm.data)
    setPermissions(response_perm.data)
    return permissions


  } catch (error) {
    console.error('error getting userdata', error.response_perm)
    return null
    
  }

  
}


// export default GetPermissions