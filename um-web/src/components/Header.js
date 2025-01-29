import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Logo from './Logo';

const Header = () => {
  return (
    <Navbar expand="lg" className="navbar-dark bg-primary">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <Logo size="sm" />
          <span className="ms-2 font-weight-bold">User Management</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className="text-white">Home</Nav.Link>
            <Nav.Link href="#users" className="text-white">Users</Nav.Link>
            <Nav.Link href="#settings" className="text-white">Settings</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
