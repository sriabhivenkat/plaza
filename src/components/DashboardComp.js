import React, {useState, useEffect} from 'react'
import './DashboardComp.css';
import firebase from 'firebase/app';
import { FormControl } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import { useUser } from '../lib/user';


const DashboardComp = () => {
    const [first, setFirstName] = useState("");
    const [last, setLastName] = useState("");
    const {user} = useUser(firebase.auth().currentUser.uid)
    
    //const searchforshit=useCallback(async event => {
    console.log(user?.firstName)
    //}, [])
    document.title=user?.firstName+"'s Dashboard"
    return(
        <div className="mainDashContainer">
            <div className="dashcontainer">
                <h4>Welcome to Plaza, {user?.firstName}.</h4>
            </div>
            <div className="dashcontainer2">
                <CardDeck>
                    <Card 
                        style={{ 
                            width: "23rem", 
                            height: "25rem",
                            marginRight: "5%", 
                            overflowY: "none", 
                            backgroundColor: "#171e24", 
                            display: "flex", 
                            textAlign: "center", 
                            borderRadius: "25px", 
                            boxShadow: "0 0 5px 5px lightgray", 
                            position: "relative",
                            cursor: "pointer"
                        }}
                        onClick = {() => {
                            window.location.href = `/curated`
                        }}    
                    >
                        <Card.Body style={{marginTop: 20}}>
                            <Card.Title style={{fontSize: "35px", color: "#ECDFCF"}} numberOfLines={1}>Curated</Card.Title>
                            <Card.Subtitle style={{color: "#ECDFCF"}}>Papers. Just for you.</Card.Subtitle>
                            <Card.Link href="/curated" style={{position: "absolute", bottom: "10%", left: "40%", color: "#ECDFCF"}}>Teleport!</Card.Link>
                        </Card.Body>
                    </Card>
                    <Card 
                        style={{ 
                            width: "23rem", 
                            height: "25rem",
                            marginRight: "5%", 
                            overflowY: "none", 
                            backgroundColor: "#171e24", 
                            display: "flex", 
                            textAlign: "center", 
                            borderRadius: "25px", 
                            boxShadow: "0 0 5px 5px lightgray", 
                            position: "relative",
                            cursor: "pointer"
                       }}
                       onClick = {() => {
                           window.location.href = '/pastreads'
                       }}
                    >
                        <Card.Body style={{marginTop: 20}}>
                            <Card.Title style={{fontSize: "35px", color: "#ECDFCF"}} numberOfLines={1}>Past Reads</Card.Title>
                            <Card.Subtitle style={{color: "#ECDFCF"}}>Refer to a past paper.</Card.Subtitle>
                            <Card.Link href="/pastreads" style={{position: "absolute", bottom: "10%", left: "40%", color: "#ECDFCF"}}>Teleport!</Card.Link>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </div>
        </div>
    );
}

export default DashboardComp;

