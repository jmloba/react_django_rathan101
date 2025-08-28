import React, { use } from 'react'
import { useState, useEffect} from 'react'

const LearnUseEffects = () => {
  const [count,setCount] = useState(0)
  const [randomNumber,setRandomNumber] = useState(0)
  const [age,setAge] = useState(20)

  const handleIncreaseCount = () =>{
    setCount(count + 1)
    console.log('count increased')
  }
  const generateNumber = () =>{
    console.log('generated random number')

    const randomnum = Math.floor(Math.random() * 100) + 1;

    setRandomNumber(randomnum)
  }
  const generateRandomAge = () =>{
    console.log('generated random age')
    const randomage = Math.floor(Math.random() * 100) + 1;

    setAge(randomage)
  }

  //  USING useEffect
  // first time run , use effect will be called
  // when count changes, use effect will be called
  // when age changes, use effect will be called

  useEffect(()=>{

    console.log('use effect called')
    return () =>{
      console.log('cleanup function')
      // setCount(20)
    }
   
  
  },[age,count])

  return (
    <>
    <div className="area1">
      <div className="topic">
        <h4>Count : {count} </h4>
        <button className='btn btn-primary' onClick={handleIncreaseCount}>Increase Count</button>
        <hr />
        <div>
          <h5>Random Number : {randomNumber}</h5>
          <button className='btn btn-primary' onClick={generateNumber}>Generate Random Number</button>
        </div>

        <hr />
          <h5>age: {age}</h5>
          <button className='btn btn-primary' onClick={generateRandomAge}>Generate Random Age</button>

      </div>
    </div>
    </>
  )
}

export default LearnUseEffects
