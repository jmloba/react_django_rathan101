import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../AuthProvider';
import axiosInstance from '../../AxiosInstance';
import DataTable from 'react-data-table-component'
import { ExportToExcel } from '../exportfile/ExportToExcel';
import { ExportToCsv } from '../exportfile/ExportToCsv';
import { ExportToPdfInvoice } from '../exportfile/ExportToPdfInvoice';
import { dataTableStyle } from '../functions/DataTableStyle';

const SalesSummary = () => {
  const { 
    isLoggedIn, setIsLoggedIn, 
    theme, setTheme ,
    loggedInUser,setLoggedInUser,
    permissions,setPermissions,
    user_Id,setUser_Id
  } = useContext(AuthContext)
  const [listInvoice,setListInvoice] = useState([])
  const [invoice, setInvoice] = useState(0)
  const [invoiceContent, setInvoiceContent] = useState([])
  const [search, setSearch] = useState('')
  const handleSelectInvoice =(e)=>{
    e.preventDefault();
 
    setInvoice(e.target.value)
    console.log('invoice selected ***', invoice)
    
  }
  const handleExportToCsvGrid = (e) => {
    e.preventDefault()
    ExportToCsv(invoiceContent, `Invoice Details ${invoice}`);

  }

  const handleExportToPdf = (e) => {
    e.preventDefault()
    ExportToPdfInvoice(invoiceContent, columns, `Invoice Details ${invoice}`);

  }

  


  const handleExportToExcel = (e) => {
    e.preventDefault()

    ExportToExcel(invoiceContent, `Invoice Details ${invoice}`);
    alert('export to Excel')
  }
  useEffect(
    () => {
      const fetchProtectedData = async () => {
        try {
          // http://127.0.0.1:8000/api/v1/salesentries/distinct_invoices/
          const response = await axiosInstance.get(`/salesentries/?invoice_ref__iexact=${invoice}`)
          setInvoiceContent(response.data)
          
          console.log('list of invoice content', response.data)
        } catch (error) {
          console.error('\n error (fetchProtectedData )fetching data', error.response)
        }
      }
      fetchProtectedData()
    }, [invoice]
  )
  useEffect(
    () => {
      const fetchProtectedData = async () => {
        try {
          // http://127.0.0.1:8000/api/v1/salesentries/distinct_invoices/
          const response = await axiosInstance.get('/salesentries/distinct_invoices/')
          setListInvoice(response.data)
          
          console.log('list of invoices', response.data)
        } catch (error) {
          console.error('\n error (fetchProtectedData )fetching data', error.response)
        }
      }
      fetchProtectedData()
    }, []
  )
  const columns = [
  {
    name: "Invoice #",
    selector: row => row.invoice_ref,
    sortable: false

  },
  {
    name: "ItemNumber",
    selector: row => row.itemnumber,
    sortable: true

  },
  {
    name: "Product Name",
    selector: row => row.product_name,
    sortable: true,
    maxwidth: '800px',
  },
  {
    name: "Category",
    selector: row => row.category,
    sortable: true
  },
  {
    name: "Quantity",
    selector: row => row.quantity,

  },
  {
    name: "Wholesale Price ",
    selector: row => row.wholesale,
    sortable: true
  },

  {
    name: "Retail Price",
    selector: row => row.retail,
    sortable: true
  },

]


  return (
    <>
    <div className="container">
      <h2>Invoice Summary</h2>
      <form action="">
             {/* ------ permissions list--------- */}
                      
          <div className="row mb-3">
              <label className="col-sm-4 form-label">Invoice List </label>
              <div className="col-sm-8">
                <select name="invoice"  id="selectPermission" 
                  className='form-select' onClick={handleSelectInvoice}>
                  {

                    listInvoice.map(
                      (inv,index )=>(
                        <option key={index} value={inv}>{inv}</option>
                    )
                    )
                  }
                </select>
                
              </div>
          </div>
      </form>
      <div className="container">
        
          <div className="data-list">
            <DataTable id='table-DataTable'
              columns={columns}
              data={invoiceContent}
              customStyles={dataTableStyle}
              // conditionalRowStyles={conditionalRowStyles}
              pagination
              // selectableRows

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
              // subHeader
              // subHeaderComponent={
              //   <input type='text'
              //     className='form-control'
              //     value={search}
              //     placeholder='Search...'
              //     onChange={(e) => setSearch(e.target.value)}
              //   />

              // }
              subHeaderAlign='left'
            />

          </div>

      </div>
      
    </div>
    </>
    
  )
}

export default SalesSummary