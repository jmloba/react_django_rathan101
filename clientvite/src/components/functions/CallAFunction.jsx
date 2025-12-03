import React from 'react'
import { useState } from 'react'
import { Greet, Greet2 } from './Greet'

const CallAFunction = () => {
  const [title, setTitle] = useState('')
  const [funcTitle, setFuncTitle] = useState('')
  const [mGreet2, setMGreet2] = useState('')


  const handleSubmitTitle = (e) => {
    e.preventDefault()
    console.log('Title :', title)
    setFuncTitle(Greet(title))
    console.log ('Greet returned ->: ',funcTitle)
  }

  const handleGreet2 = (e) => {

    e.preventDefault()
    console.log('this is calling function 2')
    setMGreet2(Greet2(title))
    

  }
  return (
    <>
      <div className="container">
        <h2>Call a function</h2>
        <div className="item1">
          <form onSubmit={handleSubmitTitle}>
            <div className="form-group">
              <input type="text"
                className="form-control form-control-lg"
                placeholder="Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />

            </div>
            <button type='submit' className='btn btn-primary btn-sm'>Submit</button>
            <button type='button'
              onClick={handleGreet2}
              className='btn btn-primary btn-sm'
            >call Greet2 function</button>

          </form>
          {funcTitle}

          {mGreet2 &&
            <div>
              <h5>Greet2 : {mGreet2}</h5>
            </div>
          }

        </div>
      </div>
    </>

  )
}

export default CallAFunction