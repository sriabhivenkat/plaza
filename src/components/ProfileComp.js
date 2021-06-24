 import React, { useRef, useState, useEffect, useContext } from 'react';
import './Profile.css';
import firebase from 'firebase/app';
import { useFilePicker } from "use-file-picker";
import Image from 'react-bootstrap/Image'
import {AuthContext} from '../components/navigation/AuthProvider.js'
import { useUser } from '../lib/user';


const Profile = () => {
    const [uploading, setUploading] = useState(false);
    const [files, errors, openFileSelector] = useFilePicker({
        multiple: false,
        accept: ".png,.jpeg,.jpg"
    });
    const {user} = useUser(firebase.auth().currentUser.uid)
    if (errors.length > 0) return <p>Error! {errors}</p>;

    document.title = user?.firstName + "'s Profile"
    return (
        <div className="profilecontainer">
            <div
                onClick={() => openFileSelector()}
                className="pfpcontainer"
            >
            </div>
            <h3>{user?.firstName+" "+user?.lastName}</h3>
            <p>@{user?.handleval}</p>
            <p>{user?.emailval}</p>
            <div className="papers">
                <h4>My Papers</h4>

            </div>
        </div>
    )
}

export default Profile;