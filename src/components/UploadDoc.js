import React, {useState, useEffect} from 'react'
import './UploadDoc.css'
import Divider from '@material-ui/core/Divider';
import Form from 'react-bootstrap/Form'
import Chip from '@material-ui/core/Chip';
import firebase from 'firebase/app';


const UploadDoc = () => {
    const [selectedTags, setSelectedTags] = useState([]);
    var regularArray = [];
    const [data, setData] = useState([]);

    useEffect(() => {
        const main = async() => {
            const refValBims = firebase.firestore().collection("Categories").doc('biomedical-sciences');
            const bimsDoc = await refValBims.get();
            const {bims} = bimsDoc.data();
            regularArray.push(bims);

            const refValCS = firebase.firestore().collection("Categories").doc('computer-science');
            const csDoc = await refValCS.get();
            const {compsci} = csDoc.data();
            regularArray.push(compsci);

            const refValEcon = firebase.firestore().collection("Categories").doc('economics');
            const econDoc = await refValEcon.get();
            const {econ} = econDoc.data();
            regularArray.push(econ);

            const refValEducation = firebase.firestore().collection("Categories").doc('education');
            const educationDoc = await refValEducation.get();
            const {education} = educationDoc.data();
            regularArray.push(education)

            const refValOther = firebase.firestore().collection("Categories").doc("other");
            const otherDoc = await refValOther.get();
            const {other} = otherDoc.data();
            regularArray.push(other);

            setData(regularArray);
        };
        main();
    }, [])
    const handleDelete = () => {
        console.log("suck my dick");
    };

    const handleClick = () => {
        console.log("suck my dick, part 2")
    }

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
                    <Form>
                        <Form.File 
                            id="custom-file"
                            label="Custom file input"
                            custom
                            style={{width: "70%"}}
                        />
                    </Form>
                </div>
                <div className="form">
                    <p>Step 2</p>
                    <h3>Tag your paper</h3>

                </div>
            </div>
        </div>
    )
}


export default UploadDoc;