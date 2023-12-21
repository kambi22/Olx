import React from "react"
import {Button, Card} from 'react-bootstrap'
const Home = (props) => {
  console.log('props',props)
  return (
    <div className="m-auto tex-center" >
      <h5>Home component</h5>
      <Card className="shadow w-25 m-auto mt-5  text-center" >
        <h4>price:10,000</h4>
        <h4>brandd:oppo f9 fpro</h4>
        <div className="d-flex">
        <Button className="w-50 me-5 d-inline" onClick={
            ()=>{props.addToCartHeandler({price:10000,brand:'oppo f9 pro'})}
        }>ADD_TO_CART</Button>
     

        </div>
      </Card>
    </div>
  )
};


export default Home;
