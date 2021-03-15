import React, {useState, useContext, useCallback} from 'react';
import './SignIn.css';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from 'react-bootstrap';
import { signInWithGoogle } from '../firebase/firebase.utils';
import { auth } from '../firebase/firebase.utils';
import Button from 'react-bootstrap/Button'
import {AuthContext} from '../App.js';
import {withRouter} from 'react-router';
import firebase from 'firebase/app';
import Card from 'react-bootstrap/Card'
import TextField from '@material-ui/core/TextField';

function SignIn({history}) {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password, handle, researchInstitution, first, last} = event.target.elements;
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
                            institution: researchInstitution.value,
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
            <Card style={{backgroundColor: "#171E24", borderRadius: "25px"}}>
                <Card.Body>
                    <Card.Title style={{textAlign: "center", color: "#ECDFCF"}}>Sign Up</Card.Title>
                    <form onSubmit={handleSignUp}>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <label style={{height: "20%"}}>
                                <TextField id="email" type="email" placeholder="Email" variant="outlined" style={{backgroundColor: "white", borderRadius: "7.5px"}}/>
                            </label>

                            <label>
                                <TextField id="password" type="password" placeholder="Password" variant="outlined" style={{backgroundColor: "white", borderRadius: "7.5px"}}/>
                            </label>
                            
                            <label>
                                <TextField id="handle" type="handle" placeholder="Handle" variant="outlined" style={{backgroundColor: "white", borderRadius: "7.5px"}} />
                            </label>

                            <label>
                                <TextField id="researchInstitution" type="researchInstitution" placeholder="Enter an institution" variant="outlined" style={{backgroundColor: "white", borderRadius: "7.5px"}}/>
                            </label>

                            <label>
                                <TextField id="first" type="first" placeholder="First name" autoCapitalize={true} variant="outlined" style={{backgroundColor: "white", borderRadius: "7.5px"}}/>
                            </label>

                            <label>
                                <TextField id="last" type="last" placeholder="Last name" variant="outlined" style={{backgroundColor: "white", borderRadius: "7.5px"}}/>
                            </label>
                            <Button variant="dark" type="submit">Sign Up!</Button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );
}


export default withRouter(SignIn);