import React, {useState} from 'react';
import './Landing.css';
import Navbar from 'react-bootstrap/Navbar'
import './Navbar.css'
import Image from 'react-bootstrap/Image'
import faraday from '../assets/faraday.jpeg';

function NavbarComp() {
    return(
        <div>
                <Navbar bg="dark" variant="dark" className="justify-content-center">
                    <Navbar.Brand href="/" className="brand">
                        <Image 
                            src={faraday}
                            style={{height:50, width: 75}}
                        />
                    </Navbar.Brand>
                </Navbar>
        </div>
    );
}


export default NavbarComp;