
// https://www.youtube.com/watch?v=JfEV1er6oqQ&t=170s

import React from 'react'
import { data } from '../../assets/data/data'
import DataTable from 'react-data-table-component'

const columns = [
  {
    name :"Title",
    selector : row => row.title,
    sortable : true

  },
  {
    name :"Director",
    selector : row => row.director,
    sortable : true
  },
  {
    name :"Year",
    selector : row => row.year,
    sortable : true
  },  
  {
    name :"Action",
    selector : row => row.action

  }

]

const SampleDataTable = () => {
  const [mysearch,setMysearch] = React.useState('')
  const [records,setRecords] = React.useState(data)

  const handleSearchChange = (e) =>{
    e.preventDefault()
    let query = e.target.value
    const newrecords = data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
    setRecords(newrecords)
  }

  const customStyles = {
    headCells :{
      style :{
        fontSize : '16px',
        fontWeight : 'bold',
        color : 'white',
        backgroundColor : '#0f5744ff',
        fontWeight : '600',

      }
    }
  }

  return (
  <>
    <div className="container">
        <div className="main-body">
            <h2>Sample Data Table</h2>
            <div className="datatable-main">
              <div className='search-datatable'>
                <input type="text" placeholder='Search by title...' className='searchTable'
                onChange={handleSearchChange} />
     

              </div>
              <DataTable   columns ={columns} data={records} customStyles={customStyles} pagination  />

            </div>
          




        </div>
    </div>
  </>
  )
}

export default SampleDataTable