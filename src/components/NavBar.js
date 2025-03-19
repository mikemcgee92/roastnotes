/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const searchQuery = encodeURIComponent(searchTerm.trim());
      window.location.href = `/?search=${searchQuery}`;
      setSearchTerm('');
    }
  };

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Link passHref href="/" className="navbar-brand">
          RoastNotes
        </Link>
        <Nav className="me-auto">
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
        <form onSubmit={handleSearch}>
          <input type="search" className=" px-2 py-1 text-purple-800 bg-purple-100 rounded-lg" placeholder="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </form>
        <Button onClick={signOut}>Sign Out</Button>
      </Container>
    </Navbar>
  );
}
