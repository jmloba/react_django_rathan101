import React from 'react'

const LearnProps = ({name,age}) => {
  return (
    
    <>
    <div className="area1">
        <div className="topic">
            <h3> Learning Props</h3>
            <h5>Name <span>{name}</span></h5>
            <p>Age <span>{age}</span></p>
        </div>
        
    </div>
    </>
  )
}

export default LearnProps
