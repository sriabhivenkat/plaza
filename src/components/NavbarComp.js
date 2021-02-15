import React, {useState} from 'react';
import './Landing.css';
import Navbar from 'react-bootstrap/Navbar'
import './Navbar.css'



function NavbarComp() {
    return(
        <div className="m-auto">
                <Navbar bg="light" variant="light" className="m-auto">
                    <Navbar.Brand href="/" className="brand">
                        Project Aurora
                    </Navbar.Brand>
                </Navbar>
        </div>
    );
}


export default NavbarComp;