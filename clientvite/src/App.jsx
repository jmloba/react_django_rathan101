import { useState } from 'react'

import "../src/assets/css/var.css"

import "../src/assets/css/generalcss.css"



import Hello from './components/testfolder/Hello'
import TheBasics from './components/thebasics/TheBasics'
import Header from './components/maincomponents/Header'
import MainBody from './components/maincomponents/Mainbody'
import Footer from './components/maincomponents/footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './components/Main'

import Register from './components/Register'
import Login from './components/Login'
import AuthProvider from './AuthProvider'

import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './PrivateRoute'
import Books from './components/books/Books'
import BooksAdd from './components/books/BooksAdd'




import StoreMaster from './components/storemaster/storemaster'
import SampleDataTable from './components/datatable/SampleDataTable'


import Condo        from './components/condo/Condo'
import CondoAdd     from './components/condo/CondoAdd'
import Condo1       from './components/condo/Condo1'
import Condo2       from './components/condo/Condo2'

import AddStudent   from './components/students/AddStudent'
import ViewStudent  from './components/students/ViewStudent'
import EditStudent  from './components/students/EditStudent'
import Students     from './components/students/Students'
import Employees      from './components/employees/Employees'

import ArinEmployees  from './components/employees_byArin/ArinEmployees'

import TutorDashboard from './components/dashboard/tutorDashboard'
import TutorForm001 from './components/tutorials/TutorForm001'
import TutorFormDropdown from './components/tutorials/TutorFormDropdown'
import EmployeesVer2 from './components/employees_ver2/EmployeesVer2'
import TutorUseEffect from './components/tutorials/TutorUseEffect'

import Contacts from './components/otherpages/Contacts'

import BosstMyTool_Employee       from './components/byboostmytool/BosstMyTool_Employee'
import BoostMyTool_AddEmployee    from './components/byboostmytool/BoostMyTool_AddEmployee'
import DipeshMalvia_AddEmployee   from './components/byboostmytool/DipeshMalvia_AddEmployee'
import DipeshMalvia_EditEmployee  from './components/byboostmytool/DipeshMalvia_EditEmployee'

import SpreadOperator01 from './components/spreadoperator/SpreadOperator01'

import Products     from './components/products/products'
import AddProducts  from './components/products/AddProducts'
import EditProducts from './components/products/EditProducts'
import ProductInvoiceEntry from './components/products/ProductInvoiceEntry'


import YousafFormEntry from './components/tutorials/codeWithYousaf/YousafFormEntry'
import SalesSummary from './components/products/SalesSummary'


function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

            <Route path='/books' element={<Books />} />
            <Route path='/books-add' element={<BooksAdd />} />

            <Route path='/condobill' element={<Condo />} />

            <Route path='/condobill1' element={<Condo1 />} />
            <Route path='/condobill2' element={<Condo2 />} />
            <Route path='/condo-add' element={<CondoAdd />} />
            {/* <Route path='/contacts' element={ <Contacts/> }/> */}

            <Route path='/products' element={<Products />} />
            <Route path='/addproduct' element={<AddProducts />} />
            <Route path='/editproduct/:id' element={<EditProducts />} />
            <Route path='/products-invoice-entry' element={<ProductInvoiceEntry/>} />
            <Route path='/sales-summary' element={<SalesSummary/>} />

            <Route path='/employees' element={<Employees />} />
            <Route path='/employees-ver2' element={<EmployeesVer2 />} />

            <Route path='/boostmytool-employee' element={<BosstMyTool_Employee />} />
            <Route path='/boostmytool-addemployee' element={<BoostMyTool_AddEmployee />} />

            <Route path='/dipeshmalvia-addemployee' element={<DipeshMalvia_AddEmployee />} />
            <Route path='/dipeshmalvia-editemployee/:id' element={<DipeshMalvia_EditEmployee />} />

            <Route path='/employees' element={<Employees />} />
            <Route path='/arin-employees' element={<ArinEmployees />} />

            <Route path='/student' element={<Students />} />
            <Route path='/student-add' element={<AddStudent />} />
            <Route path='/student/view/:studentid' element={<ViewStudent />} />
            <Route path='/student/edit/:studentid' element={<EditStudent />} />

            <Route path='/storemasterfile' element={<StoreMaster />} />
            <Route path='/sampledatatable' element={<SampleDataTable />} />

            <Route path='/tutorDashboard' element={<TutorDashboard />} />
            <Route path='/tutorDashboard/form001' element={<TutorForm001 />} />
            <Route path='/tutorDashboard/formdropdown' element={<TutorFormDropdown />} />
            <Route path='/tutorDashboard/spread_operator' element={<SpreadOperator01 />} />

            <Route path='/tutorDashboard/useEffect' element={<TutorUseEffect />} />
            
            <Route path='/tutor/yousaf/ex-formentry' element={<YousafFormEntry />} />


          </Routes>
          <Footer />
        </BrowserRouter>

      </AuthProvider>



    </>
  )
}

export default App
