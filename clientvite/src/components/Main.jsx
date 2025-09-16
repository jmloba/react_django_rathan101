import React from 'react'
import Header from './maincomponents/Header'
import Footer from './maincomponents/footer'
import Button from './Button'


const Main = () => {
  return (
    
<>

<div className="container">
    <div className="p-5 text-center bg-light-dark">
        <h1 className="mb-3 h2">Welcome to React with Django</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas quasi aut asperiores, dolorum, earum natus omnis voluptatem numquam quam, corporis repudiandae officia facilis ipsam! Provident, veniam.</p>
        <Button text='Login xx' class='btn-info'/>
        </div>
        
</div>


</>

  )
}

export default Main