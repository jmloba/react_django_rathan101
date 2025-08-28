import React from 'react'

const LearnEvents = () => {
  const handleClick = () =>{  
    alert("you clicked me")
    console.log ('button pressed')
  }
  const handleClickAgain = (e) =>{
    alert("you clicked me again")
    console.log ('button pressed again',e)

  }

  return (
    <>
    <div className="area1">
        <div className="topic">
            <h5>Learn Events</h5>
            <div className='btn-section d-flex' >
               <button className='btn btn-primary-outline' onClick={handleClick}>click here</button>
              <br />
              <button className='btn 'onClick={()=>handleClickAgain('PASSED CLICKED')} > another button</button>

            </div>

        </div>
    </div>
    
    </>
  )
}

export default LearnEvents
