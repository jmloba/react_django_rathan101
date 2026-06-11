import React from 'react'

import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../AuthProvider';
import axiosInstance from '../../AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { hasPermission } from '../functions/Permission'
import { ExportToCsv } from '../exportfile/ExportToCsv';
import { ExportToPdfEmployeeList } from '../exportfile/ExportToPdfEmployeeList';
import { ExportToExcel } from '../exportfile/ExportToExcel';
import DataTable from 'react-data-table-component'
import { dataTableStyle } from '../functions/DataTableStyle';
import 'react-data-grid/lib/styles.css';
import '../../assets/css/flexcontainer.css'


const EmployeesVer01 = () => {
  const [editData, setEditData] = useState({})
  const [employees, setEmployees] = useState([])
  const [records, setRecords] = useState(employees)
  const [formErrors, setFormErrors] = useState({})  // empty object
  const [isSubmit, setIsSubmit] = useState(false)
  const [search, setSearch] = useState('')
  const [genderList, setGenderList] = useState([])
  const [departmentList, setDepartmentList] = useState([])
  const [selectedRecord,setSelectedRecord] = useState([])
  const [list, setList] = useState([])
  const navigate = useNavigate()
  const {
    isLoggedIn, setIsLoggedIn,
    email ,setEmail,
    theme, setTheme,
    loggedInUser, setLoggedInUser,
    permissions,setPermissions ,
    user_Id,setUser_Id

  } = useContext(AuthContext)

const handleGetSelectedRecord =(mrow, e)=>{
  setSelectedRecord(mrow)
  console.log('selected record is -> :',mrow)

}
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className='cl-action'>
          {hasPermission("app_employees.delete_employee") &&
            <button className='btn btn-danger btn-sm ' onClick={() => {
              RemoveDetails(row.id)
            }}>delete</button>
          }

          {hasPermission("app_employees.change_employee") &&
            <button type='button'
              className='me-3 btn btn-primary ml- d-block mb-2'
              data-bs-toggle='modal'
              data-bs-target='#editModalForm'
              onClick={(e) => handleEditButton(row.id, e)}
            >
              Edit modal
            </button>
          }
        </div>
      )
    }
    ,{name :"Action2",
      cell:(row)  =>(
        <div className="cl-action">
          <button type='button' className='btn btn-primary'
              data-bs-toggle='modal'
              data-bs-target='#actionModal'
              onClick={()=>handleGetSelectedRecord(row.id)}
          
          > viewAction </button>

        </div>
      )
        
      
    }
    ,
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
      selector: row => {

        return `${row.firstname}` + ' ' + `${row.middlename}` + ' ' + `${row.lastname}`
      },
      sortable: true
    },
    {
      name: "Designation",
      selector: row => row.designation,

    },
    {
      name: "Email",
      selector: row => row.email,
      sortable: true,
      width: '20em',
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


  ]
  
  const RemoveDetails = async (id) => {
    if (window.confirm(`Are you sure you want to delete record ${id}`)) {
      try {
        const response = await axiosInstance.delete(`/employees/${id}/`)
        alert("removed employees data successfully")
        window.location.reload()
      } catch (error) {
        console.log('error in deletion :', error.message)
      }
    }
  }
  const handleDeleteRecord =(e)=>{
    e.preventDefault()
    console.log('selected record', selectedRecord)
    handleDeleteRecord

  }
  const handleExportToPdf = (e) => {
    e.preventDefault()
    ExportToPdfEmployeeList(records, columns, 'List of Employees');
    }
  const handleExportToExcel = (e) => {
    e.preventDefault()
    ExportToExcel(records, 'List of Employees');
    alert('export to Excel')
  }      
  const handleExportToCsvGrid = (e) => {
      e.preventDefault()
      ExportToCsv(records, 'List of Employees');
  
    }
  const handleEditSave = async (e, id) => {
    e.preventDefault()

    console.log('edit button save pressed')
    console.log('about to save id: ', id)

    const toSaveEdit = {
      emp_id: editData.emp_id,
      firstname: editData.firstname,
      middlename: editData.middlename,
      lastname: editData.lastname,
      email: editData.email,
      deptname: editData.deptname,
      gender: editData.gender,
      employee_salary: [
        {
          sal_basic: editData.employee_salary ? editData.employee_salary[0]?.sal_basic || 0 : 0,
          sal_housing: editData.employee_salary ? editData.employee_salary[0]?.sal_housing || 0 : 0,
          sal_transportation: editData.employee_salary ? editData.employee_salary[0]?.sal_transportation || 0 : 0,
        }
      ]
    }
    try {
      const response_edit = await axiosInstance.put(`/employees/${id}/`, toSaveEdit)
      alert('Edit Mode employee data updated successfully')
      console.log('response_edit after save :', response_edit.data)
      window.location.reload()
    } catch (error) {
      console.log('error edit button pressed', error.message)
    }
  }
    const handleAddRecord = (e) => {
    e.preventDefault()
    navigate('/employee-add')

  }
  const handleActions = (e)=>{
    e.preventDefault
    console.log('row clicked from datatable')

  }

  useEffect(
    () => {
      const fetchProtectedData = async () => {
        try {
          const response = await axiosInstance.get('/employees/')
          setEmployees(response.data)
          setRecords(response.data)
          console.log('***response fetching the data employees:', response.data)
        } catch (error) {
          console.error('\n error (fetchProtectedData )fetching data', error.response)
        }
      }
      fetchProtectedData()
    }, []
  )
  useEffect(
    () => {
      console.log('search value', search)
      const result = employees.filter((item) => {
        const searchname = item.firstname.includes(search) || item.lastname.includes(search) ||item.middlename.includes(search)   ;
        return searchname
      })
      setRecords(result)
    }, [search]
  )
  return (
    <>
      <div className="container">
        <h1>Employee List</h1>
          <div className="data-list">
            <DataTable id='table-DataTable'
              columns={columns}
              data={records}
              customStyles={dataTableStyle}
              // conditionalRowStyles={conditionalRowStyles}
              // onRowClicked={row.id}

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
                  {hasPermission("app_employees.add_employee") &&
                  <button className='btn btn-success' onClick={handleAddRecord}> AddRecord</button>
                  }
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
      </div>
      {/* ---------action modal---------- */}
      <div className='modal fade'
        id='actionModal'
        tabIndex='-1'
        aria-labelledby='actionModalLabel'
        // aria-hidden='true'
      >
        <div className="modal-dialog modal-lg  ">
          <div className="modal-content   ">
            <button type = "button" className='btn btn-primary' onClick={handleDeleteRecord}>
              delete record

            </button>
            
          </div>


        </div>
      </div>
      
      {/* ---------edit modal---------- */}
      <div className='modal fade'
        id='editModalForm'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
      // aria-hidden='true'
      >
        <div className="modal-dialog modal-lg  ">

          <div className="modal-content   ">
            <div className="modal-header">
              <h5 className='modal-title' id='exampleModalLabel'>Edit Employee </h5>
              <button type='button'
                className='btn-close'
                data-bs-dismiss='modal' aria-label='Close'>xxx</button>
            </div>
            <div className="modal-body">

              <form method='post' onSubmit={handleEditSave} >
                {/* id */}
                <div className="row">
                  <div className="col-md-6 ">
                    <label className="form-label">record Number  </label>
                    <input type="text" className='form-control'
                      name='id'
                      placeholder='id'
                      value={editData.id}

                      disabled
                    />
                  </div>
                  {/* emp_id */}
                  <div className="col-md-6">
                    <label className="form-label">Employee Id </label>
                    <input type="text" className='form-control'
                      name='empId'
                      placeholder='empId'
                      value={editData.emp_id}

                      // onChange={(e) => setEditData({ ...editData, emp_id: e.target.value })}
                      disabled
                    // 
                    />
                  </div>


                </div>

                {/* row--->>> name */}
                <div className="row">
                  <div className="col-md-4  ">
                    <label className="form-label">Firstname </label>
                    <input type="text" className='form-control'
                      name='firstname'
                      placeholder='FirstName'
                      value={editData.firstname}

                      onChange={(e) => (setEditData({ ...editData, firstname: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="col-md-4  ">
                    <label className="form-label">MiddleName </label>
                    <input type="text" className='form-control'
                      name='middlename'
                      placeholder='MiddleName'
                      value={editData.middlename}
                      onChange={(e) => (setEditData({ ...editData, middlename: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="col-md-4  ">
                    <label className="form-label">Lastname </label>
                    <input type="text" className='form-control'
                      name='lastname'
                      placeholder='MiddleName'
                      value={editData.lastname}
                      onChange={(e) => (setEditData({ ...editData, lastname: e.target.value }))}
                      required
                    />
                  </div>


                </div>

                <div className="row">
                  {/* ------ gender--------- */}
                  <div className="col-md-4">
                    <label className="form-label">Gender </label>
                    <select name="gendername" id="selectGender "

                      value={editData.gender}
                      className='form-select'
                      onChange={(e) => setEditData({ ...editData, gender: e.target.value })}>

                      {
                        genderList.map(
                          (gender) => (
                            <option value={gender.id}>{gender.gender}</option>
                          )
                        )
                      }
                    </select>
                  </div>
                  {/* ------ deptname--------- */}

                  <div className="col-md-4">
                    <label className="form-label">Department name </label>
                    <select name="departmentname" id="selectDepartment"
                      value={editData.deptname}


                      className='form-select'

                      onChange={(e) => setEditData({ ...editData, deptname: e.target.value })}
                    >

                      {
                        departmentList.map(
                          (department) => (
                            <option value={department.id}>{department.deptname}</option>
                          )
                        )
                      }
                    </select>
                  </div>
                  {/* ------ email--------- */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Email  </label>
                    <input type="email" className='form-control'
                      name='email'
                      placeholder='email'

                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      value={editData.email}
                      required


                    />
                  </div>


                </div>
                {hasPermission("app_employees.change_employeesalary") &&
                  <div className="row">
                    {/* ------ sal_basic--------- */}
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Basic Salary  </label>
                      <input type="number" className='form-control'
                        name='sal_basic'
                        value={editData.employee_salary ? editData.employee_salary[0]?.sal_basic || 0 : 0}
                        onChange={
                          (e) => setEditData({ ...editData, employee_salary: [{ ...editData.employee_salary ? editData.employee_salary[0] : {}, sal_basic: e.target.value }] })
                        }
                        placeholder='sal_basic' />
                    </div>
                    {/* ------ sal_transportation--------- */}
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Transportation</label>
                      <input type="number" className='form-control'
                        name='sal_transportation'
                        value={editData.employee_salary ? editData.employee_salary[0]?.sal_transportation || 0 : 0}
                        onChange={
                          (e) => setEditData({ ...editData, employee_salary: [{ ...editData.employee_salary ? editData.employee_salary[0] : {}, sal_transportation: e.target.value }] })
                        }
                        placeholder='sal_transportation' />
                    </div>
                    {/* ------ sal_housing--------- */}
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Housing</label>
                      <input type="number" className='form-control'
                        name='sal_housing'
                        value={editData.employee_salary ? editData.employee_salary[0]?.sal_housing || 0 : 0}

                        onChange={
                          (e) => setEditData({ ...editData, employee_salary: [{ ...editData.employee_salary ? editData.employee_salary[0] : {}, sal_housing: e.target.value }] })
                        }
                        placeholder='sal_housing' />
                    </div>

                  </div>
                }

                {/* ------ submit--------- */}

                <div className="modal-footer d-block">
                  <button type='submit'
                    className='btn btn-warning float-end'
                    data-bs-dismiss='modal'
                    onClick={(event) => handleEditSave(event, editData.id)}

                  >
                    Submit </button>
                </div>

              </form>
            </div>
            <div className="modal-footer col-md-12 ">
              {Object.keys(formErrors).length === 0 && isSubmit ?
                (
                  <div className="ui message success">
                    <pre> {JSON.stringify(editData, undefined, 2)} </pre>
                  </div>) :
                (<pre>
                  {JSON.stringify(editData, undefined, 2)}
                </pre>)}
            </div>

          </div>

        </div>


      </div>
    </>

  )
}

export default EmployeesVer01