import React from 'react'
import DashNavbarComp from '../DashNavbarComp';
import UploadDoc from '../UploadDoc'




function Profile() {
    document.title="Upload Papers"
    return(
        <>
            <DashNavbarComp />
            <UploadDoc />
        </>
    );
}


export default Profile;