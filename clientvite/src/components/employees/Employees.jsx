import React from 'react'
import { useState ,useContext,useEffect} from 'react'
import { AuthContext } from '../../AuthProvider';
import axiosInstance from '../../AxiosInstance';
import Button from '../Button'

const Employees = () => {
  const [list,setList] = useState([])
  const {isLoggedIn, setIsLoggedIn,theme,setTheme} = useContext(AuthContext)
  const config ={'responseType':'blob' }
    useEffect( 
      ()=>{
      const fetchProtectedData= async ()=>{
      try{
        const response = await axiosInstance.get('/employees/')
        setList(response.data)
        console.log('response fetching the data:',response.data)


      }catch(error){
        console.error ('\n error (fetchProtectedData )fetching data',error.response)

      }
    }
    fetchProtectedData();
    },[]
  )    


  return (
    <>
    <div className="container">
      <div className="main-body">
     <h1>Employees</h1>
     <div className="data-list">
      {
        list.map((employee)=>{
          return(
            <>
            <li key={employee.id}>
              <div className="card">
                <div className="img" >
                  <img className='card-img' src={employee.image} alt="" />
                </div>
                <div>

                  <p>Id: {employee.id}</p>
                  <p>Name: {employee.emp_name}</p>
                  <p>Email :{employee.email}</p>
                  <p>Department :{employee.deptname}</p>


                </div>

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

export default Employees