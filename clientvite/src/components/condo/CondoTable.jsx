import React from 'react'
import { useState } from 'react'

const CondoTable = ({data}) => {
    

  return (
    <>
    <table className='table table-border border-primary table-responsive'> 
        <thead>
            <tr>
                <th scope='col'>Id</th>
                <th scope='col' >Stmt Date</th>
                <th scope='col'>Stmt Amt</th>

                <th scope='col'>Pymt Date </th>
                <th scope='col'>Pymt Amt</th>
                <th scope='col'>Pymt Ref</th>
                <th scope='col'>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map( (item , index) =>{
                    return(
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.statement_date}</td>
                            <td>{item.statement_amount}</td>

                            <td>{item.payment_date}</td>
                            <td>{item.payment_amount}</td>
                            <td>{item.payment_ref}</td>
                            <td>
                                <button className='btn btn-primary ml-auto d-block mb-2'
                                  data-bs-toggle='modal'
                                    data-bs-target='#editModalForm'
                                   >Edit</button>
                            </td>
                        </tr>
                        )
                    }
                )
          }

        </tbody>    
    </table>
    
    </>
  )
}

export default CondoTable