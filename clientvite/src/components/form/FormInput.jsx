import React from 'react'
import "./forminput.css"

const FormInput = (props) => {
  return (

    <div className="formInput">
      <label htmlFor="">{props.label}</label>
      <input 
       name={props.name}
       placeholder={props.placeholder}
       />
    </div>
  )
}

export default FormInput
