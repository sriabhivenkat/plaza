import React, {useState, useContext, useCallback} from 'react';
import './Authenticate.css';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from 'react-bootstrap';
import { signInWithGoogle } from '../firebase/firebase.utils';
import { auth } from '../firebase/firebase.utils';
import Button from 'react-bootstrap/Button'
import {AuthContext} from '../App.js';
import {withRouter} from 'react-router';
import firebase from 'firebase/app';

function SignIn({history}) {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password, handle, first, last} = event.target.elements;
        try {
            await firebase 
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then(() => {
                        var uidval = firebase.auth().currentUser.uid;
                        firebase
                        .firestore()
                        .collection("Users")
                        .doc(uidval)
                        .set({
                            emailval: email.value,
                            handleval: handle.value,
                            firstName: first.value,
                            lastName: last.value,
                            uidvalue: uidval,
                        })
                })
                .then(() => {
                    var uidval = firebase.auth().currentUser.uid;
                    firebase
                    .firestore()
                    .collection("Users")
                    .doc(uidval)
                    .collection("my papers")
                    .doc("research paper 1")
                    .set({
                        authorFirst: "Jane",
                        authorLast: "Doe",
                        researchInstitution: "Texas A&M University, College Station",
                        researchTypes: ['computer science', 'artificial intelligence', 'cloud computing'],
                        researchReplicated: false,
                        researchReplicatedCount: 0,
                    })
                })
                .then(() => {
                    var uidval = firebase.auth().currentUser.uid;
                    firebase
                    .firestore()
                    .collection("Users")
                    .doc(uidval)
                    .collection("saved papers")
                    .doc("research paper 1")
                    .set({
                        authorFirst: "John",
                        authorLast: "Doe",
                        researchInstitution: "Texas A&M University, College Station",
                        researchTypes: ['biomedical sciences', 'computational biology', 'bioinformatics'],
                        researchReplicated: true,
                        researchReplicatedCount: 3,
                    })
                })
            history.push("/dashboard");        
        } catch(e) {
            console.log(e);
        }
    }, [history])
    return(
        <div className="landingcontainerregister">
            <div className="card2">
                <h1 style={{textAlign: "center"}}>Sign Up</h1>
                <form onSubmit={handleSignUp}>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <label>
                            <input name="email" type="email" placeholder="Email" />
                        </label>

                        <label>
                            <input name="password" type="password" placeholder="Password" />
                        </label>
                        
                        <label>
                            <input name="handle" type="handle" placeholder="Handle" />
                        </label>

                        <label>
                            <input name="first" type="first" placeholder="First name" autoCapitalize={true} />
                        </label>

                        <label>
                            <input name="last" type="last" placeholder="Last name" />
                        </label>
                        <Button variant="dark" type="submit">Sign Up!</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default withRouter(SignIn);