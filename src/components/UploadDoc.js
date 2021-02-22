import React from 'react'
import './UploadDoc.css'
import Divider from '@material-ui/core/Divider';
import Form from 'react-bootstrap/Form'

const UploadDoc = () => {

    return(
        <div className="uploadcontainer">
            <div className="title">
                <h1>Upload a Paper</h1>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className="uploadstuff">
                <h1>Let's get started.</h1>
                <div className="form">
                    <p>Step 1</p>
                    <h3>Upload a file</h3>
                </div>
            </div>
        </div>
    )
}


export default UploadDoc;