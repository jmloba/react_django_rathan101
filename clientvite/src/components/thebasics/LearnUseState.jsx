import React from 'react'
import {useState} from 'react'  
const LearnUseState = () => {
    const [number,setNumber] = useState(0)  // usestate returns an array with 2 values
    const [stockPrice,setStockPrice] = useState(100)

    const handleChange = (e) =>{
      setNumber(e.target.value)
      console.log(e.target.value)
    } 
    const handleReset = () =>{
      setNumber(0)
    }
    const handlePrice = () =>{
      let newPrice = stockPrice + 10
      setStockPrice(newPrice)
      console.log(newPrice)
    }
  return (
    <>  
    <div className="area1">
        <div className="topic">     
          <h4>useState</h4>
          <div className="sample1">
            <input type="text" onChange={handleChange} value={number}/>
            <button className='btn btn-outline' onClick={handleReset} >clear</button>
            <div>{number} </div>

          </div> 
          <div className="sample2">
            <button className='btn btn-outline' onClick={handlePrice} >click here</button>
            <p>Price is {stockPrice} </p>
          </div>        
          
       </div>
      </div>
    </>

  )
}

export default LearnUseState
