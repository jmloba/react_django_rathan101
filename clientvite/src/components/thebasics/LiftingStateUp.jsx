import React from 'react'

const LiftingStateUp = (props) => {
    const handleClick = (e) =>{
        let stock ='tesla'

        props.getStock(stock)
    
    }       
    return (
    <>
     <div className="area1">
        <div className="topic">
            <h4>Lifting State UP</h4>
            <p>passing params from child to parent</p>
            <button className='btn' onClick={handleClick}>click stock</button>

        </div>
    </div>
    </>
  )
}

export default LiftingStateUp
