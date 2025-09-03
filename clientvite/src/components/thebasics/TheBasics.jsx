import React from 'react'
import {useState} from 'react'
import LearnProps from './LearnProps'
import "./thebasics.css"
import LearnEvents from './LearnEvents';
import LiftingStateUp from './LiftingStateUp';
import LearnUseState from './LearnUseState';
import LearnCounterApp from './LearnCounterApp';
import LearnUseEffects from './LearnUseEffects';
import LearnUseMemo from './LearnUseMemo';
import ChildA from './ChildA';

import { createContext } from 'react';
import LearnUseRef from './LearnUseRef';
import LearnCustomHooks from './LearnCustomHooks';
import LearnConditionalRendering from './LearnConditionalRendering';
import LearnMapFunctions from './LearnMapFunctions';
import LearnInLineCSS from './LearnInLineCSS';
import LearnForms from './LearnForms';

const StockContext = createContext()
const UserContext = createContext()



const TheBasics = () => {

  

  const name = 'Joshua';
  const [user,setUser] = useState({username:'rathan',email:'jj@xx.com'})
  const [isloggedin ,setIsloggedin] = useState(true)  
  
  const age = 15;
  const [data1, setData1] =useState('')
  const [stock,setStock]  = useState('')
  
  const getStock = (stock) =>{
    setStock(stock)
    console.log(stock)  

  }

  return (
    <>
    <div className='thebasics'>
      
      {/*  -------
            <LearnProps name={name} age = {age}/>
      <LearnEvents/>
      
      <div className="area2">
        <LiftingStateUp getStock={getStock}/>      
        {stock}
      </div>
      <LearnUseState/> 
      <LearnCounterApp/>
      <LearnUseEffects/>
      <LearnUseMemo/>
      <StockContext.Provider value={{name,age}} >
        <UserContext.Provider value ={{user,setUser}}  >
          <ChildA  />
        </UserContext.Provider>
        
      </StockContext.Provider>
       <LearnUseRef />
      <LearnCustomHooks/>      
      <LearnConditionalRendering/>
      <LearnMapFunctions/>
      <LearnInLineCSS/>
       ------   */}
       <LearnForms/>
   
       


      

      
    </div>
    </>
    
  )
}

export default TheBasics
export {StockContext,UserContext}




