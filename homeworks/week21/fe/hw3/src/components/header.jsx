import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Header = ({ handleChangePage }) => {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Navbar.Brand onClick={(e) => handleChangePage(e, '/')}>Blog</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link onClick={(e) => handleChangePage(e, 'about')}>About</Nav.Link>
        <Nav.Link onClick={(e) => handleChangePage(e, '/')}>List</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default Header;