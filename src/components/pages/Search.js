import React from 'react'
import DashNavbarComp from '../DashNavbarComp'
import SearchPapers from '../SearchPapers.js';

function Profile() {
    document.title="PaperSearch"
    return(
        <>
            <DashNavbarComp />
            <SearchPapers />
        </>
    );
}


export default Profile;