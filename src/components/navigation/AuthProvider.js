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
      <div style={{height: "100vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column", backgroundColor: "#171E24"}}>
        <h1 style={{color: "#ECDFCF"}}>Loading</h1>
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