// https://www.youtube.com/watch?v=XBfZxrLcDC8&t=1846s
// https://www.youtube.com/watch?v=XBfZxrLcDC8&t=1846s
// 32.26

import React, { useEffect } from 'react'
import Button from '../Button'
import { useState } from 'react'
import axiosInstance from '../../AxiosInstance'

import "./../../assets/css/tablecss.css"
import BoostMyTool_EditEmployee from './BoostMyTool_EditEmployee'

import DataTable from 'react-data-table-component'




const BosstMyTool_Employee = () => {


  const handleDeleteRecord = async (id) => {
    console.log('passed value to delete', id)
    try {
      const response = await axiosInstance.delete(`/employees/${id}/`)
      // alert("removed employees data successfully")
      // window.location.reload()
    } catch (error) {
      console.log('error in deletion :', error.message)
    }

    const newdata = employees.filter((item) => item.id !== id)
    setEmployees(newdata)
    setRecords(newdata)
  }

  const handleEditRecord = (id) => {

    console.log(' record to edit ', id)

  }

  const columns = [
    {
      name: "id",
      selector: row => row.id,
      sortable: true

    },
    {
      name: "EmployeeId",
      selector: row => row.emp_id,
      sortable: true
    },
    {
      name: "Name",
      selector: row => row.emp_name,
      sortable: true
    },
    {
      name: "Designation",
      selector: row => row.designation,

    },
    {
      name: "Email",
      selector: row => row.email,
      sortable: true
    },

    {
      name: "DeptCode",
      selector: row => row.deptname,
      sortable: true
    },
    {
      name: "Department",
      selector: row => row.department,
      sortable: true
    },
    {
      name: "Gender Code",
      selector: row => row.gender,
      sortable: true
    },
    {
      name: "Gender",
      selector: row => row.emp_gendername,
      sortable: true
    },


    {
      name: "Image",
      selector: row => <img height={50} width={60} src={row.image} />
    },
    {
      name: "Action",
      cell: (row) => (
        <div className='cl-action'>
          <button className='btn btn-danger'
            onClick={(e) => handleDeleteRecord(row.id)}
          >delete</button>


          {/* <button className='btn btn-info'
        onClick={(e)=>handleEditRecord(row.id)}
        >Edit</button> */}
          <Button text='Edit' class='btn-warning' url={`/dipeshmalvia-editemployee/${row.id}`} />




        </div>


      )

    }

  ]


  {/* list should be an empty array [] */ }
  const [employees, setEmployees] = useState([])
  const [records, setRecords] = useState(employees)
  const [search, setSearch] = useState('')

  const RemoveDetails = async (id) => {

    if (window.confirm(`Are you sure you want to delete record ${id}`)) {
      try {
        const response = await axiosInstance.delete(`/employees/${id}/`)
        // alert("removed employees data successfully")
        window.location.reload()
      } catch (error) {
        console.log('error in deletion :', error.message)
      }
    }

  }
  const conditionalRowStyles = [
    {
      when: row => row.calories < 300,
      style: {
        backgroundColor: 'green',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    // You can also pass a callback to style for additional customization
    {
      when: row => row.calories < 400,
      style: row => ({ backgroundColor: row.isSpecial ? 'pink' : 'inherit' }),
    },
  ];
  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "14px",
        backgroundColor: '#24069cff',
        color: "white",
        padding: "20px 0px",

      },
    },
    rows: {
      style: {
        backgroundColor: '#2eda48f9',

      },

    },

    cells: {
      style: {
        borderStyle: 'solid',
        backgroundColor: '#e6efe74f',
        borderWidth: "1px",

      },

    }





  }

  const customStyles = {
    headCells: {
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#0f5744ff',
      }
    }
  }
  const handleSearchChange = (e) => {
    e.preventDefault()
    let query = e.target.value
    const newrecords = employees.filter(item => item.emp_name.toLowerCase().includes(query.toLowerCase()))
    setRecords(newrecords)

  }
  useEffect(
    () => {
      const fetchProtectedData = async () => {
        try {
          const response = await axiosInstance.get('/employees/')
          setEmployees(response.data)
          setRecords(response.data)
          console.log('response fetching the data employees:', response.data)
        } catch (error) {
          console.error('\n error (fetchProtectedData )fetching data', error.response)
        }
      }
      fetchProtectedData()
    }, []
  )
  useEffect(() => {
    console.log('search value', search)
    const result = employees.filter((item) => {
      return item.emp_name.toLowerCase().match(search.toLowerCase());
    })
    setRecords(result)


  }, [search]

  )

  return (
    <>

      <div className="container">
        <div className="main-body">
          <h2>Data Table using datatable </h2>
          <div className="datatable-main">
            {/* <div className='search-datatable'>
                <input type="text" placeholder='Search by Employee Name...' 
                className='searchTable'
                onChange={handleSearchChange} />
     

          </div> */}
            <div className="row bm-3">
              <div className="col">

                <Button text='AddEmployee'
                  class=" btn-outline-primary"
                  url='/boostmytool-addemployee' />
                <button type='button' className='btn btn-outline-primary'>Refresh</button>
              </div>
              <div className="col">
                <Button text='Add byDipesh(form)'
                  class=" btn-outline-primary"
                  url='/dipeshmalvia-addemployee' />
              </div>
            </div>
            <DataTable
             id='table-Datatable'
              columns={columns}
              data={records}
              customStyles={tableHeaderStyle}
              // conditionalRowStyles={conditionalRowStyles}
              pagination
              selectableRows
              fixedHeader
              selectableRowsHighlight
              highlightOnHover
              actions={
                <button className='btn btn-success'>Export to Pdf</button>
              }
              subHeader
              subHeaderComponent={
                <input type='text'
                  className='form-control'
                  value={search}
                  placeholder='Search...'
                  onChange={(e) => setSearch(e.target.value)}
                />

              }
              subHeaderAlign='left'


            />

          </div>
        </div>

      </div>

      {/* ---- original table ----- */}
      {/* <div className="container bg-white">
   
      <div className='text-center my-5'>BosstMyTool_Employee - <i className="bi bi-arrow-up-circle"></i></div>
      <div className="row bm-3">
        <div className="col">
         
           <Button text='AddEmployee' 
              class=" btn-outline-primary" 
                url='/boostmytool-addemployee' /> 
            <button type='button' className='btn btn-outline-primary'>Refresh</button>
        </div>
        <div className="col">

        </div>
      </div>
      <div className="my-table">
        <main className="table">
          <section className='table__header'>
            <h3>Employee List</h3>
          </section>
          <section className='table__body'>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee Id</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                    <th className='table-action' >Action</th>
                  <th>Gender Code</th>
                  <th>Gender</th>
                  <th>DeptCode</th>
                  <th>Dept</th>
       
                
                </tr>
              </thead>
                        <tbody>
              {
              employees.map((employee,index)=>{
                return(
            
                    <tr key={index}>
                      <td>{employee.id}</td>
                      <td>{employee.emp_id}</td>
                      <td>
                        <img src={employee.image}/>
                      </td>
                      <td>{employee.emp_name}</td>
                      <td style={{color:"blue"}}><strong>{employee.email}</strong></td>
                      <td  className='table-action' >
                        <button className='btn btn-primary btn-sm me-1 ' >Edit</button>

                        <button className='btn btn-danger btn-sm'
                         onClick={ ()=>{RemoveDetails(employee.id) }}
                        >Delete</button>
                      </td>

                      <td>{employee.gender}</td>
                      <td>{employee.emp_gendername}</td>
                      <td>{employee.deptname}</td>

                      <td className='department '>{employee.department}</td>
              
                   
                    </tr>
              

                )

              })
              
              }

            </tbody>


            </table>

          </section>

        </main>
      </div>
    </div> */}

    </>

  )
}

export default BosstMyTool_Employee