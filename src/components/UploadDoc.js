import React, { useState, useEffect } from 'react'
import './UploadDoc.css'
import Divider from '@material-ui/core/Divider';
import Form from 'react-bootstrap/Form'
import firebase from 'firebase/app';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import Chips from 'react-chips'

const UploadDoc = () => {
    const [selectedTags, setSelectedTags] = useState([]);
    var regularArray = [];
    var tags = [];
    const [data, setData] = useState([]);

    useEffect(() => {
        const main = async () => {
            const refValBims = firebase.firestore().collection("Categories").doc('biomedical-sciences');
            const bimsDoc = await refValBims.get();
            const { bims } = bimsDoc.data();
            for (var i = 0; i < bims.length; i++) {
                regularArray.push(bims[i]);
            }

            const refValCS = firebase.firestore().collection("Categories").doc('computer-science');
            const csDoc = await refValCS.get();
            const { compsci } = csDoc.data();
            for (var j = 0; j < compsci.length; j++) {
                regularArray.push(compsci[j]);
            }

            const refValEcon = firebase.firestore().collection("Categories").doc('economics');
            const econDoc = await refValEcon.get();
            const { econ } = econDoc.data();
            for (var z = 0; z < econ.length; z++) {
                regularArray.push(econ[z]);
            }

            const refValEducation = firebase.firestore().collection("Categories").doc('education');
            const educationDoc = await refValEducation.get();
            const { education } = educationDoc.data();
            regularArray.push(education[0])

            const refValOther = firebase.firestore().collection("Categories").doc("other");
            const otherDoc = await refValOther.get();
            const { other } = otherDoc.data();
            regularArray.push(other[0]);

            setData(regularArray);
            console.log(regularArray);
        };
        main();
    }, [])

    const changeData = (chips) => {
        setSelectedTags(chips);
        console.log(selectedTags);
    }

    return (
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
                    <Form>
                        <Form.File
                            id="custom-file"
                            label="Custom file input"
                            custom
                            style={{ width: "70%" }}
                        />
                    </Form>
                </div>
                <div className="form">
                    <p>Step 2</p>
                    <h3>Tag your paper</h3>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                        <Chips 
                            value={selectedTags}
                            onChange={changeData}
                            suggestions={data}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UploadDoc;