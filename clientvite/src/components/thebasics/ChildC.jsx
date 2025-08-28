import React from 'react'
import {StockContext, UserContext}  from '../thebasics/TheBasics'  
import { useContext } from 'react'


const ChildC = () => {
  const stockData = useContext(StockContext )
  const userData = useContext(UserContext)
  return (
    <>
      <div className='area1'>
        <div className="topic">
          <h4>ChildC</h4>
          {/* <StockContext.Consumer>
            {
              ({name,age})=> {
                return(
                  <>

                  <UserContext.Consumer>
                    {
                      ({user,setUser})=>{
                        return(
                          <>
                          <div>
                            <h4>from stock context</h4>
                            <p>Name : 
                              <span className='context-name'> {name}     </span>
                            </p>
                          </div>
                          <div>
                            <h4>from user context</h4>
                                   <p>User : 
                              <span className='context-name'> {user.username}     </span>
                            </p>
                          </div>
                          </>  
                        )
                      }
                }  
                  </UserContext.Consumer>
                  </>
                )
            }
          }
            
          </StockContext.Consumer> */}
          <p>Name : {stockData.name}</p>
          <p>Age : {stockData.age}</p>
          <p>username : {userData.user.username}</p>
          <p>Email : {userData.user.email}</p>
          

        </div>  
      </div>  
    </>
  )
}

export default ChildC