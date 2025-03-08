/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Link passHref href="/" className="navbar-brand">
          RoastNotes
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link className="nav-link" href="/">
              home
            </Link>
            <Link className="nav-link" href="/coffees">
              saved
            </Link>
            <Link className="nav-link" href="/coffees/new">
              +add
            </Link>
          </Nav>
          <input type="search" className=" px-2 py-1 text-purple-800 bg-purple-100 rounded-lg" placeholder="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <Button onClick={signOut}>Sign Out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
