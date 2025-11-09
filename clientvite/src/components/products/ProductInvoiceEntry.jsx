import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider';
import { useEffect, useState, useRef, useContext } from 'react'
import axiosInstance from '../../AxiosInstance'

import Button from '../Button'
import DataTable from 'react-data-table-component'
import { ExportToExcel } from '../exportfile/ExportToExcel'



const ProductInvoiceEntry = () => {
  const { isLoggedIn, setIsLoggedIn, theme, setTheme, loggedInUser, setLoggedInUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isSubmit, setIsSubmit] = useState(false)
  const [formErrors, setFormErrors] = useState({})  // empty object

  const [products, setProducts] = useState([])
  const [records, setRecords] = useState(products)

  const [myEntries, setMyEntries] = useState([])
  const [tempRecords, setTempRecords] = useState(myEntries)
  const [dataSaved, setDataSaved] = useState(false)

  const [search, setSearch] = useState('')

    // data control
  const [nextSerialSales, setNextSerialSales] = useState('')
  const [controlId,setControlId] = useState('')



  // columns for tempfiles
  const temp_columns = [

    {
      name: "username",
      selector: row => row.username,
      sortable: true,
    },
    {
      name: "id",
      selector: row => row.id,
      sortable: true
    },
    {
      name: "quantity",
      selector: row => row.quantity,
      sortable: true,
    },
    {
      name: "linkedid",
      selector: row => row.product_linkid,
      sortable: true,
    },
    {
      name: "productname",
      selector: row => row.product_name,
      sortable: true,
    },
    {
      name: "quantity",
      selector: row => row.quantity,
      sortable: true,
    },


  ]
  // columns for product - master file
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

  const handleSearchChange = (e) => {
    e.preventDefault()
    let query = e.target.value
    const newrecords = data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
    setRecords(newrecords)
  }

  
  const readDataControl = async()=> {
    console.log('Getting data control')
    try{
      const response = await axiosInstance.get('/datacontrol/?dataname=sales')
      console.log('response from datacontrol -> ', response.data)
      const mydatacontrol = response.data
      setControlId(mydatacontrol[0].id)
      setNextSerialSales(mydatacontrol[0].nextserial)
      console.log ('after setting')
      return
    }catch(error)  {
     // Handle any errors that occurred during the fetch operation
     console.error('Error fetching sales data:', error.message);
     // You might want to display an error message to the user
    }


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
  const handleSaveData= async (e)=>{
    e.preventDefault()
    console.log ('handle save data click!!!!!')
    
    // read data control
    try{
      const response = await axiosInstance.get('/datacontrol/?dataname=sales')
      console.log('response from datacontrol -> ', response.data)
      const mydatacontrol = response.data
      setControlId(mydatacontrol[0].id)
      setNextSerialSales(mydatacontrol[0].nextserial)
      console.log ('after setting')
      
    }catch(error)  {
     // Handle any errors that occurred during the fetch operation
     console.error('Error fetching sales data:', error.message);
     // You might want to display an error message to the user
    }

    console.log('controlid ', controlId, '--> next invoice :',nextSerialSales )
    const typeserial = typeof(nextSerialSales)
    console.log('next serial type :', typeserial)
    //  data control increment  ->nextserial
    const x_next = nextSerialSales+1
    console.log('2. type of  for next serial ',typeof(x_next))
    console.log('2. control id :',controlId,  'typeof :', typeof(controlId))

    const formData = new FormData()
    formData.append('dataname','sales')
    formData.append ('nextserial',x_next)

    try{
      const datacontrol_resp = await axiosInstance.put(`/datacontrol/${controlId}/`,formData
        //   {
        //   headers: {
        //     // 'Content-Type': 'application/json',
        //     'Content-Type': 'multipart/form-data',
        //     // 'Authorization': 'Bearer your_token' // Example header
        //   }
        // }
      )
      console.log('response updating data control',
        datacontrol_resp.data
      )

    }catch(error){
      console.log ('data control error 2:',error.datacontrol_resp.data)
    }

    // 3. update     sales Entries
    tempRecords.map(async(record, index)=>{
      
      console.log( record.id)
      const formData  = new FormData()
      formData.append('invoice_ref',nextSerialSales)
      formData.append('username', localStorage.getItem('loggedInUser'))
      formData.append('product_linkid',record.product_linkid)
      formData.append('quantity',record.quantity)
      try{
        const response_salesentries = await axiosInstance.post('/salesEntries/', formData,
               {
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data',
            // 'Authorization': 'Bearer your_token' // Example header
          }
        }
        )
        const myresult= response_salesentries.data
        console.log('saving in salesentries',myresult)
        handleDeleteRecord(record.id)

      }catch(error){
        console.log(error.myresult)
      }
    



      })
      navigate('/products')


 
  }


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

  const handleExportToExcel = (e) => {
    e.preventDefault()

    ExportToExcel(tempRecords, 'List of TempEntries');
    alert('export to Excel')
  }
  const handleChange = (e) => {
    e.preventDefault()
    // console.log('handle change input fields', e.target)
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value })
    console.log('handleChange-form values are : ', formValues)
  };

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
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
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
      navigate('/products-invoice-entry')

      // window.location.reload()


    } catch (error) {
      // setFormErrors({ 'product_itemno': error.response.data.product_itemno });
      console.log('There was an error!', error.response);
    }



  }
  // when form errors change
  useEffect(
    () => {

      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log('form values are', formValues)
        console.log('ready to save data')



        // alert('no more errors')
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


  useEffect(
    () => {
      const fetchProtectedData = async () => {

        try {
          const currentUser = localStorage.getItem('loggedInUser')
          console.log('reading logged in user--->>>', currentUser)

          setLoggedInUser(currentUser)
          console.log('reading logged in user--->>>', loggedInUser)
          const response = await axiosInstance.get(`/tempentries/?username=${currentUser}`)
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




  return (
    <>
      <div className="container">
        <div>ProductInvoiceEntry</div>
        <div className="row px-2 py-3">
          <div className="form-area col-md-4 me-auto">
            <p>form area</p>
            <form onSubmit={handleSubmit}>
              {/* itemnumber */}
              <div className="form-group ">
                <label htmlFor="" className='col-md-4'>Itemno </label>
                <button type='button'
                  className='btn btn-primary btn-sm'
                  data-bs-toggle='modal'
                  data-bs-target='#searchModalForm'
                >Search</button>


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
              {/* product name */}
              <div className="form-group ">
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

              {/* wholesale price */}
              <div className="form-group ">
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
              {/* retail price */}
              <div className="form-group ">
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
              {/* retail price */}
              <div className="form-group ">
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

              <button type='submit'
                className='fluid btn btn-primary'
              >Save</button>

            </form>



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
          <div className="entry-area col-md-8">
            
            <div className="data-list">
              <h2>Entries</h2>
              <DataTable id='table-DataTable'
                columns={temp_columns}
                data={tempRecords}
                customStyles={tableHeaderStyle}
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
             <div className="button-area">
                <button type='button' 
                className='btn btn-primary btn-sm'
                onClick={handleSaveData}
                
                >Save and Close</button>
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
                customStyles={tableHeaderStyle}
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

export default ProductInvoiceEntry