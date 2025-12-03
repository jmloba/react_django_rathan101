import React from 'react'
import { useState } from 'react';

const ImageUpload = () => {
    const [image, setImage] = useState('');

    function handleImageUpload(event) {
        setImage( event.target.files[0]);
        console.log('Selected file:', image);
        // Add your image upload logic here
    }
    function handleApi() {
        const formData = new FormData();
        formData.append('image', image);    
        // Make API call to upload the image
        console.log('Form Data to be sent:', formData);
    }   
        
  return (
    <>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button type='submit' onClick={handleApi}>Submit</button>
    </>
  )
}

export default ImageUpload