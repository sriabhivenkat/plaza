import React, { useState, useEffect, useCallback, useContext } from 'react';
import './PaperAuthorPage.css';
import DashNavbarComp from './DashNavbarComp.js';
import firebase from 'firebase/app';


const PaperAuthorPage = ({uid}) => {
    const [firstName, setFirstName] = useState('');
    const [institution, setInstitution] = useState("");
    useEffect(() => {
        const main = async() => {
            const userData = 
                firebase
                .firestore()
                .collection("Users")
                .doc(uid)
            const userDoc = await userData.get();
            const {name, institution} = userDoc.data();
            setFirstName(name)
            setInstitution(institution)
        };
        main();
    }, [])
    return(
        <>
            <DashNavbarComp />
            <div className="authorContainer1">
                <div className="rowContainer1">
                    <h2 
                        style={
                            {
                                color: "#ECDFCF",
                                fontWeight: 100,
                                fontSize: 40
                            }
                        }>
                        This is
                    </h2>
                    <h1
                        style={
                            {
                                color: "#ECDFCF",
                                fontSize: 60
                            }
                        }
                    >
                        {firstName}
                    </h1>
                </div>
                <div className="rowContainer2">
                    <div className="institution">
                        <h3 style={{color: "#ECDFCF", fontWeight: 200, fontSize: 20}}>Current Institution</h3>
                        <h4 style={{color: "#ECDFCF"}}>{institution}</h4>  
                    </div>
                    <div className="researchFocuses">
                        <h3 style={{color: "#ECDFCF", fontWeight: 200, fontSize: 20}}>Research Focuses</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaperAuthorPage;
