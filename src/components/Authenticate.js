import React, {useState, useContext, useCallback} from 'react';
import './Authenticate.css';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from 'react-bootstrap';
import { signInWithGoogle } from '../firebase/firebase.utils';
import { auth } from '../firebase/firebase.utils';
import Button from 'react-bootstrap/Button'
import {AuthContext} from '../components/navigation/AuthProvider.js'
import firebase from 'firebase/app';
import { withRouter, Redirect } from 'react-router-dom';

const Authenticate = ({history}) => {
    const loginForMe = useCallback(
        async event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            try {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value)
                history.push("/dashboard");
            } catch (error) {
                console.log(error);
            }
        },
        [history]
    );

    const {currentUser} = useContext(AuthContext);

    if(currentUser) {
        return <Redirect to="/dashboard" />;
    }

    return(
        <div className="landingcontainerlogin">
            <div className="card">
                <h1 style={{textAlign: "center"}}>Log In</h1>
                <form onSubmit={loginForMe}>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <label>
                            <input name="email" type="email" placeholder="Email" />
                        </label>

                        <label>
                            <input name="password" type="password" placeholder="Password" />
                        </label>
                        <Button variant="dark" type="submit">Log In!</Button>
                    </div>
                </form>
                <Button variant="danger" onClick={signInWithGoogle} className="google"><i class="fa fa-google"></i> Sign In with Google</Button>
            </div>
        </div>
    )
}

export default withRouter(Authenticate);