import React from 'react'
import SpreadEmployee from './SpreadEmployee'
    const employee =[
        {name:'joy', age:20},
        {name:'MIKA',age:45}

    ]
const SpreadOperator01 = () => {
    const array1 = [1,2,3]
    const array2 = [4,5,6]
    const all_array =[...array1,...array2]
    
    const baseEmployeeObject ={
        role :employee,
        department :'HR'
    
    }
    const firstEmployee = {...baseEmployeeObject}


  return (
    <>
    <div className="container">
        <h2>Spread Operator</h2>
        <div className="summary">
            
          

          <SpreadEmployee {...firstEmployee} />

            
        </div>

        
    </div>
    </>
    
  )
}

export default SpreadOperator01