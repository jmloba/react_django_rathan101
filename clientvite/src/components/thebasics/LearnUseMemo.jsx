import React from 'react' 
import {useState, useMemo} from 'react'


const LearnUseMemo = () => {
  const [count,setCount] = useState(0)
  const [number,setNumber] = useState(111000000)


  const handleIncrease = () =>{
    setCount(count + 1)
  } 
  // const sumOfNumbers = () =>{
  //   let sum = 0
  //   for (let i = 1; i <= number; i++) { 
  //     sum += i
  //   }
  //   return sum
  // }
    const sumOfNumbers = useMemo(()=>{
      let sum = 0;
      for (let i = 1; i <= number; i++) { 
        sum += i
      }
  },[])
  
  console.log(`sum of numbers : ${number}`,sumOfNumbers)
    
    
    return (
    <>
    <div className="area1">
      <div className="topic">
        <h4>Use memo</h4>  
        <p>count : {count}</p>
        <button className='btn' onClick={handleIncrease}> increase</button>
        <p>number {number}</p>

      </div>
      </div>

        </>
  )
}

export default LearnUseMemo