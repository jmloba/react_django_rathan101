import React from 'react'
import  useCounter from '../../hooks/useCounter'



const LearnCustomHooks = () => {

    const {count, increment, decrement,reset}  = useCounter(10   )


  return (
    <>
    <h4>Custom hooks</h4>
    <h5>Count {count}</h5>
    <button onClick={increment}>increment</button>

    <button onClick={decrement}>decrement</button>
     <button onClick={reset}>reset</button>
    </>
  )
}

export default LearnCustomHooks