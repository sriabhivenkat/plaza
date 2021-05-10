import React, {useEffect} from 'react';
import Landing from '../Landing.js';
import NavbarComp from '../NavbarComp.js';
import ReactDOM from 'react-dom';

function LandingPage() {
    document.title="Plaza"
    return(
        <>
            <NavbarComp />
            <Landing />
        </>
    );
}


export default LandingPage;