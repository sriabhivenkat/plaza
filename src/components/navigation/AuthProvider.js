import React, {useState, useEffect} from 'react';
import {createContext} from 'react';
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import firestore from 'firebase/firestore';
import { Card } from '@material-ui/core';
import { Gradient } from '@material-ui/icons';


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  if(pending){
    return(
      <div style={{height: "100%", width: "100%", background:"linear-gradient(red, blue)", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <h1>Loading</h1>
      </div> 
    )
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};