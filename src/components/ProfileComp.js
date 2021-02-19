import React, {useRef, useState, useEffect} from 'react';
import './Profile.css';
import firebase from 'firebase/app';
import { useFilePicker } from "use-file-picker";
import Image from 'react-bootstrap/Image'

const Profile = () => {
    const [uploading, setUploading] = useState(false);
    const [files, errors, openFileSelector] = useFilePicker({
        multiple: false,
        accept: ".png,.jpeg,.jpg" 
    });

    const [first, setFirstName] = useState("");
    const [last, setLastName] = useState("");
    const [handle, setHandle] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
            const main = async() => {
            const docget = firebase
                .firestore()
                .collection("Users")
                .doc(firebase.auth().currentUser.uid);
            
            const doc = await docget.get();
            const {firstName} = doc.data();
            const {lastName} = doc.data();
            const {handleval} = doc.data();
            const {emailval} = doc.data();

            setFirstName(firstName);
            setLastName(lastName);
            setHandle(handleval);
            setEmail(emailval);
        };
        main();
    }, [])
    if (errors.length>0) return <p>Error! {errors}</p>;
    return(
        <div className="profilecontainer">
            <div
                onClick={() => openFileSelector()}
                className="pfpcontainer"
            >
            </div>
            <h3>{first+" "+last}</h3>
            <p>@{handle}</p>
            <p1>{email}</p1>
            <div className="background_img">
                <Image src="profilebackground.png" />
            </div>
        </div>
    )
}

export default Profile;