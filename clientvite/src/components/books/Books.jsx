import React from 'react'
import { useEffect,useState,useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import axiosInstance from '../../AxiosInstance';
import Button from '../Button'
import BooksAdd from './BooksAdd';
import {FetchPermissions} from '../permissions/FetchPermissions'

import { hasPermission } from '../functions/Permission'

const Books = () => {
  const [list,setList] = useState([])
  const {isLoggedIn, setIsLoggedIn,theme,setTheme} = useContext(AuthContext)
  const [permissions, setPermissions] = useState([]);
  const config ={'responseType':'blob' }

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

  useEffect( 
      ()=>{
      const fetchProtectedData= async ()=>{
      try{
        const response = await axiosInstance.get('/books/')
        setList(response.data)
        console.log('response fetching the data:',response.data)
      }catch(error){
        console.log('books', error.response.data)
        alert( error.response.data.detail  )
      }
    }
    fetchProtectedData();
    },[]
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
        
        <div className='data-list'>
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


        </div>
      </div>
    </div>
    </>
    
    


  )
}

export default Books