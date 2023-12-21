import React, { useEffect, useState } from 'react';
import { app } from './firebase_config'; // Import your Firebase app instance
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function ImageUpload(e) {
  const [image, setImage] = useState(null);
   const [imageurl,setimageurl] = useState();
   
    const file = e.target.files[0];
    setImage(file);
 
    if (!image) return;

    const storage = getStorage(app);
    const storageRef = ref(storage, `images/${image.name}`);

    uploadBytes(storageRef,image)
    .then(()=>{console.log("successs")})
    .catch((error)=>{console.log('error',error)})

    getDownloadURL(storageRef)
    .then((url)=>{setimageurl(url);console.log('image url',url)})
    .catch((error)=>{console.log('error',error)})
  };


export default  ImageUpload;
