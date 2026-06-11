import React from 'react'
import { useEffect,useState,useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import axiosInstance from '../../AxiosInstance';
import Button from '../Button'
import BooksAdd from './BooksAdd';
import DataTable from 'react-data-table-component';
import { dataTableStyle } from '../functions/DataTableStyle';
import {FetchPermissions} from '../permissions/FetchPermissions'


import { hasPermission } from '../functions/Permission'

const Books = () => {
  const [list,setList] = useState([])
  const [records, setRecords] = useState(list)
  
  const {isLoggedIn, setIsLoggedIn,theme,setTheme} = useContext(AuthContext)
  const [permissions, setPermissions] = useState([]);
  const config ={'responseType':'blob' }
  const [search, setSearch] = useState('')

  const handleDelete= async (id)=>{
      console.log('delete pressed', id)
      try{
        const post = await axiosInstance.delete(`/books/${id}/`)
        console.log('respose post :',post)
        setList(list.filter( (p)=> p.id !==id  ))
      }catch(error){
        console.log(error)
      }
    }
  const columns = [
    {
      name: "#",
      selector: row => row.id,
      sortable: true

    }, {

      name: "Cover",
      selector: row => <img height={50} width={50}
        style={{
          borderRadius: '50%',
          justifyItems: 'center',
          alignItems: 'center',
          border: '2px solid #b06311ff'
        }}
        src={row.cover} />
    },
      {
      name: "title",
      selector: row => row.title,
      sortable: true

    },

  ]    

  useEffect( 
      ()=>{
      const fetchProtectedData= async ()=>{
      try{
        const response = await axiosInstance.get('/books/')
        setList(response.data)
        setRecords(response.data)
        console.log('response fetching the data:',response.data)
      }catch(error){
        console.log('books', error.response.data)
        alert( error.response.data.detail  )
      }
    }
    fetchProtectedData();
    },[]
  )    

   useEffect(() => {
      console.log('search value', search)
      const result = list.filter((item) => {
        return (item.title.toLowerCase().match(search.toLowerCase())
          
        )
      })
      setRecords(result)
  
  
    }, [search]
  
    )

  return (
    <>
    <div className='container'> 
      <div className="main-body">
        <h3>Books</h3>
        <div className="menu_option">
          { hasPermission('app_api.add_books') &&
          <Button text='Add Books' class=" btn-outline-primary" url='/books-add' /> 
}
        </div>
        <div>
          {isLoggedIn?(
            <div>
              <p>loggedin ***</p>
              {permissions}
            </div>
          ):
          (
            <div>
              <p>not --loggedin</p>
            </div>
          )
          }
        </div>
        <div className="data-table">
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
              actions={
                <>

                  {/* <button className='btn btn-success' onClick={handleExportToPdf}>Export to Pdf</button>
                  <button className='btn btn-success' onClick={handleExportToCsv}> Export to Csv</button>
                  <button className='btn btn-success' onClick={handleExportToExcel}> Export to Excel</button>
                  {hasPermission('app_products.add_products') &&
                    <button className='btn btn-primary ' onClick={handleAddProduct}> Add Product</button>
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
        
        {/* <div className='data-list'>
          {
            list.map((book, index)=>{
              return(
                <>
                <li key={book.id}>
                  <div className='card'>
                    <img className='img-books ' src={book.cover} alt='image'/>
                    <p>Index : <span>{index}</span>
                    </p>
                    <p>book id : {book.id}</p>
                    <p>title :{book.title}</p>
                    <button className='btn btn-danger ' 
                    onClick={()=>handleDelete(book.id)}> Delete</button>
             
                  </div>

                </li>
                </>
              )
            })
          }


        </div> */}
      </div>
    </div>
    </>
    
    


  )
}

export default Books