import { useState } from 'react'
import "../src/assets/css/generalcss.css"
import "../src/assets/css/var.css"
import Hello from './components/testfolder/Hello'
import TheBasics from './components/thebasics/TheBasics'
import Header from './components/maincomponents/Header'  
import MainBody from './components/maincomponents/Mainbody'
import Footer from './components/maincomponents/footer'
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import Main from './components/Main'

import Register from './components/Register'
import Login from './components/Login'
import AuthProvider from './AuthProvider'

import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './PrivateRoute'
import Books from './components/books/Books'
import BooksAdd from './components/books/BooksAdd'
import Employees from './components/employees/Employees'
import Students from './components/students/Students'
import StoreMaster from './components/storemaster/storemaster'
import Condo from './components/condo/Condo'
import CondoAdd from './components/condo/CondoAdd'
import SampleDataTable from './components/datatable/SampleDataTable'


function App() {

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />

          <Route path='/books' element={ <Books/> }/>
          <Route path='/books-add' element={ <BooksAdd/> }/>

          <Route path='/condobill' element={ <Condo/> }/>
          <Route path='/condo-add' element={ <CondoAdd/> }/>
          <Route path='/employees' element={ <Employees/> }/>
          
          
          <Route path='/students' element={ <Students/> }/>
          <Route path='/storemasterfile' element={ <StoreMaster/> }/>
          <Route path='/sampledatatable' element={ <SampleDataTable/> }/>
        </Routes>
        <Footer/>
      </BrowserRouter>

    </AuthProvider>

        
        
    </>
  )
}

export default App
