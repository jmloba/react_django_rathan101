import React from 'react'
import {useState} from 'react'

const LearnConditionalRendering = () => {
    const [isLoggedin, setIsLoggedin]= useState(false)  
    const [status, setStatus]= useState('true')
    const handleClick = () =>{
        setIsLoggedin(!isLoggedin)
    }
  return (
   <>
       <div className="area1">
        <div className="topic">
            <h4>Conditional Rendering</h4>
            <button className='btn btn-primary' onClick={handleClick}>toggle log in</button>
            
            {isLoggedin? <h6>'the user is logged in'</h6> :<h6>'the user not  logged in'</h6> }
            
            { status &&     <h6>'the status is true'</h6>   }
            
        </div>
       </div>   



   </>
  )
}

export default LearnConditionalRendering