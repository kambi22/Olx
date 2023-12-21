import React, { useState } from "react"
import { Button } from "react-bootstrap";
import First from "./first";
import { useSelector } from "react-redux";
 function Second(props){
  const Getstate= useSelector((state)=>state.cardItems.stateData)

   // const [image,setimage] = useState();
    //const fileheadler = (e) => {
       //const file = [e.target.files[0]]
      // console.log('file is ',file)
      // setimage(file)
   // };

 console.log('get state',Getstate)
  return (
    <div>
      <h5>Second Component</h5>
    

    <p>Thsi is state data from redux store value is :{Getstate}</p>
   
    </div>
  )
  }
  export default Second;