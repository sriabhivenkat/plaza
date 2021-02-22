import React, {useState} from 'react';
import './Landing.css';
import Navbar from 'react-bootstrap/Navbar'
import './DashNavbarComp.css'
import {signOut} from '../firebase/firebase.utils';
import { Nav } from 'react-bootstrap';



function DashNavbarComp() {
    return(
        <div className="m-auto">
                <Navbar bg="dark" variant="dark" className="m-auto">
                    <Navbar.Brand href="/" style={{fontWeight: 500}}>
                        Project Aurora
                    </Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
                        <Nav.Link href="/upload">Upload</Nav.Link>
                        <Nav.Link href="/profile">My Profile</Nav.Link>
                        <Nav.Link onClick={signOut} className="linkStyling">Sign Out</Nav.Link>
                    </Nav>
                </Navbar>
        </div>
    );
}


export default DashNavbarComp;