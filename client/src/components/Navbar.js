import React,{useContext,useEffect} from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { userContext } from '../context/userContext'
import axios from "axios"
import { useLocation } from 'react-router-dom'
const Navbartop = () => {

  const {pathname}=useLocation();

  const {user,setUser} =useContext(userContext);

  useEffect(() => {

    if(user!==null){
      axios.post("http://localhost:5000/user",{
        "userid":localStorage.getItem('userid')
      })
      .then(res=>setUser(res.data))
    }
    
  }, [user,pathname])

  let returnData;
  if(user===null){

    returnData=(
      <Navbar bg="light" expand="lg">
      <LinkContainer to="/">
<Navbar.Brand>Home</Navbar.Brand>
</LinkContainer>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
<Nav className="mr-auto">
  <LinkContainer to="/login">
<Nav.Link>Login</Nav.Link>
</LinkContainer>
<LinkContainer to="/signup">
<Nav.Link>Signup</Nav.Link>
</LinkContainer>
</Nav>
</Navbar.Collapse>
</Navbar>
    )

  }else{

    returnData=(

      <Navbar bg="light" expand="lg">
      <LinkContainer to="/">
<Navbar.Brand>Home</Navbar.Brand>
</LinkContainer>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
<Nav className="mr-auto">
  <LinkContainer to="/profile">
<Nav.Link>profile</Nav.Link>
</LinkContainer>
<LinkContainer to="/newpost">
<Nav.Link>NewPost</Nav.Link>
</LinkContainer>
<LinkContainer to="/following">
<Nav.Link>following</Nav.Link>
</LinkContainer>
<LinkContainer to="/likes">
<Nav.Link>liked posts</Nav.Link>
</LinkContainer>
<LinkContainer to="/notifications">
<Nav.Link>notifications[{user.notifications.length}]</Nav.Link>
</LinkContainer>


<a onClick={()=>(
  setUser(null),
  localStorage.removeItem("userid")
)}>
log out
</a>
</Nav>
</Navbar.Collapse>
</Navbar>



    )

  }
    return (

      returnData
    
    )
}

export default Navbartop