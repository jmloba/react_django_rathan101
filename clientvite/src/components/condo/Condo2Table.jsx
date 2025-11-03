import React from 'react'
import { useState } from 'react'
import ReadTable from './ReadTable'
const Condo2Table = ({data,handleEditPostForm}) => {
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
           <ReadTable data={data}
           handleEditPostForm = {handleEditPostForm}
           />

        </tbody>    
    </table>
    
    </>
  )
}

export default Condo2Table