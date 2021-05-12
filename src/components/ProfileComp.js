 import React, { useRef, useState, useEffect, useContext } from 'react';
import './Profile.css';
import firebase from 'firebase/app';
import { useFilePicker } from "use-file-picker";
import Image from 'react-bootstrap/Image'
import {AuthContext} from '../components/navigation/AuthProvider.js'



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
    const {currentUser} = useContext(AuthContext);
    useEffect(() => {
        const main = async () => {
            const docget = firebase
                .firestore()
                .collection("Users")
                .doc(firebase.auth().currentUser.uid);
            const doc = await docget.get();
            const { firstName } = doc.data();
            const { lastName } = doc.data();
            const { handleval } = doc.data();
            const { emailval } = doc.data();

            setFirstName(firstName);
            setLastName(lastName);
            setHandle(handleval);
            setEmail(emailval);

            const paperget = firebase
                .firestore()
                .collection("Users")
                .doc(currentUser.uid)
                .collection("my papers");
            const paperdoc = await paperget.get();
            console.log("this is paperdoc: ", paperdoc.docs);
        };
        main();
    }, [])
    if (errors.length > 0) return <p>Error! {errors}</p>;

    document.title = first + "'s Profile"
    return (
        <div className="profilecontainer">
            <div
                onClick={() => openFileSelector()}
                className="pfpcontainer"
            >
            </div>
            <h3>{first + " " + last}</h3>
            <p>@{handle}</p>
            <p>{email}</p>
            <div className="papers">
                <h4>My Papers</h4>

            </div>
        </div>
    )
}

export default Profile;