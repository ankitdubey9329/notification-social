import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const Navbartop = () => {
    return (
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
}

export default Navbartop