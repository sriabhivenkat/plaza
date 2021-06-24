import React, { useState, useEffect, useCallback, useContext } from 'react';
import './PaperPageComp.css';
import firebase from 'firebase/app';
import DashNavbarComp from './DashNavbarComp.js';
import Chip from '@material-ui/core/Chip';
import { Link, useHistory } from 'react-router-dom';
import { usePaper } from '../lib/papers';

const PaperPageComp = ({id}) => {
    const [pdf, setPdf] = useState("");
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState("");
    const [institution, setInstitution] = useState("");
    const [author, setAuthor] = useState("");
    const [abstract, setAbstract] = useState("");
    const [eli5, setEli5] = useState("");
    const [data, setData] = useState([]);
    const {paper} = usePaper(id)

    useEffect(() => {
        firebase
            .firestore()
            .collection("Users")
            .where("name", '==', paper?.author)
            .get()
            .then((res) => {
                const results = res.docs.map((x) => x.data());
                console.log("results are,", results);
                setData(results);
                console.log("data is: ", data)
            })
    }, [author])

    let history = useHistory()
    console.log("author is", data[0]?.uidvalue)
    function handleClick() {
        history.push(`/author/${data[0]?.uidvalue}`)
    }
    return(
        <>
            <DashNavbarComp />
            <div className="templatecontainer1">
                <div className="titlediv">
                    <h1 style={{textAlign: "center", fontFamily: "Inter"}}><i>{paper?.title}</i></h1>
                    <div className="rowdiv">
                        <a style={{color: "black"}} onClick={handleClick}>
                            <h4 style={{fontWeight: 400, fontFamily: "Inter"}}>{paper?.author},</h4>
                        </a>
                        <h4 style={{marginLeft: 5, fontWeight: 400, fontFamily: "Inter"}}>{paper?.institution}</h4>
                    </div>
                    <div className="rowdiv" style={{marginTop: -10}}>
                    {paper?.tags.map((x) => (
                        <Chip 
                            size="large"
                            label={x}
                            style={{marginRight: 5, backgroundColor: "lightgray", fontFamily: "Inter", fontWeight: "bold"}}
                        />
                    ))}
                    </div>
                </div>
            </div>
            <div className="templatecontainer2">
                {/* file={"https://firebasestorage.googleapis.com/v0/b/project-aurora-e24f6.appspot.com/o/paperFiles%2Fgoogleresearchpaper.pdf?alt=media&token=e96e852a-1caa-4edd-ba82-d2758c763c32"} */}
                <iframe style={{width: "70%", height: "90%", marginTop: 20}} src={paper?.pdfUrl1}></iframe>
            </div>
            <div className="templatecontainer3">
                <h3>More information</h3>
                <div className="moreinfo">
                    <h5>Abstract</h5>
                    <p>{paper?.abstract}</p>
                </div>
                <div className="moreinfo" style={{marginTop: -100}}>
                    <h5>Explain like I'm five</h5>
                    {paper?.easydesc!="" &&
                        <p>{paper?.easydesc}</p>
                    }
                    {paper?.easydesc==="" &&
                        <p>No simplified information was provided for this paper</p>
                    }
                </div>
            </div>
        </>
    )
}

export default PaperPageComp;