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



function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
        <Footer/>


      </BrowserRouter>

        
        
    </>
  )
}

export default App
