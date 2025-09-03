import React from 'react'

const LearnMapFunctions = () => {
  const fruits  = ['apple','banana','grape','mango']
  return (
    <>
    <div className="area1">
        <div className="topic">
            <h4>Learn Map Functions</h4>
            <div className='btn-section d-flex' >
               <ul>
                {
                    fruits.map((fruit,index)=>(
                        <li key={index}>{fruit}</li>
                    ))
                }
               </ul>

            </div>

        </div>
    </div>
    </>
  )
}

export default LearnMapFunctions
