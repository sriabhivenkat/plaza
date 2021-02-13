import React, {useState} from 'react';
import './Landing.css';
import Navbar from 'react-bootstrap/Navbar'
import './Navbar.css'



function NavbarComp() {
    return(
        <>
            <div className="m-auto">
                <Navbar sticky="top" bg="light" variant="light" className="m-auto">
                    <Navbar.Brand href="/" style={{fontSize: 30, fontWeight:600, fontFamily: "Inter", textDecoration: "none", marginLeft: "45%", marginRight: "55%"}}>
                        Project Aurora
                    </Navbar.Brand>
                </Navbar>
            </div>
        </>
    );
}


export default NavbarComp;