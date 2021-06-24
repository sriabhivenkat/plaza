import React, { useState, useEffect, useCallback, useContext } from 'react';
import './PaperAuthorPage.css';
import DashNavbarComp from './DashNavbarComp.js';
import firebase from 'firebase/app';
import {AuthContext} from '../components/navigation/AuthProvider.js'
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import { Chip } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

const PaperAuthorPage = ({uid}) => {
    const [firstName, setFirstName] = useState('');
    const [first, setFirst] = useState('')
    const [institution, setInstitution] = useState("");
    const [researchPapers, setResearchPapers] = useState([]);
    const {currentUser} = useContext(AuthContext);
    let history = useHistory()
    useEffect(() => {
        const main = async() => {
            const userData = 
                firebase
                .firestore()
                .collection("Users")
                .doc(uid)
            const userDoc = await userData.get();
            const {name, institution, firstName} = userDoc.data();
            //console.log(name);
            //console.log(institution)
            //console.log("firstName is:", firstName)
            setFirstName(name)
            setInstitution(institution)
            setFirst(firstName)
        };
        main();
    }, [])

    useEffect(() => {
        const getPapers = async() => {
            const snapshot = await firebase.firestore().collection("Users").doc(uid).collection("my papers").get()
            setResearchPapers(snapshot.docs.map(doc => doc.data()))
            console.log(researchPapers) 
        }
        getPapers();
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
                    <div className="bestOf">
                        <h3 style={{color: "#ECDFCF", fontWeight: 200, fontSize: 20}}>{first}'s Papers</h3>
                        <div className="scrollView">
                            {researchPapers?.map((item) => {
        
                                //console.log("id is", item?.id)
                                function handleClick() {
                                    history.push(`/${item?.id}`)
                                }
                                return(
                                    <CardDeck>
                                        {/* <Link
                                            to={{
                                                pathname: `/${item.id}`
                                            }}
                                        > */}
                                            <Card 
                                                style={{height: 300, width: 400, backgroundColor: "#171e24", borderRadius: 25, marginRight: 30}}
                                                onClick={handleClick} 
                                                id="cardStyling"
                                            >
                                                <Card.Body>
                                                    <Card.Title style={{color: "#ECDFCF"}}><i>{item.title}</i></Card.Title>
                                                    <Card.Subtitle style={{color: "#ECDFCF", fontWeight: 200, fontSize: 17}}>{item.institution}</Card.Subtitle>
                                                    {item.easydesc!="" &&
                                                        <Card.Text style={{color: "#ECDFCF"}}>{item.easydesc}</Card.Text>
                                                    }
                                                    <div className="chips">
                                                        {item.tags?.map((x) => (
                                                            <Chip 
                                                                size="large"
                                                                label={x}
                                                                style={{
                                                                    marginRight: 5, 
                                                                    backgroundColor: "#ECDFCF", 
                                                                    marginBottom: 5,
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                    {/* {item.easydesc==="" &&
                                                        <Card.Text>suck my dick</Card.Text>
                                                    } */}
                                                </Card.Body>
                                            </Card>
                                        {/* </Link> */}
                                    </CardDeck>
                                )
                             })}
                        </div>
                    </div>
                    <div className="institution">
                        <h3 style={{color: "#ECDFCF", fontWeight: 200, fontSize: 20}}>Current Institution</h3>
                        <h4 style={{color: "#ECDFCF"}}>{institution}</h4>  
                    </div>
                    <div className="marketlink">
                        <h3 style={{color: "#ECDFCF", fontWeight: 200, fontSize: 20}}>MarketLink <span style={{fontSize: 15}}>by KASTech</span></h3>

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
