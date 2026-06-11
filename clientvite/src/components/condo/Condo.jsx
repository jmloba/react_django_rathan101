import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../AuthProvider';
import axiosInstance from '../../AxiosInstance';
import DataTable from 'react-data-table-component'
import { dataTableStyle } from '../functions/DataTableStyle';
import { hasPermission } from '../functions/Permission'

const Condo = () => {
 
  const {
    isLoggedIn, setIsLoggedIn,
    email, setEmail,
    theme, setTheme,
    loggedInUser, setLoggedInUser,
    permissions, setPermissions,
    user_Id, setUser_Id
  } = useContext(AuthContext)

  const [search, setSearch] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [formImage, setFormImage] = useState('');
  const [billIdAddPayment, setBillIdAddPayment] = useState('')
  const handleBillId = (id)=>{
    setBillIdAddPayment(id)

  }
  const columns = [
    {
      name: "Action",

      cell: (row) => (
        <div className='cl-action'>
          {hasPermission('app_condo.delete_condobill') &&
            <button className='btn btn-danger btn-sm '
              onClick={() => { handleRemoveCondoBill(row.id) }}
            >delete condobill</button>

          }
        </div>
      )
    },
    {
      
      cell: (row) => (
        <div className='cl-action'>
          {hasPermission("app_condo.change_condobill") &&
            <button type='button'
              className='me-3 btn btn-primary ml-auto d-block mb-2'
              data-bs-toggle='modal'
              data-bs-target='#editModalForm'
              onClick={(e) => handleEditButton(row.id, e)}
            >
              Edit modal
            </button>
          }
        </div>
      )
    },
    {
      
      cell: (row) => (
        <div className='cl-action'>
          {hasPermission("app_condo.change_condobill") &&
          <>
          
            <button type='button'
              className='me-3 btn btn-primary ml-auto d-block mb-2'
              data-bs-toggle='modal'
              data-bs-target='#addPaymentModalForm'
              onClick={(e) => handleBillId(row.id, e)}
            >
              Add Payment
            </button>

          </>
          }
        </div>
      )
    },
    {
      name: "id",
      selector: row => row.id,
      sortable: true

    },

    {
      name: "Date",
      selector: row => row.bill_date,
      sortable: true

    },
    {
      name: "Amount",
      selector: row => row.bill_amount,
      sortable: true,
      // maxwidth: '800px',
    },
    {
      name: "Total Paid",
      selector: row => row.total_paid
      ,
      sortable: true
    },



    {
      name: "DateEntry",
      selector: row => {
        // Convert the string to a Date object
        const dateObject = new Date(row.date_of_entry);
        // Format the date as desired (e.g., YYYY-MM-DD)
        return dateObject.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
      },
      sortable: true
    },


  ]
  const [mBillRef,setMBillREf] = useState('')
  const [condoBill, setCondoBill] = useState([])
  const [records, setRecords] = useState([])
  const [paymentDetails, setPaymentDetails] = useState([])
  const [billImage,setBillImage] = useState('')
  const [rowBillImage, setRowBillImage] = useState('')
  const [formErrors, setFormErrors] = useState({})  // empty object

  const [formPaymentErrors, setFormPaymentErrors] = useState({})  // empty object

  const [paymentImg,setPaymentImg] = useState('')

  const initPaymentValues={
    payment_date:'',
    payment_amount:'',
    payment_ref:'',
    }
  const [formPaymentValues,setFormPaymentValues] = useState(initPaymentValues)

  const initialValues = {
    bill_date: '',
    bill_amount:'',
  }

  const [formValues, setFormValues] = useState(initialValues)
  const handleBillImage =(e)=>{
    e.preventDefault();
    setBillImage(e.target.files[0])
  }
    const handlePaymentImage =(e)=>{
    e.preventDefault();
    setPaymentImg(e.target.files[0])
  }
  const validate = (values) => {
    const errors = {}
    // regex used to validate email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.bill_date) {
      errors.bill_date = 'Bill Date is required'
    }
    if (!values.bill_amount) {
      errors.bill_amount = 'Bill Amount is required'
    }

  return errors

  }  
  const validatePayment =(values)=>{
    const errors= {}
    if(!values.payment_date){
      errors.payment_date ='PaymentDate is required'
    }
    if(!values.payment_amount){
      errors.payment_amount ='Payment Amount is required'
    }
    if(!values.payment_ref){
      errors.payment_ref ='Payment Reference is required'
    }
    return errors

  }



  const handleChanges = (e) => {
    e.preventDefault();
    console.log('handleChange-event target name and value : ', e.target.name, e.target.value)

    setFormValues({ ...formValues, [e.target.name]: [e.target.value] })
    console.log('handleChange-form values are : ', formValues)
  }
  const handlePaymentChanges = (e) => {
    e.preventDefault();
    console.log('handleChange-event target name and value : ', e.target.name, e.target.value)

    setFormPaymentValues({ ...formPaymentValues, [e.target.name]: [e.target.value] })
    console.log('handleChange-form values are : ', formPaymentValues)
  }

  const hidePaymentModal=()=>{
    $('#addPaymentModalForm').modal('hide')
  }
  const handleCondoPaymentSave = async (e)=>{
    e.preventDefault()
    const errors = validatePayment(formPaymentValues);
    setFormPaymentErrors(errors);
       if (Object.keys(errors).length === 0) {
         setIsSubmit(true)
         const formData = new FormData(); // Create a FormData object

          formData.append('payment_date', formPaymentValues.payment_date[0] || '');
          formData.append('payment_amount', formPaymentValues.payment_amount ? parseFloat(formPaymentValues.payment_amount) : '');
          formData.append('payment_ref', formPaymentValues.payment_ref[0] || '');
          formData.append('user', user_Id);
          formData.append('bill_ref', billIdAddPayment);

          // Conditionally append the image file
          if (paymentImg) {
              formData.append('payment_img', paymentImg);
          }

        console.log('before saving payment :', formData); // Log the FormData object

       
        

      try{
      const response = await axiosInstance.post('/condopayment/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
        });
        console.log('Saving in condopayment', response.data);
        alert ('Entries payment Saved Successgully', response.data)
        setIsSubmit(false)
        console.log("Validation passed. Modal should close now.");
        hidePaymentModal(); // Call your specific function to hide the modal

      }catch(error){
        console.error('Error submitting condopayment:', error.response ? error.response.data : error.message);
        
         // Log the full error response data for debugging
      if (error.response && error.response.data) {
        console.error('Server-side errors:', error.response.data);
      }
      }        
        


    } else {
        // Validation failed: errors are set, the modal remains open
        console.log("Validation failed. Staying on the form.");
    }

  }


  const handleCondoBillSave = async (e)=>{
    e.preventDefault()
    const errors = validate(formValues);
    setFormErrors(errors);
    console.log ('submit clicked')
    console.log('handleSubmit - form values are : ', formValues)
    
    console.log('Value of formValues.bill_date:', formValues.bill_date); // Add this line
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true)
        // Convert empty strings to null for fields that require a specific type
        const data_to_save = {
            bill_date: formValues.bill_date[0] || null,
            bill_amount: formValues.bill_amount ? parseFloat(formValues.bill_amount) : null,

            // Conditionally add bill_img if it exists
            ...(billImage && { bill_img: billImage }),
        };

      try{
      const response = await axiosInstance.post('/condobill/', data_to_save, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
        });
        console.log('Saving in condobill', response.data);
        alert ('Entries Saved Successgully', response.data)
        setIsSubmit(false)

      }catch(error){
        console.error('Error submitting condobill:', error.response ? error.response.data : error.message);
        
         // Log the full error response data for debugging
      if (error.response && error.response.data) {
        console.error('Server-side errors:', error.response.data);
      }
      }

    }else{
      console.log('handleSubmit - form errors are : ', formErrors)
      console.log("Validation failed on client side, stopping submission.");
      console.log("Errors:", errors);
    }


  }

  const handleRemoveCondoBill = async (billId) => {
    if (window.confirm(`Are you sure you want to delete record ${billId}`)) {
      try {
        setIsSubmit(true)
        const response = await axiosInstance.delete(`/condobill/${billId}/`)

        // alert("removed employees data successfully")
        // window.location.reload()
        setIsSubmit(false)
        
      } catch (error) {
        console.log('error in deletion :', error.message)
      }
  }
}

  const handleRecordSelect = (row) => {
    console.log('Row clicked:', row)
    setPaymentDetails(row.payments_details)
    setRowBillImage(row.bill_img)
  }
  const handlePrintImage = (imageUrl) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print Image</title></head><body>');
        printWindow.document.write(`<img src="${imageUrl}" onload="window.print();window.close()" alt="Payment Proof" style="max-width: 100%;" />`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
    };
  const handlePrintBillImage = (imageUrl) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print Image</title></head><body>');
        printWindow.document.write(`<img src="${imageUrl}" onload="window.print();window.close()" alt="Payment Proof" style="max-width: 100%;" />`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
    };
    const fetchCondoBills = async () => {
    try {
      const response = await axiosInstance.get('/condobill/')
      setCondoBill(response.data)
      setRecords(response.data)
      console.log('***response fetching condobill:', response.data)
    } catch (error) {
      console.error('\n error (fetchCondoBills) fetching data', error.response)
    }
  };
  

  const handleDeletePayment = async (paymentId) => {
    console.log('id to delete ', paymentId)
    if (!window.confirm("Are you sure you want to delete this payment record?")) {
      return;
    }

    try {
      await axiosInstance.delete(`/condopayment/${paymentId}/`);
      alert("Payment deleted successfully!");
      setPaymentDetails(prevDetails => prevDetails.filter(payment => payment.id !== paymentId));
      setIsSubmit(false)
    } catch (error) {
      console.error('\n error deleting payment', error.response);
      alert("Failed to delete payment. Check console for details.");
    }

  }
  useEffect(
    () => {
      console.log('search value', search)
      const result = condoBill.filter((item) => {
        const billamount = item.bill_amount.includes(search);
        return billamount
      })
      setRecords(result)
    }, [search]
  )
  useEffect(
    () => {
      const fetchProtectedData = async () => {
        try {
          const response = await axiosInstance.get('/condobill/')
          setCondoBill(response.data)
          setRecords(response.data)
          console.log('***response fetching condobill:', response.data)
        } catch (error) {
          console.error('\n error (fetchProtectedData )fetching data', error.response)
        }
      }
      fetchProtectedData()
    }, [isSubmit]
  )
  return (
    <>
      <div className="container-1" >
        <h2>Condo View</h2>
        <h3>user id {user_Id}</h3>
        <div className="main-body-1" >
          <div className="col-lg-6 mx-3 ">
            <div className="data-list">
              <button 
              className='btn btn-info'
              type='button'
                 data-bs-toggle='modal'
            data-bs-target='#addModalForm'
            // onClick={(e) => handleEditButton(row.id, e)}
              >Add CondoBill </button>
              <DataTable id='table-DataTable'
                columns={columns}
                data={records}
                customStyles={dataTableStyle}
                // conditionalRowStyles={conditionalRowStyles}
                pagination
                // selectableRows
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                onClickedRowsChange={(rows) => console.log('Selected Rows: ', rows)}
                onRowClicked={handleRecordSelect}
                actions={
                  <>
                    {/* <button className='btn btn-success' onClick={handleExportToCsvGrid}> Export to Csv</button>
                  <button className='btn btn-success' onClick={handleExportToExcel}> Export to Excel</button>
                  <button className='btn btn-success' onClick={handleExportToPdf}> Pdf</button>
                  {hasPermission("app_employees.add_employee") &&
                  <button className='btn btn-success' onClick={handleAddRecord}> AddRecord</button>
              } */}

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
          <div className="col-lg-5 mx-3">
            <div className='condo-bill-data text-center'>
              <h2>Bill DAta</h2>

              {rowBillImage &&
              <>
               <button className='btn btn-primary' onClick={() => handlePrintBillImage(rowBillImage)}>Print Bill</button>
               <img src={rowBillImage} alt="image" style={{width:"30em", height:"30em", marginTop:"1em" }}/>
              </>
                 
                          
                 
              }

            </div>
            <div className='condo-payment-data mt-5'>
              <h4>Payment Details</h4>
              <ul className="list-group">
                {paymentDetails.length === 0 ? (
                  <li className="list-group-item">No payment details available.</li>
                ) : (
                  paymentDetails.map((payment) => (
                    <li key={payment.id} className="list-group-item ">
                      <div className="payment-details">
                        <p>{payment.id}</p>
                        <p><strong>Payment Date:</strong> {payment.payment_date}</p>
                        <p><strong>Payment Amount:</strong> {payment.payment_amount}</p>
                        <p><strong>Payment Reference:</strong> {payment.payment_ref}</p>
                        <div className="div-image text-center mt-2">
                          <button className='btn btn-primary' onClick={() => handlePrintImage(payment.payment_img)}>Print Image</button>
                          
                          <img src={payment.payment_img} alt="image" style={{width:"40em", height:"40em", marginTop:"1em" }}/>

                        </div>
                        

                      </div>
                      <div className="button-area">
                        {hasPermission('app_condo.delete_condopayment') &&
                          <button type="button" className='btn btn-info'
                            onClick={() => { handleDeletePayment(payment.id) }}
                          >Delete</button>
                        }
                      </div>
                    </li>
                  ))
                )
                }
              </ul>

            </div>

          </div>
        </div>
      </div>


      {/*------- add payment modal ------*/}
      <div className='modal fade' id='addPaymentModalForm' tabIndex='-1' aria-labelledby='exampleModalLabel' 
      // aria-hidden='true'
       >
        <div className="modal-dialog modal-lg  ">
          <div className="modal-content   ">
            <div className="modal-header">
              <h5 className='modal-title' id='addPaymentModalTitle'>Add CondoBill</h5>
            </div>
            <div className="modal-body">
              <form  onSubmit={handleCondoPaymentSave}>
                {/* payment date */}
                <div className="row">
                  <div className="form-group">
                    <label className="form-label">payment Date</label>
                    <input type="date" className='form-control'
                      name='payment_date'
                      placeholder='Date'
                      value={formPaymentValues.payment_date}
                      onChange={handlePaymentChanges}
                    />
                  </div>                
                  <div className="form-errors">
                    <p>{formPaymentErrors.payment_date}</p>
                  </div>
                </div>  
                {/* payment amount */}
                <div className="row">
                  <div className="form-group">
                    <label className="form-label">payment Amount</label>
                    <input type="number" className='form-control'
                      name='payment_amount'
                      placeholder='Amount'
                      value={formPaymentValues.payment_amount}
                      onChange={handlePaymentChanges}
                    />
                  </div>                
                  <div className="form-errors">
                    <p>{formPaymentErrors.payment_amount}</p>
                  </div>
                </div>                  
              {/* payment reference */}
                <div className="row">
                  <div className="form-group">
                    <label className="form-label">Payment Reference</label>
                    <input type="text" className='form-control'
                      name='payment_ref'
                      placeholder='Payment Reference'
                      value={formPaymentValues.payment_ref}
                      onChange={handlePaymentChanges}
                    />
                  </div>                
                  <div className="form-errors">
                    <p>{formPaymentErrors.payment_ref}</p>
                  </div>
                </div>             
    {/* payment image */}
                <div className="row">
                  <div className="form-group">
                    <label className="form-label">Image </label>
                    <input type="file" className='form-control'
                      name='payment_img'
                      placeholder='Payment Image'
                      value={paymentImg.paymentImg}
                      onChange={handlePaymentImage}
                    />
                  </div>                
                </div>           
                <div className="button-area mb-2 mt-3">
                  <button type='submit' className='btn btn-info  ' 
        
                      // data-bs-dismiss='modal'
                  >Save Payment</button>            

                </div>
                      

              </form>

            </div>
              <div className="modal-footer">
              <div className="form-values ">
                {Object.keys(formPaymentErrors).length === 0 && isSubmit ?
                  (
                    <div className="ui message success">
                      <pre> {JSON.stringify(formPaymentValues, undefined, 2)} </pre>
                    </div>) :
                  (<pre>
                    {JSON.stringify(formPaymentValues, undefined, 2)}
                  </pre>)}

                (<pre>
                  {formImage && JSON.stringify(paymentImg.name, undefined, 2)}
                </pre>)
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* -------------add condobill modal -----------*/}
      <div className='modal fade' id='addModalForm' tabIndex='-1' aria-labelledby='exampleModalLabel' 
      // aria-hidden='true'
       >
        <div className="modal-dialog modal-lg  ">
          <div className="modal-content   ">
            <div className="modal-header">
              <h5 className='modal-title' id='ModalTitle'>Add CondoBill</h5>

            </div>
            <div className="modal-body">
              <form onSubmit={handleCondoBillSave}>
                {/* bill date */}
                <div className="row">
                  <div className="form-group">
                    <label className="form-label">Bill Date</label>
                    <input type="date" className='form-control'
                      name='bill_date'
                      placeholder='Date'
                      value={formValues.bill_date}
                      onChange={handleChanges}
                    />
                  </div>                
                  <div className="form-errors">
                    <p>{formErrors.bill_date}</p>
                  </div>
                </div>  

                {/* bill amount */}
                <div className="row">
                  <div className="form-group">
                    <label className="form-label">Bill Amount</label>
                    <input type="number" className='form-control'
                      name='bill_amount'
                      placeholder='Amount'
                      value={formValues.bill_amount}
                      onChange={handleChanges}
                    />
                  </div>                
                  <div className="form-errors">
                    <p>{formErrors.bill_amount}</p>
                  </div>

                </div>  

                {/* bill image */}
                <div className="row">
                  <div className="form-group">
                    <label className="form-label">Bill Image</label>
                    <input type="file" className='form-control'
                      name='bill_image'
                      placeholder='Amount'
                      value={formImage.billImage}
                      onChange={handleBillImage}
                    />
                  </div>         

                </div>      
                <div className="button-area mb-2 mt-3">
                  <button type='submit' className='btn btn-info  ' 
        
                      data-bs-dismiss='modal'
                  >Save</button>            

                </div>


              </form>
              
            </div>
            <div className="modal-footer">
              <div className="form-values ">
                {Object.keys(formErrors).length === 0 && isSubmit ?
                  (
                    <div className="ui message success">
                      <pre> {JSON.stringify(formValues, undefined, 2)} </pre>
                    </div>) :
                  (<pre>
                    {JSON.stringify(formValues, undefined, 2)}
                  </pre>)}

                (<pre>
                  {formImage && JSON.stringify(formImage.name, undefined, 2)}
                </pre>)
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* -------------end of add condobill modal -----------*/}
    </>
  )
}

export default Condo