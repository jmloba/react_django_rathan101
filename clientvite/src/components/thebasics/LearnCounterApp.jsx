import React from 'react'
import { useState } from 'react'


const LearnCounterApp = () => {
  const   [counter,setCounter] =useState(0)
  const handleIncrement = () =>{
    setCounter(counter + 1)
  }
  const handleDecrement = () =>{
    setCounter(counter - 1)
  }
  const handleResetCounter = () =>{
    setCounter(0)
  }
  return (
    <>
    <div className='area1'>
        <div className="topic">
            <h4>counterApp</h4>
            <div className='counter'> 
              <p>Counter : {counter}</p>
              <div className="button-group">
                <button onClick={handleIncrement} className='btn btn-primary-outline'>Increment</button>
                <button onClick={handleDecrement} className='btn btn-primary-outline'>Decrement</button>
                <button onClick={handleResetCounter} className='btn btn-primary-outline'>Reset</button>

              </div>
            </div>


        </div>
    </div>
    </>
  )
}

export default LearnCounterApp
