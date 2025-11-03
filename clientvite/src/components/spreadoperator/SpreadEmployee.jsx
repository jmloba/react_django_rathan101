import React from 'react'

const SpreadEmployee = (props) => {
    const {name,age} =props
  return (
    <>
    <h5>
        {`name: ${name} Age: ${age}`}
    </h5>
    </>
    
  )
}

export default SpreadEmployee