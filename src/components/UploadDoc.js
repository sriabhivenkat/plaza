import React, { useState, useEffect, useCallback, useContext } from 'react'
import './UploadDoc.css'
import Divider from '@material-ui/core/Divider';
import Form from 'react-bootstrap/Form'
import firebase from 'firebase/app';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import Chips from 'react-chips'
import {AuthContext} from '../components/navigation/AuthProvider.js'
import Button from 'react-bootstrap/Button'

const UploadDoc = ({history}) => {
    const [selectedTags, setSelectedTags] = useState([]);
    var regularArray = [];
    var tags = [];
    const [data, setData] = useState([]);
    const [abstract, setAbstract] = useState("");
    const [filePath, setFilePath] = useState("");
    const [title, setTitle] = useState("");
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
                <h1 style={{color:"#ecdfcf"}}>Upload a Paper</h1>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className="uploadstuff">
                    <div className="form">
                        <p>Step 1</p>
                        <h3>Upload a file</h3>
                        <input type="file" name="file" />
                    </div>
                    <div className="form">
                        <p>Step 2</p>
                        <h3>Title your paper</h3>
                        <input 
                            type="text" 
                            style={{width: "80%"}}
                            placeholder="Add a title"
                        >
                        </input>
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
                    <div className="form">
                        <p>Step 5</p>
                        <h3>ELI5</h3>
                        <h5>Explain it to me like I'm five.</h5>
                        <textarea 
                            placeholder="This can just be a super distilled, simple version of the main points your research paper hits. Remember, five-year-olds generally do not have a high attention span!" 
                            style={{width: "80%"}}
                            name="eli5"
                            type="eli5"
                            onChange={(titlestring) => setTitle(titlestring)}
                        >
                        </textarea>
                    </div>
                    <div className="uploadButton">
                        <Button variant="dark" onClick={() => {}} className="uploadButton">Go live</Button>
                    </div>
            </div>
        </div>
    )
}


export default UploadDoc;