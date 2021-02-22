import React, {useState, useEffect} from 'react'
import './DashboardComp.css';
import firebase from 'firebase/app';
import { FormControl } from 'react-bootstrap';


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
        <>
            <div className="dashcontainer">
                <h4>Welcome back, {first}.</h4>
                <form>
                    <div className="inputfield">
                        <label>
                            <input name="keywordsearch" type="keywordsearch" placeholder="Enter keywords to find papers or researchers " size="100"/>
                        </label>
                    </div>
                </form>
            </div>
            <div className="dashcontainer2">
                <h3>Curated</h3>
            </div>
            <div className="dashcontainer3">
                <h3>Past Reads</h3>
            </div>
            <div className="dashcontainer4">
                <h3>Aurora Journal Featured Articles</h3>
            </div>
        </>
    );
}

export default DashboardComp;

