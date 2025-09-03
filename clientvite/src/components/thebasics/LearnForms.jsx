import React from 'react'
import {useState} from 'react';
const LearnForms = () => {
  // const [empid,setEmpid] = useState('')
  // const [empName,setEmpName] = useState('')

  const [formData,setFormData] = useState({
    empid:'',
    empName:''  
  })
  const handleChange =(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
    }

  const handleSave =(e)=>{
    e.preventDefault()
    
    alert(`Employee Id: ${formData.empid} \nEmployee Name:  ${formData.empName} `)



    }

  return (

    <>
       <div className="area1">
        <div className="topic">
            <h4>Learn Forms</h4>

            <div className="form-area">
                <form onSubmit={handleSave} className='form'>    
                  <div className="form-data"> 
                    <div className="form-group ">

                      <div className="row ">
                        {/* <label className={`form-text   `} htmlFor="empid">Employee Id</label> */}
                        <input type="text" className='form-control'
                        name='empid' id='empid'
                        placeholder='Employee Id'
                        value={formData.empid} 
                        onChange={handleChange} required
                        />

                      </div>
                      <div className="row ">
                        {/* <label className={`form-text   `} htmlFor="empName">Employee Id</label> */}
                        <input type="text" className='form-control'
                        name='empName' id='empName'
                        placeholder='Employee Name'
                        value={formData.empName} 
                        onChange={handleChange} required
                        />

                      </div>
                      {/* <button onClick={handleSave}>Save</button> */}
                      <input type="submit" value = 'Submit'/>
               
                    </div>
                  </div>
                    
     
                    
                </form>    

            </div>

        </div>
        </div>
    </> 
 )
}

export default LearnForms