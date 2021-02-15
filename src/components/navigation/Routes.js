import React, {useContext, useState, useEffect} from 'react';
import firebase from 'firebase/app';
import {AuthContext} from './AuthProvider.js';
import { Redirect } from 'react-router-dom';
import Home from '../pages/Home.js'

const Routes = () => {
    const {user, setUser} = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);


    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing==true) setInitializing(false);
    };


    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if(initializing) return null;

    return(
        <Route exact path="/">
            {user ? <Redirect to="/dashboard" /> : <Home />}
        </Route> 
    );
}

export default Routes;