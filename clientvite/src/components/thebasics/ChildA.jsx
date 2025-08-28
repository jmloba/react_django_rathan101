import React from 'react'
import ChildB from './ChildB'

const ChildA = () => {
  return (

        <div className='area1'>
         <div className="topic">
            <h4>Child A</h4>

            <div className='counter'> 
              <p>Child A - Name :</p>
              <ChildB />

            
            </div>
          </div>    
        </div>

    
  )
}

export default ChildA