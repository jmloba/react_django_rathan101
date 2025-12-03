import React from 'react'

import '../../assets/css/tablecss.css'

import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../AuthProvider';
import axiosInstance from '../../AxiosInstance';
import DataTable from 'react-data-table-component'
import { DataGrid } from 'react-data-grid';
import Papa from 'papaparse';

import { saveAs } from 'file-saver';
import { ExportToExcel } from '../exportfile/ExportToExcel';
import { ExportToCsv } from '../exportfile/ExportToCsv';
import { ExportToPdfProducts } from '../exportfile/ExportToPdfProducts';


import { jsPDF } from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';


import 'react-data-grid/lib/styles.css';
import AddProducts from './AddProducts';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

import { hasPermission } from './../functions/Permission'


const Products = () => {
  const {
    isLoggedIn, setIsLoggedIn,
    email, setEmail,
    theme, setTheme,
    loggedInUser, setLoggedInUser,
    permissions, setPermissions

  } = useContext(AuthContext)

  const [list, setList] = useState([])
  const [records, setRecords] = useState(list)
  const [search, setSearch] = useState('')
  const columns = [
    {
      name: "#",
      selector: row => row.id,
      sortable: true

    }, {

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
      name: "Item#",
      selector: row => row.product_itemno,
      sortable: true

    },
    {
      name: "ProdName",
      selector: row => row.product_name,
      sortable: true,
      maxwidth: '400px',
    },
    {
      name: "CategoryCode",
      selector: row => row.product_category,
      sortable: true
    },
    {
      name: "CategoryName",
      selector: row => row.category_name,

    },
    {
      name: "Wholesale",
      selector: row => row.wholesale_price,
      sortable: true
    },

    {
      name: "Retail",
      selector: row => row.retail_price,
      sortable: true
    },
    {
      name: "Stock",
      selector: row => row.stock,
      sortable: true
    },
    {
      name: "Action",
      cell: (row) => (

        <>
          <div className="cl-action">

            {hasPermission('app_products.delete_products') &&
              <button type='button' onClick={(e) => handleDeleteRecord(row.id)}
                className='btn btn-danger btn-sm'>Delete</button>
            }
            {hasPermission('app_products.change_products') &&
              <Button text='Edit' class='btn-warning btn-sm' url={`/editproduct/${row.id}`} />
            }
          </div>


        </>
      )






    },

  ]

  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "500",
        fontSize: "16px",
        backgroundColor: '#cd4b0eff',
        borderColor: '#c3c0c0ff',
        color: "white",
        padding: "5px 5px",

      }
    },
    rows: {
      style: {
        // backgroundColor: '#fefefdf9',
        // borderStyle: 'solid',
        //  borderWidth: ".5px",
        borderCollapse: 'collapse',


      },
    },

    cells: {
      style: {
        backgroundColor: '#eee9e14f',
        borderStyle: 'solid',
        borderWidth: '0.5px',
        borderColor: '#efd6d6ff ',


        fontSize: '14px',

      },

    }

  }
  const handleDeleteRecord = async (id) => {
    if (window.confirm(`Are you sure you want to delete record ${id}`)) {
      try {
        const response = await axiosInstance.delete(`/products/${id}/`)
        alert("removed product data successfully")
        window.location.reload()
      } catch (error) {
        console.log('error in deletion :', error.message)
      }
    }

  }
  const handleExportToPdf = (e) => {
    e.preventDefault;
    ExportToPdfProducts(records, 'Product List');


  }
  const handleExportToExcel = () => {
    ExportToExcel(records, 'Product List');
  }

  const handleExportToCsv = (e) => {
    e.preventDefault();
    ExportToCsv(records, 'List of Products');

  }

  const handleAddProduct = () => {
    navigate('/addproduct')
  }
  const navigate = useNavigate();

  useEffect(
    () => {
      const fetchProtectedData = async () => {
        try {
          const response = await axiosInstance.get('/products/')
          setList(response.data)
          setRecords(response.data)
          console.log('response fetching the data products', response.data)
        } catch (error) {
          console.error('\n error (fetchProtectedData )fetching data', error.response)
        }
      }
      fetchProtectedData()
    }, []
  )
  useEffect(() => {
    console.log('search value', search)
    const result = list.filter((item) => {
      return (item.product_name.toLowerCase().match(search.toLowerCase())
        || item.product_itemno.toString().toLowerCase().match(search.toLowerCase())
        || item.category_name.toLowerCase().match(search.toLowerCase())
      )
    })
    setRecords(result)


  }, [search]

  )
  return (
    <>
      <div className="container">
        <div className="main-body">
          <h2>Products Page</h2>
          <p>This is the products page.</p>
          <div className="data-list">
            <DataTable id='table-DataTable'
              columns={columns}
              data={records}
              customStyles={tableHeaderStyle}
              // conditionalRowStyles={conditionalRowStyles}
              pagination
              // selectableRows

              fixedHeader
              selectableRowsHighlight
              highlightOnHover
              actions={
                <>
                  <button className='btn btn-success' onClick={handleExportToPdf}>Export to Pdf</button>
                  <button className='btn btn-success' onClick={handleExportToCsv}> Export to Csv</button>
                  <button className='btn btn-success' onClick={handleExportToExcel}> Export to Excel</button>
                  {hasPermission('app_products.add_products') &&
                    <button className='btn btn-primary ' onClick={handleAddProduct}> Add Product</button>
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
      </div>
    </>

  )
}

export default Products
