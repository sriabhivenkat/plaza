import React, { useState, useEffect, useCallback, useContext } from 'react'
import './UploadDoc.css'
import Divider from '@material-ui/core/Divider';
import Form from 'react-bootstrap/Form'
import firebase from 'firebase/app';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import Chips from 'react-chips'
import FileUploader from 'react-firebase-file-uploader';
import {TextArea} from 'semantic-ui-react';
import {AuthContext} from '../components/navigation/AuthProvider.js'


const UploadDoc = ({history}) => {
    const [selectedTags, setSelectedTags] = useState([]);
    var regularArray = [];
    var tags = [];
    const [data, setData] = useState([]);
    const [abstract, setAbstract] = useState("");
    const [filePath, setFilePath] = useState("");
    const {currentUser} = useContext(AuthContext);
    const [urlpath, setUrlPath] = useState('');

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

    /*\
    const uploadForMe = useCallback(
        async event => {
            event.preventDefault();
            const {fileupload, abstract} = event.target.elements;
            try {
                await firebase
                        .storage()
                        .
            }
        },
        [history]
    );*/
    
    const onChangeFile = (e) => {
        let filename= currentUser.uid;
        const file = e.target.files[0];
        const {abstract} = e.target.elements;
        firebase.storage().ref(filename).putFile(file.name)
        .then(() => {
            console.log("Uploaded file!")
            setFilePath(file.path)
        })
        .then(() => {
            const storageRef = firebase.storage().ref(currentUser.uid);
            storageRef.getDownloadURL().then((url) => {
                setUrlPath(url)
                firebase
                    .firestore()
                    .collection("Users")
                    .doc(currentUser.uid)
                    .collection("my papers")
                    .set({
                        storagePath: urlpath,
                        tags: selectedTags,
                        abstract: abstract,
                    })
            }) 
        })
    }
    return (
        <div className="uploadcontainer">
            <div className="title">
                <h1>Upload a Paper</h1>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className="uploadstuff">
                <h1>Let's get started.</h1>
                <form onSubmit={onChangeFile}>
                    <div className="form">
                        <p>Step 1</p>
                        <h3>Upload a file</h3>
                        <input type="file" name="file"/>
                    </div>
                    <div className="form">
                        <p>Step 2</p>
                        <h3>Title your paper</h3>
                    </div>
                    <div className="form">
                        <p>Step 3</p>
                        <h3>Set keywords</h3>
                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                            <Chips 
                                value={selectedTags}
                                onChange={changeData}
                                suggestions={data}
                            />
                        </div>
                    </div>
                    <div className="form">
                        <p>Step 4</p>
                        <h3>Describe your paper</h3>
                        <h5>This can basically be your abstract.</h5>
                        <textarea 
                            placeholder="Describe your paper." 
                            style={{width: "80%"}}
                            name="abstract"
                            type="abstract"
                            onChange={(stringystring) => setAbstract(stringystring)}
                        >
                        </textarea>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default UploadDoc;