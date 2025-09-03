import React, { useRef } from 'react'
import { useState } from 'react'

const LearnUseRef = () => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const previousNameRef = useRef('')  

  const handleGetData = () => { 
    alert(`your name is ${name}`)
  
  }
  const handleInputName = (e) => { 
    previousNameRef.current = name
    setName(e.target.value)
    console.log(previousNameRef.current);
  }
  const handleClear = () => { 
    setName('')
    refElement_name.current.focus()
  }

  const handleClearAge = () => { 
    setAge('')
    refElement_age.current.focus()
  }

  const refElement_name = useRef('') 
  const refElement_age = useRef('15') 

  console.log(refElement_name);

  return (
   <>
    <div className='area1'>
      <div className="topic">
        <h4>Learn useRef</h4>
        <input type="text" ref={refElement_name} value ={name} 
        onChange={handleInputName}  placeholder='Enter your name'
 />
        <button className='btn btn-primary' onClick={handleGetData}>get name</button>
        <button className='btn btn-primary' onClick={handleClear}>clear</button>
<hr />
        <input type="text" ref={refElement_age} value ={age} onChange={(e)=>setAge(e.target.value)}  placeholder='Enter your age'
 /><button className='btn btn-primary' onClick={handleClearAge}>clear</button>
        <p>Previous valui of name {previousNameRef.current}</p>

      </div>
    </div>
   </>
  )
}

export default LearnUseRef