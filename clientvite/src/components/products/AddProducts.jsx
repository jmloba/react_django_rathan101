import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import axiosInstance from '../../AxiosInstance'


const AddProducts = () => {
  const [validationErrors, setValidationErrors] = useState({})
  const navigate = useNavigate()

  const [formErrors, setFormErrors] = useState({})  // empty object
  const fileInputRef = useRef(null);

  const [isSubmit, setIsSubmit] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);
  const [productCategoryList, setProductCategoryList] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const initialValues = {
    product_itemno: "",
    product_name: "",
    product_category: "2",
    wholesale_price: "",
    retail_price: "",
    stock: "",
    image: ''

  }
  const [formValues, setFormValues] = useState(initialValues)

  const handleChange = (e) => {
    e.preventDefault()
    console.log('handle change input fields', e.target)
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value })
    console.log('handleChange-form values are : ', formValues)
  };

  const handleFileChange = (e) => {
    // Access the selected files via event.target.files
    setUploadedFiles(e.target.files[0])
    const { name, value } = e.target;
    const files = e.target.files[0];
    console.log('files selected are ', files)

    setFormValues({ ...formValues, [name]: value })


  };

  const handleSelectProductCategory = (e) => {
    console.log('selected product category ', e.target.value)
    setFormValues({ ...formValues, product_category: e.target.value })
  }


  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.product_itemno) {
      errors.product_itemno = 'Product Itemno  is required'
    }

    if (!values.product_name) {
      errors.product_name = 'Product  Name is required'

    } else if (values.product_name.length < 3) {
      errors.product_name = 'Name length  should be >3'

    } else if (values.product_name.length > 100) {
      errors.product_name = 'Name length  should be <=100'

    }


    if (values.wholesale_price <= 0) {
      errors.wholesale_price = 'Wholesale Price > 0'
    } else if (values.wholesale_price > 100000) {
      errors.wholesale_price = 'Wholesale Price  should be <= 100000'
    }


    if (values.retail_price <= 0) {
      errors.retail_price = 'Retail Price > 0'
    } else if (values.retail_price > 100000) {
      errors.retail_price = 'Retail Price  should be <= 100000'
    }


    if (values.stock <= 0) {
      errors.stock = 'Stock > 0'
    } else if (values.stock > 100000) {
      errors.stock = 'stock Price  should be <= 100000'
    }

    if (!values.image) {
      errors.image = 'No uploaded files'
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
    const formData = new FormData()
    formData.append('product_itemno', formValues.product_itemno)
    formData.append('product_name', formValues.product_name)
    formData.append('product_category', formValues.product_category)
    formData.append('wholesale_price', formValues.wholesale_price)
    formData.append('retail_price', formValues.retail_price)
    formData.append('stock', formValues.stock)
    formData.append('image', uploadedFiles)
    try {
      const response = await axiosInstance.post('/products/', formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
      // clear errors
      navigate('/products')

    } catch (error) {
      setFormErrors({ 'product_itemno': error.response.data.product_itemno });

      console.error('There was an error!', error.
        response.data.product_itemno
      );

    }


    // alert('data saved', formValues)

  }

  // when form errors change
  useEffect(
    () => {
      console.log('form errors :', formErrors)
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log('form values are', formValues)

        // alert('no more errors')
        saveData()

      }
    }, [formErrors]

  )
  useEffect(
    () => {
      const fetchProtectedData = async () => {
        try {

          const response_category = await axiosInstance.get('/productcategory/')
          setProductCategoryList(response_category.data)
          console.log('useEffect product category list :', response_category)
        } catch (error) {
          console.log('\n error (fetchProtectedData )fetching department', error.response_category)
        }
      }
      fetchProtectedData();
    }, []
  )

  return (
    <>
      <div className="container">
        <div className="main-body">
          <h2>Add Products Component</h2>
          <div className="form-main">
            <form onSubmit={handleSubmit}>
              {/* ------ emp_id--------- */}
              <div className="form-group ">
                <label htmlFor="" className='col-md-4'>Product Itemno </label>
                <input type="text"
                  className='form-control col-md-8'
                  name="product_itemno"
                  values={formValues.product_itemno}
                  placeholder="Product  Itcemno"
                  onChange={handleChange}
                />
                <div className="form-errors">
                  <p>{formErrors.product_itemno}</p>
                </div>


              </div>
              {/* ------ product name--------- */}
              <div className="form-group mb-3">
                <label htmlFor="">Name</label>
                <input type="text"
                  className='form-control'
                  name="product_name"

                  placeholder=" Name"
                  values={formValues.product_name}
                  onChange={handleChange}
                />
                <div className="form-errors">
                  <p>{formErrors.product_name}</p>
                </div>

              </div>
              {/* ------ category--------- */}
              <div className="form-group mb-3">
                <label className="form-label">Category </label>
                <select name="product_category" id="product_category "
                  className='form-select' onChange={handleSelectProductCategory}>
                  {
                    productCategoryList.map(
                      (productCategory) => (
                        <option value={productCategory.id}>{productCategory.category_name}</option>
                      )
                    )
                  }
                </select>
                <div className="form-errors">
                  <p>{formErrors.product_category}</p>
                </div>

              </div>
              {/* ------ wholesalePrice--------- */}
              <div className="field">
                <label htmlFor="">Wholesale</label>
                <input type="number" step={.01} maxLength={5}
                  className='form-control'
                  name="wholesale_price"

                  placeholder=" Wholesale Price"
                  values={formValues.wholesale_price}
                  onChange={handleChange}
                />
                <div className="form-errors">
                  <p>{formErrors.wholesale_price}</p>
                </div>

              </div>
              {/* ------ retail--------- */}
              <div className="field">
                <label htmlFor="">Wholesale</label>
                <input type="number" step={.01} maxLength={5}
                  className='form-control'
                  name="retail_price"

                  placeholder=" Retail Price"
                  values={formValues.retail_price}
                  onChange={handleChange}
                />
                <div className="form-errors">
                  <p>{formErrors.retail_price}</p>
                </div>


              </div>
              {/* ------ stock--------- */}
              <div className="field">
                <label htmlFor="">Stock</label>
                <input type="number" step={.01} maxLength={8}
                  className='form-control'
                  name="stock"
                  placeholder="stock"
                  values={formValues.stock}
                  onChange={handleChange}
                />
                <div className="form-errors">
                  <p>{formErrors.stock}</p>
                </div>
              </div>
              {/* ------ Photo--------- */}
              <div className="field">
                <label htmlFor="">Stock</label>
                <input type="file"

                  className='form-control'
                  name="image"
                  placeholder="image"
                  values={uploadedFiles}
                  onChange={handleFileChange}
                />
                <div className="form-errors">
                  <p>{formErrors.image}</p>
                </div>
              </div>


              <button type='submit'
                className='fluid btn btn-primary'
              >Submit</button>


            </form>
          </div>
          <div className='form-values'>
            {Object.keys(formErrors).length === 0 && isSubmit ?
              (
                <div className="ui message success">
                  data validated

                </div>

              ) : (
                <pre>

                  {JSON.stringify(formValues, undefined, 3)}
                </pre>

              )}
          </div>


        </div>

      </div>
    </>

  )
}

export default AddProducts
