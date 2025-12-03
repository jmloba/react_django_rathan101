import React from 'react'
import Button from '../Button'
import { Link } from 'react-router-dom'

import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../AuthProvider'
import { useNavigate } from 'react-router-dom'
import { hasPermission } from '../functions/Permission'




const navbar001 = () => {
  const {
    isLoggedIn, setIsLoggedIn,
    email, setEmail,
    theme, setTheme,
    loggedInUser, setLoggedInUser,
    permissions, setPermissions

  } = useContext(AuthContext)

  const navigate = useNavigate()
  const data = permissions
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('permissions')
    localStorage.removeItem('loggedInUser')
    localStorage.removeItem('userId')
    localStorage.removeItem('user_id')
    localStorage.removeItem('email')  


    setIsLoggedIn(false)
    console.log('logout pressed')
    navigate('/login')
  }


  console.log('test  -->> ', hasPermission("app_api.view_books"));

  return (
    <>

      <nav className="navbar navbar-expand-lg bg-white border-bottom box-shadow">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src='/icons/project.png' alt='logo' width="30" className='me-2' />
            My Project
          </Link>
          <button className="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isLoggedIn ?
                (
                  <>
                    <div className="nav-loggedin">
                      <div className="nav-split" />
                      <li className="nav-item"><Link className="nav-link text-dark" aria-current="page" to="/">Home</Link></li>
                      {/* books                   */}
                      <li className="nav-item dropdown">
                        <Link className="nav-link  text-dark dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Books
                        </Link>
                        <ul className="dropdown-menu">
                          {hasPermission("app_api.view_books") &&
                            <li><Link className="dropdown-item" to="/books">Books</Link></li>
                          }
                          {hasPermission("app_api.add_books") &&
                            <li><Link className="dropdown-item" to="/books-add">Add Books </Link></li>
                          }

                          <li><hr className="dropdown-divider" /></li>
                          <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                        </ul>
                      </li>
                      {/*employee dropdown       */}
                      <li className="nav-item dropdown">
                        <a className="nav-link  text-dark dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Employee
                        </a>
                        <ul className="dropdown-menu">
                            {hasPermission("app_employees.view_employee") &&
                          <li><Link className="dropdown-item" to="/employees">Employee list -using datatable ('/employees')</Link>  </li>
                            }
                            {hasPermission("app_employees.add_employee") &&
                          <li><Link className="dropdown-item" to="/employee-add">Add Employees </Link></li>
                            }
                          <li><hr className="dropdown-divider" /></li>
                        </ul>
                      </li>
                      {/*condo dropdown       */}
                      <li className="nav-item dropdown">
                        <Link className="nav-link  text-dark dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Condo
                        </Link>
                        <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" to="/condobill">Condo</Link></li>
                          <li><Link className="dropdown-item" to="/condobill1">Condo1 - modal not finished </Link></li>
                          <li><Link className="dropdown-item" to="/condobill2">Condo2  - modal not finished</Link></li>
                          <li><hr className="dropdown-divider" /></li>
                          <li><Link className="dropdown-item" to="/condo-add">CondoAdd</Link></li>
                        </ul>
                      </li>
                      {/* Student dropdown       */}
                      <li className="nav-item dropdown">
                        <Link className="nav-link  text-dark dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Student  </Link>
                        <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" to="/student">Student</Link></li>

                        </ul>
                      </li>


                      {/*Products dropdown       */}
                      <li className="nav-item dropdown">
                        <Link className="nav-link  text-dark dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Products
                        </Link>
                        <ul className="dropdown-menu">
                          {hasPermission("app_products.view_products") &&
                            <li><Link className="dropdown-item" to="/products">Products</Link></li>
                          }
                          <li><hr className="dropdown-divider" /></li>

                          {/* { hasPermission("app_products.add_products")  &&
                          <li><Link className="dropdown-item" to="/products-invoice-entry">Product InvoiceEntry</Link></li>
                          }
                          <li><Link className="dropdown-item" to="/sales-summary">Sales Summary(SalesEntries)</Link></li>
                          <li><hr className="dropdown-divider" /></li> */}

                          {hasPermission("app_products.add_products") &&
                            <li><Link className="dropdown-item" to="/invoiceentry-001">Product InvoiceEntry</Link></li>

                          }

                          <li><Link className="dropdown-item" to="/invoice-summary">Invoice Summary</Link></li>

                        </ul>
                      </li>

                      {/* Tutorials dropdown         */}
                      <li className="nav-item dropdown">
                        <Link className="nav-link    text-dark dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Tutorials
                        </Link>
                        <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" to="/tutorDashboard/spread_operator">Spread Operator</Link></li>
                          <li><Link className="dropdown-item" to="/tutorDashboard/formdropdown">Dropdown</Link></li>
                          <li><hr className="dropdown-divider" /></li>
                          <li><Link className="dropdown-item" to="/tutor/yousaf/ex-formentry">Ex Form Entry - by Yousav</Link></li>
                          <li><Link className="dropdown-item" to="/books">View Books</Link></li>
                          <li><hr className="dropdown-divider" /></li>
                          <li><Link className="dropdown-item" to="/callafunction">Call a Function</Link></li>

                        </ul>
                      </li>


                    </div>
                    <div className="nav-split">

                    </div>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-dark" to="#">Contact</Link>

                    </li>

                  </>
                )}

            </ul>

            <ul className='navbar-nav '>

              <li className="nav-item dropdown">
                <a className="nav-link    text-dark dropdown-toggle"
                  href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Admin Sample
                </a>
                <ul className="dropdown-menu">
                  {isLoggedIn ? (
                    <>
                      <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                      <li><a className="dropdown-item" href="#">Another action</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item" href="#">Something else here</a></li>

                      <li className="nav-item">
                        <button className='btn btn-outline-danger' onClick={handleLogout}> Logout</button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li><a className="dropdown-item" href="#">Something else here</a></li>
                      <li className="nav-item">
                        <Button text='Login' class='btn-outline-info' url='login' />
                      </li>
                      <li className="nav-item">
                        <Button text='Register' class='btn-info' url='/register' />
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      {/* <div className='container'>
        <p>{isLoggedIn?'user is loggedin':'not logged in'} </p>
        <p>email {email}</p>
        <ul>
        {Object.entries(permissions).map(([key, value]) => (
          <li key={key}>
            <p><strong>{key}:</strong> {value}</p>
            
          </li>
        ))}

        </ul>
        
        
      </div>
    */}

    </>

  )
}

export default navbar001