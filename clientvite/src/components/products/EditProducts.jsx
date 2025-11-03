import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams, } from 'react-router-dom'
import axiosInstance from '../../AxiosInstance'
import Form from 'react-bootstrap/Form';

const EditProducts = () => {
  const params = useParams()
  const [initialData, setInitialData] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const navigate = useNavigate()
  const initialValues = {
    product_itemno: "",
    product_name: "",
    product_category: "1",
    wholesale_price: '2',
    retail_price: '',
    stock: '',
    image: null,
  }
  const [formErrors, setFormErrors] = useState({})  // empty object
  const [formValues, setFormValues] = useState(initialData)
  const [productCategoryList, setProductCategoryList] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    // Access the selected files via event.target.files
    setUploadedFiles(e.target.files[0])
    const { name, value } = e.target;
    const files = e.target.files[0];
    console.log('files selected are ', files)

    setFormValues({ ...formValues, [name]: value })


  };
  const handleChange = (e) => {
    e.preventDefault()
    console.log('handle change input fields', e.target)
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value })
    console.log('handleChange-form values are : ', formValues)
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


  useEffect(
    () => {
      const fetchEditProtectedData = async () => {
        try {
          // record
          const response = await axiosInstance.get('/products/' + params.id)
          setInitialData(response.data)
          setFormValues(response.data)

          console.log('useEffect edit record :', response.data)

        } catch (error) {
          console.log('\n error (fetchProtectedData )fetching gender', error.response)
        }
      }
      fetchEditProtectedData();
    }, []
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

  const saveData = async () => {
    if (Object.keys(formErrors).length === 0) {
      console.log('ready to save data')
      console.log('form errors length is zero : -> save procedure', Object.keys(formErrors).length === 0)
      const formData = new FormData()
      // formData.append('id', params.id)
      formData.append('product_itemno', formValues.product_itemno)
      formData.append('product_name', formValues.product_name)
      formData.append('product_category', formValues.product_category)
      formData.append('wholesale_price', formValues.wholesale_price)
      formData.append('retail_price', formValues.retail_price)
      formData.append('stock', formValues.stock)

      if(uploadedFiles.length !== 0){
        formData.append('image',uploadedFiles)
      }
      
      
      const dataToSave = Object.fromEntries(formData.entries());
      console.log('entries in formData',dataToSave);

      try {
      const response = await axiosInstance.put(`/products/${params.id}/`, formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
      // clear errors
      navigate('/products')

    } catch (error) {
      

      console.log('There was an error!', error.response.data.product_itemno
      );

    }


    }
    else {
      console.log('saving ignored .... ', Object.keys(formErrors))

    }


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
  return (
    <>
      <div className="container">
        <div>Edit Products</div>
        <div className="form-main">
          <div className="field">
            <label htmlFor="">Id</label>
            <input type="text"
              className='form-control-plaintext'
              defaultValue={params.id}
              readonly
            />
          </div>
          {initialData &&
            <div className="form-main">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="row">
                    {/* ------ emp_id--------- */}
                    <div className="mb-3 col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Product Itemno </label>
                        <input type="text"
                          className='form-control'
                          name="product_itemno"
                          values={formValues.product_itemno}
                          placeholder="Product  Itcemno"
                          defaultValue={initialData.product_itemno}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-errors">
                        <p>{formErrors.product_itemno}</p>
                      </div>
                    </div>
                    {/* ------ product name--------- */}
                    <div className="form-group col-md-6" >
                      <label htmlFor="">Name</label>
                      <input type="text"
                        className='form-control'
                        name="product_name"

                        placeholder=" Name"
                        defaultValue={initialData.product_name}
                        values={formValues.product_name}
                        onChange={handleChange}
                      />
                      <div className="form-errors">
                        <p>{formErrors.product_name}</p>
                      </div>

                    </div>

                  </div>
                  <div className="row">
                    {/* ------ wholesalePrice--------- */}
                    <div className="form-group col-md-6">
                      <label htmlFor="">Wholesale</label>
                      <input type="number" step={.01} maxLength={5}
                        className='form-control'
                        name="wholesale_price"

                        placeholder=" Wholesale Price"

                        defaultValue={initialData.wholesale_price}
                        values={formValues.wholesale_price}
                        onChange={handleChange}
                      />
                      <div className="form-errors">
                        <p>{formErrors.wholesale_price}</p>
                      </div>

                    </div>
                    {/* ------ retail--------- */}
                    <div className="form-group col-md-6">
                      <label htmlFor="">Retail</label>
                      <input type="number" step={.01} maxLength={5}
                        className='form-control'
                        name="retail_price"

                        placeholder=" Retail Price"
                        defaultValue={initialData.retail_price}
                        values={formValues.retail_price}
                        onChange={handleChange}
                      />
                      <div className="form-errors">
                        <p>{formErrors.retail_price}</p>
                      </div>


                    </div>
                  </div>

                  <div className="row">
                    {/* ------ category--------- */}
                    <div className="form-group col-md-6">
                      <label className="form-label">Category </label>
                      <select name="product_category" id="product_category"
                        defaultValue={initialData.product_category}

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

                    {/* ------ stock--------- */}
                    <div className="form-group col-md-6">
                      <label htmlFor="">Stock</label>
                      <input type="number" step={.01} maxLength={8}
                        className='form-control'
                        name="stock"
                        placeholder="stock"
                        defaultValue={initialData.stock}
                        values={formValues.stock}
                        onChange={handleChange}
                      />
                      <div className="form-errors">
                        <p>{formErrors.stock}</p>
                      </div>
                    </div>
                  </div>






                  {/* ------ display image--------- */}
                  <div className="row justify-content-center " >
                    {/* photo entry */}
                    <div className="image-row col-md-3 ">
                      <label className="col-sm-4 col-form-label"> Previous </label>
                      <div className=" offset-sm-4 col-sm-8">
                        <img src={initialData.image} alt="..."
                          width={"80"}
                        />
                      </div>
                    </div>
                    {/* photo entry */}
                    <div className="image-row col-md-8 ">
                      <div className="field">
                        <label htmlFor="">Select Photo</label>
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
                    </div>
                  </div>
                </div>
                <div className="row">
                  <button type='submit' className='btn btn-primary' >Submit</button>
                </div>
              </form>
            </div>
          }
          <div className='form-values'>
            {Object.keys(formErrors).length === 0 && isSubmit ?
              (
                <div className="ui message success">
                  data validated
                  <pre>
                    {JSON.stringify(formValues, undefined, 3)}
                  </pre>


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

export default EditProducts