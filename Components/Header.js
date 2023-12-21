import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react"
import { Container, Nav, Navbar ,Badge} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { faBell, faHeart, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = (props) => {
    console.log('header stateData',props.stateData)
    console.log('header stateupdate',props.stateupdate)
  return (
    <div>
        
      <Navbar bg="info" variant="light" style={{height:'50px'}} sticky="top">
        <Container fluid>
         
        <div><FontAwesomeIcon icon={faBell}/><Badge className="bg-success"></Badge></div>
       
      
        </Container>
      </Navbar>
    </div>
  )
};

export default Header;
