import React, { useState } from "react"
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../Services/Action/action";
const First = () => {
  const [data,setdata] = useState('this is updated state from first component');
  const [image,setImage] = useState([]);
  const dispatch = useDispatch()

  const sendData = () => {
      dispatch(addToCart(data))
  };
  
  return (
    <div>
      <h5>first page</h5>
      <Button onClick={sendData}>sendData</Button>
     
      
    </div>
  )
};

export default First;

