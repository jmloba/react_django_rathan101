import React from 'react'
import { useState ,useContext,useEffect} from 'react'
import { AuthContext } from '../../AuthProvider';
import axiosInstance from '../../AxiosInstance';
import Button from '../Button'
const Condo = () => {
  const [list,setList] = useState([])
  const {
    isLoggedIn, setIsLoggedIn,
    theme,setTheme,
     loggedInUser,setLoggedInUser

  } = useContext(AuthContext)
  // const config ={'responseType':'blob' }

  const handleDelete= async (id)=>{
    console.log('delete pressed', id)   
    try{
      const post = await axiosInstance.delete(`/condobill/${id}/`)
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
        const response = await axiosInstance.get('/condobill/')
        setList(response.data)
        console.log('response fetching the data condobill:',response.data)


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
      <p>user:{loggedInUser}</p>
      <div className="main-body">
        <h1>Condo Bills</h1>
        <div className="menu_option">
              <Button text='Add Condo Statement' 
              class=" btn-outline-primary" 
                url='/condo-add' /> 
        </div>
        <div className="data-list">
          {
            list.map((condo)=>{
              return(
                <>
                <div className="table-container">
   
                     
                </div>

                <div className="card" key={condo.id}>
                  <div className="card-body">
                    <div className="card-image-area">
                      <div className="card-img">
                        { condo.img_stmt && <img src={condo.img_stmt} alt="statement image" width="40" />}
                      </div>
                      <div className="card-img">
                        { condo.img_pymt && <img src={condo.img_pymt} alt="statement image" width="40" />}
                      </div>
                    </div>
             
                    <div className="card-details">
                      <p>id : {condo.id}</p>
                      <p>statement_date : {condo.statement_date}</p>
                      <p>Statement Amount: {condo.statement_amount}</p>
                      <p>Payment Date : {condo.payment_date}</p>
                      <p>Payment Ref : {condo.payment_ref}</p>
                      <p>Payment Amount : {condo.payment_amount}</p>
                  
                    </div>

                  <div className="card-action">
                       <button className='btn btn-danger ' 
                    onClick={()=>handleDelete( condo.id)}> Delete</button>
                  </div>
                 </div>
                </div>

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

export default Condo