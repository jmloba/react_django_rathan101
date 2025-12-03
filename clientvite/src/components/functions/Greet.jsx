import React from 'react'

// export function Greet(title){
    // return (
    //     <>
    //     <div className="container text-center">
    //     <h2>Greet {title}</h2>  
    //     </div>
        
    //     </>

    // )
// }

export const Greet = (title)=>{
    console.log ('Greet function', title)
    return (
    <>
        <div className="container text-center">
        <h2>Greet {title}</h2>  
        </div>
        
    </>


    )
}
export function Greet2(title){
    var text = '**--**'
    var mgreet2 = title + text
    return mgreet2
}