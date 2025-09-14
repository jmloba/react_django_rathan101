import { useState } from 'react'
import "../src/assets/css/generalcss.css"
import "../src/assets/css/var.css"
import Hello from './components/testfolder/Hello'
import TheBasics from './components/thebasics/TheBasics'
import Header from './components/maincomponents/Header'  
import MainBody from './components/maincomponents/Mainbody'
import Footer from './components/maincomponents/footer'





function App() {

  return (
    <>
        <Header/>
        <MainBody/>
        <Footer/>

    </>
  )
}

export default App
