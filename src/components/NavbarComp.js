import React, {useState} from 'react';
import './Landing.css';
import Navbar from 'react-bootstrap/Navbar'
import './Navbar.css'



function NavbarComp() {
    return(
        <div>
                <Navbar bg="dark" variant="dark" className="mc-auto">
                    <Navbar.Brand href="/" className="brand">
                        Project Aurora
                    </Navbar.Brand>
                </Navbar>
        </div>
    );
}


export default NavbarComp;