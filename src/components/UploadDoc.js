import React, { useState, useEffect, useCallback, useContext } from 'react'
import './UploadDoc.css'
import Divider from '@material-ui/core/Divider';
import Form from 'react-bootstrap/Form'
import firebase from 'firebase/app';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import Icon from '@material-ui/core/Icon';
import Chips from 'react-chips'
import {AuthContext} from '../components/navigation/AuthProvider.js'
import Button from 'react-bootstrap/Button'
import {storage} from '../firebase/firebase.utils'

const UploadDoc = ({history}) => {
    const [selectedTags, setSelectedTags] = useState([]);
    var regularArray = [];
    var tags = [];
    const [data, setData] = useState([]);
    const [abstract, setAbstract] = useState("");
    const [title, setTitle] = useState("");
    const [titleText, setTitleText] = useState("");
    const [random, setRandom] = useState(0)
    const {currentUser} = useContext(AuthContext);

    //user information state variables
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [institutionval, setInstitution] = useState("");

    //render state variables
    const [submitButtonPressed, setSubmitButtonPressed] = useState(false);

    const [docName, setDocName] = useState("");

    const allInputs = {imgUrl: ''}
    const [pdfFile, setPdfFile] = useState("");
    const [pdfUrl, setPdfUrl] = useState("");

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

            const refValFirst = firebase.firestore().collection("Users").doc(currentUser.uid);
            const firstDoc = await refValFirst.get();
            const {firstName, lastName, institution} = firstDoc.data();
            setFirst(firstName);
            setLast(lastName);
            setInstitution(institution);

            setData(regularArray);
            console.log(regularArray);
        };
        main();
    }, [])

    const changeData = (chips) => {
        setSelectedTags(chips);
        console.log(selectedTags);
    }
    
    useEffect(() => {
        setRandom(Math.random().toString(36).substring(7))
    }, [])
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
    console.log(pdfFile)
    const handlePdfFile = (e) => {
        const pdf = e.target.files[0]
        setPdfFile(imageFile => (pdf))
    }
    const handleSubmit = event => {
        event.preventDefault();
        console.log("start of upload")
        const {text, abstract, eli5} = event.target.elements;
        if(pdfFile==="") {
            console.error(`You did not upload a PDF file. The file is a ${typeof(pdf)}`)
        }
        console.log("Let's move on to file upload and url creation")
        const uploadFile = storage.ref(`/paperFiles/${pdfFile.name}`).put(pdfFile)
        uploadFile.on('state_changed', 
            (snapShot) => {
                console.log(snapShot)
            }, (err) => {
                console.log(err)
            }, () => {
                storage.ref('paperFiles').child(pdfFile.name).getDownloadURL()
                    .then((pdfUrl1) => {
                        firebase
                        .firestore()
                        .collection("Users")
                        .doc(currentUser.uid)
                        .collection("my papers")
                        .doc(random)
                        .set({
                            title: text.value,
                            abstract: abstract.value,
                            easydesc: eli5.value,
                            pdfUrl1,
                            tags: selectedTags,
                            institution: institutionval
                        })
                        .then(() => {
                            firebase
                                .firestore()
                                .collection("Papers")
                                .doc(random)
                                .set({
                                    title: text.value,
                                    abstract: abstract.value,
                                    easydesc: eli5.value,
                                    pdfUrl1,
                                    tags: selectedTags,
                                    institution: institutionval,
                                    author: first+" "+last
                                })
                                
                        })
                    })
            }
        )
    }

    return (
        <div className="uploadcontainer">
            <div className="title">
                <h1 style={{color:"#ecdfcf"}}>Upload a Paper</h1>
            </div>
            <Divider orientation="vertical" flexItem />
            {submitButtonPressed===false &&
                <div className="uploadstuff">
                    <form onSubmit={handleSubmit}>
                        <div className="form">
                            <p>Step 1</p>
                            <h3>Upload a file</h3>
                            <input type="file" name="file" onChange={handlePdfFile}/>
                        </div>
                        <div className="form">
                            <p>Step 2</p>
                            <h3>Title your paper</h3>
                            <input 
                                type="text"
                                name="text"
                                id="text" 
                                style={{width: "80%"}}
                                onChange={(titleval) => {setTitleText(titleval)}}
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
                                id="abstract"
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
                            <input
                                placeholder="This can just be a super distilled, simple version of the main points your research paper hits." 
                                style={{width: "80%"}}
                                id="eli5"
                                name="eli5"
                                type="eli5"
                                onChange={(titlestring) => setTitle(titlestring)}
                            >
                            </input>
                        </div>
                        <div className="uploadButton">
                            <Button variant="dark" type="submit" className="uploadButton">Go live</Button>
                        </div>
                    </form>
                </div>
            }
            {submitButtonPressed===true &&
                <div className="oncePressed">
                    <Icon className="fa fa-check" style={{ color: "green", fontSize: 150}}/>
                    <h1>Your paper's live.</h1>
                </div>
            }
        </div>
    )
}


export default UploadDoc;