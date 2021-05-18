import React, {useState} from 'react';
import './Landing.css';
import Navbar from 'react-bootstrap/Navbar'
import './DashNavbarComp.css'
import {signOut} from '../firebase/firebase.utils';
import { Nav } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import faraday from '../assets/faraday.jpeg';
import { Link } from 'react-router-dom';


function DashNavbarComp() {
    return(
        <div className="m-auto">
                <Navbar bg="dark" variant="dark" className="m-auto">
                    <Link to="/">
                        <Navbar.Brand href="/" className="brand">
                            <Image 
                                src={faraday}
                                style={{height:50, width: 75}}
                            />
                            Plaza
                        </Navbar.Brand>
                    </Link>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to='/dashboard'>Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/upload">Upload</Nav.Link>
                        <Nav.Link as={Link} to="/search">Search</Nav.Link>
                        <Nav.Link as={Link} to="/profile">My Profile</Nav.Link>
                        <Nav.Link onClick={signOut} className="linkStyling">Sign Out</Nav.Link>
                    </Nav>
                </Navbar>
        </div>
    );
}


export default DashNavbarComp;