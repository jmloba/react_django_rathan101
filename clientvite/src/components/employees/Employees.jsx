import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../AuthProvider';
import axiosInstance from '../../AxiosInstance';
import Button from '../Button'
import DataTable from 'react-data-table-component'

import { DataGrid } from 'react-data-grid';
import Papa from 'papaparse';

import {saveAs} from 'file-saver';


import { jsPDF } from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';

import 'react-data-grid/lib/styles.css';

import { ExportToExcel } from '../exportfile/ExportToExcel';
    
import { useNavigate } from 'react-router-dom';
import { ExportToCsv } from '../exportfile/ExportToCsv';
import  {ExportToPdfEmployeeList }  from '../exportfile/ExportToPdfEmployeeList';
const columns = [
  {
    name: "Image",
    selector: row => <img height={50} width={50}
      style={{
        borderRadius: '50%',
        justifyItems: 'center',
        alignItems: 'center',
        border: '2px solid #b06311ff'
      }}
      src={row.image} />
  },
  {
    name: "id",
    selector: row => row.id,
    sortable: true

  },
  {
    name: "EmployeeId",
    selector: row => row.emp_id,
    sortable: true,
    maxwidth: '800px',
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
  //  export const exportToExcel = (data, fileName = 'exported_data') => {
  //     const worksheet = XLSX.utils.json_to_sheet(data);
  //     const workbook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  //     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //     const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  //     saveAs(dataBlob, `${fileName}.xlsx`);
  //   };

const Employees = () => {
  const [list, setList] = useState([])
  const { isLoggedIn, setIsLoggedIn, theme, setTheme } = useContext(AuthContext)
  const config = { 'responseType': 'blob' }
  const [employees, setEmployees] = useState([])
  const [records, setRecords] = useState(employees)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  
  
  const prntColumns = [
  {key:'id', name:'ID'},
  {
    key:'image', name:'IMAGE',
    renderCell : ({ row }) => (
      <img height={25} width={25} 
        src={row.image}
        style={ {width: 30,
          height: 30,
          borderRadius: '50%' , // Apply the border-radius
          border: '1px solid #094826ff',
          justifyContent:'center',
          alignItems:'center',
        
        }}

      
      />
    )
   },
  {key:'emp_id', name:'EMPID'},
  {key:'emp_name', name:'NAME'},
  {key:'deptname', name:'DEPTCODE'},
  {key:'department', name:'DEPARTMENT'}  ,
  {key:'designation', name:'DESIGNATION'}  ,
  {key:'email', name:'EMAIL'}  ,
  {key:'gender', name:'GenderCode'}  ,
  {key:'emp_gendername', name:'GENDER'},
  
]

  const EditDetails = (e,id) => {
    console.log('Record to edit :',id)
    // navigate(`/dipeshmalvia-editemployee/${id}`)  
  }

  const handleExportToCsvGrid = (e) => {
    e.preventDefault()
    ExportToCsv(records, 'List of Employees');

  }

  const handleExportToPdf = (e) => {
  e.preventDefault()
  ExportToPdfEmployeeList(records,columns, 'List of Employees');
  
  }
  


  const handleExportToExcel = (e) => {
    e.preventDefault()
  
    ExportToExcel(records, 'List of Employees');
    alert('export to Excel')
  }
 
  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "20px",
        backgroundColor: '#2e2c03ff',
        color: "white",
        padding: "5px 0px",

      }
    },
    rows: {
      style: {
        backgroundColor: '#e7e6d9f9',
        // borderStyle: 'solid',
        //  borderWidth: ".5px",

      },

    },

    cells: {
      style: {
        backgroundColor: '#ede9e24f',
        borderStyle: 'solid',
        borderColor: '#c3c0c0ff',
        fontSize: '14px',
        
      },

    }





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
          <h1>Employees using datatable</h1>
          
          {/* <div className="data-list d-block my-5">
            <div>
              <h3>Employees DataGrid</h3>

            </div>
            <div className="btn-group">
              <button className='btn btn-success' onClick={handleExportToPdf}>Export to Pdf</button>
              <button className='btn btn-success' onClick={handleExportToCsvGrid}> Export to Csv</button>
            </div>
            <DataGrid
              columns={prntColumns}
              rows={records}
            />
          </div> */}
          <div className="data-list">
            <DataTable id='table-DataTable'
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
                <>
                  
                  <button className='btn btn-success' onClick={handleExportToCsvGrid}> Export to Csv</button>
                  <button className='btn btn-success' onClick={handleExportToExcel}> Export to Excel</button>
                  <button className='btn btn-success' onClick={handleExportToPdf}> Pdf</button>

                </>
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

          {/* <div className="data-list2 my-5">
            <table id='table-DataTable-manual' 
            className='table table-striped table-bordered dt-responsive nowrap'
            style={{width:'100%'}}
            >
              <thead>
                <tr >
                  <th>id</th>
                  <th>Image</th>
                  <th>employee id</th>
                  <th>name</th>
                  <th>deptcode</th>
                  <th>dept name</th>
                  <th>gendercode</th>
                  <th>gender</th>
                  
                  <th>action</th>

                </tr>

              </thead>
              <tbody>


                {records.map((employee,index ) => {
                  return (
                    <>
                      <tr key={index}>
                        <td> {employee.id}</td>
                        <td>
                          <img src={employee.image} alt="" />
                        </td>

                        <td>{employee.emp_id}</td>
                        <td>{employee.emp_name}</td>
                        <td>{employee.deptname}</td>
                        <td>{employee.department}</td>
                        <td>{employee.gender}</td>

                        <td>{employee.emp_gendername}</td>
                        <td>
                          <button type='button'
                            className='btn btn-primary ml-auto '
                            onClick={EditDetails(employee.id)}
                          >
                            edit {employee.id}
                          </button>
                        </td>
                      </tr>

                    </>
                  )

                })}


              </tbody>
            </table>
          </div> */}



        </div>
      </div>
    </>

  )
}

export default Employees