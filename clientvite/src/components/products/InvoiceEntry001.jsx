import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider';
import { useEffect, useState, useRef, useContext } from 'react'
import DataTable from 'react-data-table-component'
import { dataTableStyle } from '../functions/DataTableStyle';
import axiosInstance from '../../AxiosInstance';
import temp_columns from './TempfileColumns'
import { getFormattedDate } from '../functions/GetDate';

const InvoiceEntry001 = () => {
  const { 
   isLoggedIn,setIsLoggedIn,
        email ,setEmail,
        theme ,setTheme,
        loggedInUser,setLoggedInUser,
        permissions,setPermissions,
        user_Id,setUser_Id
        } = useContext(AuthContext)



  const navigate = useNavigate()
  const todaydate = getFormattedDate()

  const [isSubmit, setIsSubmit] = useState(false)
  const [formErrors, setFormErrors] = useState({})  // empty object
  const [products, setProducts] = useState([])
  const [records, setRecords] = useState(products)
  const [myEntries, setMyEntries] = useState([])
  const [tempRecords, setTempRecords] = useState(myEntries)
  const [dataSaved, setDataSaved] = useState(false)
  const [totalQuantity, setTotalQuantity] = useState('')
  const [totalAmount, setTotalAmount] = useState(false)
  // data control
  const [nextSerialSales, setNextSerialSales] = useState('')
  const [controlId,setControlId] = useState('')

  const columns = [
    {
      name: "id",
      selector: row => row.id,
      sortable: true

    },

    {
      name: "itemnumber",
      selector: row => row.product_itemno,
      sortable: true,
      maxwidth: '800px',
    },
    {
      name: "product_name",
      selector: row => row.product_name,
      sortable: true,

    },
    {
      name: "wholesale",
      selector: row => row.wholesale_price,
      sortable: true,

    },
    {
      name: "retail",
      selector: row => row.retail_price,
      sortable: true,

    },
    {
      name: "quantity",
      selector: row => row.quantity,
      sortable: true,

    },
  ]
  const [search, setSearch] = useState('')
  const initialValues = {
    username: loggedInUser,
    ref_id: "",
    itemnumber: "",
    product_name: "",
    wholesale_price: "",
    retail_price: "",
    quantity: "",

  }
  const [formValues, setFormValues] = useState(initialValues)
  const handleRowClick = row => {
    console.log('row values are :', row)
    setFormValues({
      username: loggedInUser,
      ref_id: row.id,
      itemnumber: row.product_itemno,
      product_name: row.product_name,
      wholesale_price: row.wholesale_price,
      retail_price: row.retail_price,
      quantity: 0
    })
  }
    const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.ref_id) {
      errors.ref_id = 'ref_id  is required'
    }

    if (!values.itemnumber) {
      errors.itemnumber = 'Itemnumber  is required'
    }
    if (!values.product_name) {
      errors.product_name = 'Product Name is required'
    }
    if (values.wholesale_price <= 0) {
      errors.wholesale_price = 'Wholesale Price is required'
    }
    if (values.retail_price <= 0) {
      errors.retail_price = 'Retail Price is required'
    }

    if (values.quantity <= 0) {
      errors.quantity = 'Qauntity is required'
    }

    return errors

  }
  const handleChange = (e) => {
    e.preventDefault()
    // console.log('handle change input fields', e.target)
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value })
    console.log('handleChange-form values are : ', formValues)
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
  }



  const handleExportToExcel = (e) => {
    e.preventDefault()

    ExportToExcel(tempRecords, 'List of TempEntries');
    alert('export to Excel')
  }
  const handleDeleteRecord = async (id)=>{
      try{
        const response = await axiosInstance.delete(`/tempentries/${id}/`)
        console.log('Deleted record no :',id)
        console.log('deletion :', response.data)
      }catch(error){
        console.log('error in deletion :',error.message)
   
    }

  }  


    const saveData = async () => {
    console.log('form errors length is zero : -> save procedure', Object.keys(formErrors).length === 0)
    console.log('logged in user ', loggedInUser)
    const formData = new FormData()
    formData.append('itemnumber', formValues.itemnumber)
    formData.append('product_name', formValues.product_name)
    formData.append('wholesale_price', formValues.wholesale_price)
    formData.append('retail_price', formValues.retail_price)
    formData.append('quantity', formValues.quantity)
    formData.append('product_linkid', formValues.ref_id)
    formData.append('username', loggedInUser)
    try {
      const response = await axiosInstance.post('/tempentries/', formData,
        {
          
          headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            // 'Authorization': 'Bearer your_token' // Example header
          }
        }
      )
      setDataSaved(true)
      console.log('response ->>', response.data)
      navigate('/invoiceentry-001')

      // window.location.reload()


    } catch (error) {
      // setFormErrors({ 'product_itemno': error.response.data.product_itemno });
      console.log('There was an error!', error.response);
    }
  }


  const handleSaveData= async (e)=>{
    e.preventDefault()
    console.log ('handle save data click!!!!!')

    // get summary of tempfile
    try{
      const resSummary = await axiosInstance.get(`/tempentries/summary_by_username/?username=${loggedInUser}`)
      console.log('Summary of tempfile -> ', resSummary.data)
      // joven
      setTotalQuantity(resSummary.data.total_quantity)
      setTotalAmount(resSummary.data.total_value)
    }catch(error)  {
     console.error('summary error:', error.message);
     return null
    }
    console.log('totalquantity:', totalQuantity)
    console.log('totalamount:', totalAmount)

    
      
    // read data control
    try{
      const response = await axiosInstance.get('/datacontrol/?dataname__iexact=sales')
      console.log('response from datacontrol -> ', response.data)
      const mydatacontrol = response.data
      setControlId(mydatacontrol[0].id)
      setNextSerialSales(mydatacontrol[0].nextserial)
      
      
    }catch(error)  {
     console.error('Error fetching sales data:', error.message);
    }
  
    console.log('controlid : ', controlId, )
    console.log('nextSerialSales :', nextSerialSales)
    console.log('nextSerialSales  type :', typeof(nextSerialSales))

    // //  data control increment  ->nextserial
    const x_next = nextSerialSales+1

    console.log ('Next serial number is   *** :',x_next)

    const formData = new FormData()
    formData.append('dataname','sales')
    formData.append ('nextserial',x_next)

    try{
      const datacontrol_resp = await axiosInstance.put(`/datacontrol/${controlId}/`,
        formData,
          {
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data',
            // 'Authorization': 'Bearer your_token' // Example header
          }
        }
      )
      console.log('response after updating updating data control', datacontrol_resp.data)
      console.log('data control has been edited ***')   
      

    }catch(error){
      console.log ('data control  error 2 -> error in updating  ****:',error.datacontrol_resp.data)
    }
    console.log('saving to invoice master')
    console.log('totalQuantity:', totalQuantity, "type is :",typeof(totalQuantity))
    console.log('totalAmount:', totalAmount,  " type is :",typeof(totalAmount) )



const invoiceMasterData = {
    'invoice_no': nextSerialSales,
    'invoice_date': todaydate,
    'total_quantity': parseInt(totalQuantity),
    'total_amount': parseFloat(totalAmount),
    'username': user_Id, // Assuming user_Id is the user's primary key
    'details': tempRecords.map(trec => ({ // Structure the details correctly
        'product': trec.product_linkid,
        'quantity': trec.quantity
    }))
};

try {
    // Send a single POST request with JSON data
    const resInvoiceMaster = await axiosInstance.post('/salesInvoice/', invoiceMasterData, {
        headers: {
            'Content-Type': 'application/json', // Set content type to JSON
            // 'Authorization': 'Bearer your_token' // Example header
        }
    });
    
    console.log('invoice master and details saved', resInvoiceMaster.data);
    // You can now proceed knowing everything saved correctly
    
} catch (error) {
    console.error('error saving invoice master and details', error.response ? error.response.data : error.message);
    // Handle errors appropriately
}

    // // 3. update     sales Entries
    
    //   })


    // handleDeleteTempfile
    console.log('saving and close tempfile')
    navigate('/products')
  }
  useEffect(
      () => {
  
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          console.log('form values are', formValues)
          console.log('ready to save data')
            saveData()
          }
      }, [formErrors]
  
  )
  useEffect(() => {
      console.log('search value', search)
      const result = products.filter((item) => {
        return item.product_name.toLowerCase().match(search.toLowerCase());
      })
      setRecords(result)
  }, [search]
  
    )
  useEffect(
    () => {
      const fetchProtectedData = async () => {
        console.log('reading tempfile***')

        try {
          const currentUser = localStorage.getItem('loggedInUser')
          console.log('reading logged in user--->>>', currentUser)

          setLoggedInUser(currentUser)
          console.log('reading logged in user--->>>', loggedInUser)
          const response = await axiosInstance.get(`/tempentries/?username__iexact=${currentUser}`)
          setMyEntries(response.data)
          setTempRecords(response.data)
          console.log('tempentries :', response.data)
        } catch (error) {
          console.log('\n error (fetchProtectedData )fetching products', error.response)
        }
      }
      fetchProtectedData();
    }, [dataSaved]
    

  )
    useEffect(
    () => {
      const fetchProtectedData = async () => {
        try {

          const response = await axiosInstance.get('/products/')
          setProducts(response.data)
          setRecords(response.data)
          console.log('useEffect product list :', response.data)
        } catch (error) {
          console.log('\n error (fetchProtectedData )fetching products', error.response)
        }
      }
      fetchProtectedData();
    }, []
  )



  return (
    <>
      <div className="container">
        <div>
          <h2>Invoice Entry</h2>
        </div>
        <div className="row dataTable py-3 px-3">
          <div className="data-list">
            <h2>Entries</h2>
            <DataTable id='table-DataTable'
              columns={temp_columns}
              data={tempRecords}
              customStyles={dataTableStyle}
              // conditionalRowStyles={conditionalRowStyles}
              pagination
              selectableRows

              fixedHeader
              selectableRowsHighlight
              highlightOnHover
              actions={
                <>
                  <button className='btn btn-success' onClick={handleExportToExcel}> Export to Excel</button>
                  {/*                   
                  <button className='btn btn-success' onClick={handleExportToCsvGrid}> Export to Csv</button>
                  <button className='btn btn-success' onClick={handleExportToPdf}> Pdf</button> 
                
 */}

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
        <div className="row data-entry py-3 px-3">
          <div className="form-area  me-auto">
            <p>form area</p>
            <form onSubmit={handleSubmit}>

              <div className="row">
                <div className="md-col-2">
                <button type='button'
                  className='btn btn-primary btn-sm'
                  data-bs-toggle='modal'
                  data-bs-target='#searchModalForm'
                >Search</button>

                </div>

              </div>


              <div className='row'>
                <div className="col-md-6">
                  <label htmlFor="" className='col-md-4'>Product Name </label>
                  
                  <input type="text"
                    className='form-control col-md-8'
                    name="itemnumber"
                    values={formValues.itemnumber}
                    defaultValue={formValues.itemnumber}
                    placeholder="Item Number"
                    onChange={handleChange}
                  />
                  <div className="form-errors">
                    <p>{formErrors.itemnumber}</p>
                  </div>

                </div>
                <div className="col-md-6">
                  <label htmlFor="" className='col-md-4'>Product Name </label>
                  <input type="text"
                    className='form-control col-md-8'
                    name="product_name"
                    defaultValue={formValues.product_name}
                    values={formValues.product_name}
                    placeholder="Product Name"
                    // onChange={handleChange}
                    readOnly
                  />
                  <div className="form-errors">
                    <p>{formErrors.product_name}</p>
                  </div>

                </div>
              </div>  
              <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="" className='col-md-4'>Wholesale </label>
                    <input type="number"
                      className='form-control col-md-8'
                      name="wholesale_price"
                      defaultValue={formValues.wholesale_price}
                      values={formValues.wholesale_price}
                      placeholder="Wholesale Price"
                      // onChange={handleChange}
                      readOnly
                    />
                    <div className="form-errors">
                      <p>{formErrors.wholesale_price}</p>
                    </div>

                  </div>
                  <div className="col-md-6">
                    <label htmlFor="" className='col-md-4'>Retail </label>
                    <input type="number"
                      className='form-control col-md-8'
                      name="wholesale_price"
                      defaultValue={formValues.retail_price}
                      values={formValues.retail_price}
                      placeholder="Retail Price"
                      // onChange={handleChange}
                      readOnly
                    />
                    <div className="form-errors">
                      <p>{formErrors.retail_price}</p>
                    </div>
                  </div>

             </div>
             <div className="row">
              <div className="colmd-6">
                <label htmlFor="" className='col-md-4'>Quantity </label>
                <input type="number"
                  step="1"
                  className='form-control col-md-8'
                  name="quantity"
                  defaultValue={formValues.quantity}
                  values={formValues.quantity}
                  placeholder="Retail Price"
                  onChange={handleChange}
                // readOnly
                />
                <div className="form-errors">
                  <p>{formErrors.quantity}</p>
                </div>

              </div>

             </div>
             <div className="row col-md-3 ">

              <button type='submit'
                className='fluid btn btn-primary'
              >Save</button>


             </div>


            </form>
               <div className="button-area">
                <button type='button' 
                className='btn btn-primary btn-sm'
                onClick={handleSaveData}
                
                >Save and Close</button>
              </div>



            <div className='form-values'>
              {Object.keys(formErrors).length === 0 && isSubmit ?
                (
                  <div className="ui message success">
                    data validated
                  </div>
                ) : (
                  <pre>
                    {JSON.stringify(formValues, undefined, 2)}
                  </pre>
                )}
            </div>

          </div>

        </div>



      </div>
      {/* ------- modal area       */}
      <div className="modal fade"
        id='searchModalForm'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
      // aria-hidden='true'
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <h2>Search modal</h2>
            <div className="data-list">
              <DataTable id='table-DataTable'
                columns={columns}
                data={records}
                customStyles={dataTableStyle}
                // conditionalRowStyles={conditionalRowStyles}
                pagination
                selectableRows

                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                onRowClicked={handleRowClick}
                actions={
                  <>
                    {/*                   
                  <button className='btn btn-success' onClick={handleExportToCsvGrid}> Export to Csv</button>
                  <button className='btn btn-success' onClick={handleExportToExcel}> Export to Excel</button>
                  <button className='btn btn-success' onClick={handleExportToPdf}> Pdf</button> */}

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

      </div>
    </>
  )
}

export default InvoiceEntry001