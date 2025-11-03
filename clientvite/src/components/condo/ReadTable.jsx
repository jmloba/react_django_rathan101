import React from 'react'

const ReadTable = ({data,handleEditPostForm}) => {
  return (
   <>
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
                                onClick={(e)=>{handleEditPostForm(e,item)}}
                                >Edit</button>
                            </td>
                        </tr>
                        )
                    }
                )
          }
   </>
  )
}

export default ReadTable