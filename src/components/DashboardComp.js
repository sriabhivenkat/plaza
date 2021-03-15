import React, {useState, useEffect} from 'react'
import './DashboardComp.css';
import firebase from 'firebase/app';
import { FormControl } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

const DashboardComp = () => {
    const [first, setFirstName] = useState("");
    const [last, setLastName] = useState("");

    useEffect(() => {
            const main = async() => {
            const docget = firebase
                .firestore()
                .collection("Users")
                .doc(firebase.auth().currentUser.uid);
            
            const doc = await docget.get();
            const {firstName} = doc.data();
            const {lastName} = doc.data();

            setFirstName(firstName);
            setLastName(lastName);
        };
        main();
    }, [])
    
    //const searchforshit=useCallback(async event => {

    //}, [])
    document.title=first+"'s Dashboard"
    return(
        <div className="mainDashContainer">
            <div className="dashcontainer">
                <h4>Welcome back, {first}.</h4>
            </div>
            <div className="dashcontainer2">
                <CardDeck>
                    <Card style={{ width: "23rem", height: "25rem",marginRight: "5%", overflowY: "none", backgroundColor: "#171e24", display: "flex", textAlign: "center", borderRadius: "25px", boxShadow: "0 0 5px 5px lightgray", position: "relative"}}>
                        <Card.Body>
                            <Card.Title style={{fontSize: "35px", color: "#ECDFCF"}} numberOfLines={1}>Curated</Card.Title>
                            <Card.Subtitle style={{color: "#ECDFCF"}}>Papers. Just for you.</Card.Subtitle>
                            <Card.Link href="/curated" style={{position: "absolute", bottom: "10%", left: "40%", color: "#ECDFCF"}}>Teleport!</Card.Link>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "23rem", height: "25rem",marginRight: "5%", overflowY: "none", backgroundColor: "#171e24", display: "flex", textAlign: "center", borderRadius: "25px", boxShadow: "0 0 5px 5px lightgray", position: "relative"}}>
                        <Card.Body>
                            <Card.Title style={{fontSize: "35px", color: "#ECDFCF"}} numberOfLines={1}>Past Reads</Card.Title>
                            <Card.Subtitle style={{color: "#ECDFCF"}}>Refer to a past paper.</Card.Subtitle>
                            <Card.Link href="/curated" style={{position: "absolute", bottom: "10%", left: "40%", color: "#ECDFCF"}}>Teleport!</Card.Link>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: "23rem", height: "25rem",marginRight: "5%", overflowY: "none", backgroundColor: "#171e24", display: "flex", textAlign: "center", borderRadius: "25px", boxShadow: "0 0 5px 5px lightgray", position: "relative"}}>
                        <Card.Body>
                            <Card.Title style={{fontSize: "35px", color: "#ECDFCF"}} numberOfLines={1}>Aurora Journal Featured Articles</Card.Title>
                            <Card.Link href="/curated" style={{position: "absolute", bottom: "10%", left: "40%", color: "#ECDFCF"}}>Teleport!</Card.Link>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </div>
            
        </div>
    );
}

export default DashboardComp;

