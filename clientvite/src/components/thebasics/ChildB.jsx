import React from 'react'
import ChildC from './ChildC'

const ChildB = () => {
  return (
    <>
    <hr />
      <div className='area1'>
          <div className="topic">
            <h4>ChildB</h4>
            <ChildC />

          </div>
        </div>
    </>
    
  
  )
}

export default ChildB