import { Link, Outlet } from 'react-router-dom';
import { Fragment } from 'react';

import { Navbar, Nav } from 'react-bootstrap';

import PokeballIcon from '../../assets/Pokeball-Brand.png';

const Navigation = () => {
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/">
          <img src={PokeballIcon} alt="Pokeball Icon" style={{ height: '100%', width: '150px', padding: '30px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/pokedex">
              Pokedex
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
