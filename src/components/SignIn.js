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
        const {email, password, handle} = event.target.elements;
        try {
            await firebase 
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/dashboard");        
        } catch(e) {
            console.log(e);
        }
    }, [history])
    

    return(
        <div className="landingcontainer2">
            <div className="card">
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
                        <Button variant="dark" type="submit">Sign Up!</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default withRouter(SignIn);