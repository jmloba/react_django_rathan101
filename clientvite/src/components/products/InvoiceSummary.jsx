import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../AuthProvider';
import axiosInstance from '../../AxiosInstance';
import DataTable from 'react-data-table-component'
import { dataTableStyle } from '../functions/DataTableStyle';
import { ExportToCsv } from '../exportfile/ExportToCsv';
import { ExportToExcel } from '../exportfile/ExportToExcel';
import { ExportToPdf_SalesInvoice } from '../exportfile/ExportToPdf_SalesInvoice';
import '../products/invoicesummary.css'

const InvoiceSummary = () => {
  const {
    isLoggedIn, setIsLoggedIn,
    theme, setTheme,
    loggedInUser, setLoggedInUser,
    permissions, setPermissions,
    user_Id, setUser_Id
  } = useContext(AuthContext)
  const [listInvoice, setListInvoice] = useState([])
  const [listData, setListData] = useState([])

  const [detailsList, setDetailsList] = useState([])

  const [totalQuantity, setTotalQuantity] = useState('')
  const [totalAmount, setTotalAmount] = useState('')

  const [selectedInvoiceId, setSelectedInvoiceId] = useState('')
  const [invoiceData, setInvoiceData] = useState('')
  const [invoiceNo, setInvoiceNo] = useState('')
  const columns = [
    {
      name: "Id#",
      selector: row => row.id,
      sortable: false

    },
    {
      name: "product",
      selector: row => row.item_number,
      sortable: true

    },
    {
      name: "Product Name",
      selector: row => row.product_name,
      sortable: true,
      maxwidth: '800px',
    },

    {
      name: "Quantity",
      selector: row => row.quantity,

    },
    {
      name: "Retail",
      selector: row => row.retail,

    },

  ]
 const columns_pdf = [

    {
      name: "product",
      selector: row => row.item_number,
      sortable: true

    },
    {
      name: "Product Name",
      selector: row => row.product_name,
      sortable: true,
      maxwidth: '800px',
    },

    {
      name: "Quantity",
      selector: row => row.quantity,

    },
    {
      name: "Retail",
      selector: row => row.retail,

    },

  ]  
  
  const handleSelectInvoice = async (e) => {
    e.preventDefault();
    const selectedInvoiceId = e.target.value;
    setSelectedInvoiceId(selectedInvoiceId)
    
    console.log("Selected Invoice ID:", selectedInvoiceId);




    try {
      const response = await axiosInstance.get(`/salesInvoice/${selectedInvoiceId}`)
      const res = response.data
      console.log('response', response.data)
      console.log('total quantity is :', response.data.total_quantity)
      

      setDetailsList(response.data['details'])
      setInvoiceNo(response.data.invoice_no)


      setTotalQuantity(res.total_quantity)

      setTotalAmount(res.total_amount)

      console.log('details:', detailsList)

    } catch (error) {
      console.log('error fetching data ', error.response)
    }



  }
  const handleExportToCsvGrid = (e) => {
    e.preventDefault()
    ExportToCsv(detailsList, `Invoice Details ${invoiceNo}`);

  }
    const handleExportToPdf = (e) => {
      e.preventDefault()
      ExportToPdf_SalesInvoice(invoiceNo,detailsList, columns_pdf, `Sales Invoice  ${invoiceNo}`,totalQuantity,totalAmount);
  
    }

  const handleExportToExcel = (e) => {
    e.preventDefault()

    ExportToExcel(detailsList, `Invoice Details ${invoiceNo}`);
    alert('export to Excel')
  }    
  useEffect(
    () => {
      const fetchProtectedData = async () => {
        try {

          const response = await axiosInstance.get('/salesInvoice/distinct_invoices/')
          setListInvoice(response.data)

          console.log('list of invoices', response.data)
        } catch (error) {
          console.error('\n error (fetchProtectedData )fetching data', error.response)
        }
      }
      fetchProtectedData()
    }, []
  )
  return (
    <>
      <div className="container">
        <h2>Invoice Summary</h2>
        <div className="data-summary">
          <select name="inv_id" id="selectInvoiceId"
            className='form-select' onChange={handleSelectInvoice}>
            {
              listInvoice.map(
                (inv, index) => (
                  <option key={index} value={inv.id}>Inv:   {inv.invoice_no}</option>
                )
              )
            }
          </select>
        </div>


        <div className="data-list">
          <div className="summary-data ">
            <div className="col-lg-6">
              {totalQuantity &&
                <p>Total Quantity : <span>{totalQuantity}</span></p>
              }


            </div>
            <div className="col-lg-6 ">
              {totalAmount &&
                            <p>Total amount : <span>{totalAmount}</span></p>
              }




            </div>

          </div>

          <DataTable id='table-DataTable'
            columns={columns}
            data={detailsList}
            customStyles={dataTableStyle}
            // conditionalRowStyles={conditionalRowStyles}
            pagination
            // selectableRows

            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            actions={

              <>
                {invoiceNo &&
                <>
                  <button className='btn btn-success' onClick={handleExportToCsvGrid}> Export to Csv</button>
                  <button className='btn btn-success' onClick={handleExportToExcel}> Export to Excel</button>
                   <button className='btn btn-success' onClick={handleExportToPdf}> Pdf</button> 
                </>

                }
                 
                  
                

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


    </>
  )
}

export default InvoiceSummary
