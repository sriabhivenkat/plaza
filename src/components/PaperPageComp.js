import React, { useState, useEffect, useCallback, useContext } from 'react';
import './PaperPageComp.css';
import firebase from 'firebase/app';
import DashNavbarComp from './DashNavbarComp.js';
import Chip from '@material-ui/core/Chip';
import { Link, useHistory } from 'react-router-dom';

const PaperPageComp = ({id}) => {
    const [pdf, setPdf] = useState("");
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState("");
    const [institution, setInstitution] = useState("");
    const [author, setAuthor] = useState("");
    const [abstract, setAbstract] = useState("");
    const [eli5, setEli5] = useState("");
    const [data, setData] = useState([])
    useEffect(() => {
        const main = async() => {
          const paperData = 
            firebase
              .firestore()
              .collection("Papers")
              .doc(id);
          const paperDoc = 
            await paperData
              .get()
          const {pdfUrl1, tags, title, institution, author, abstract, easydesc } = paperDoc.data()
          console.log(pdfUrl1)
          setPdf(pdfUrl1);
          console.log("pdf is",  pdf)
          setTags(tags);
          setTitle(title);
          setInstitution(institution);
          setAuthor(author);
          setAbstract(abstract);
          setEli5(easydesc);
        };
        main();
      }, [])

    useEffect(() => {
        firebase
            .firestore()
            .collection("Users")
            .where("name", '==', author)
            .get()
            .then((res) => {
                const results = res.docs.map((x) => x.data());
                console.log("results are,", results);
                setData(results);
                console.log(data)
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
                    <h1 style={{textAlign: "center"}}><i>{title}</i></h1>
                    <div className="rowdiv">
                        <a style={{color: "black"}} onClick={handleClick}>
                            <h4>{author},</h4>
                        </a>
                        <h4 style={{marginLeft: 5}}>{institution}</h4>
                    </div>
                    <div className="rowdiv" style={{marginTop: -10}}>
                    {tags.map((x) => (
                        <Chip 
                            size="large"
                            label={x}
                            style={{marginRight: 5, backgroundColor: "lightgray"}}
                        />
                    ))}
                    </div>
                </div>
            </div>
            <div className="templatecontainer2">
                {/* file={"https://firebasestorage.googleapis.com/v0/b/project-aurora-e24f6.appspot.com/o/paperFiles%2Fgoogleresearchpaper.pdf?alt=media&token=e96e852a-1caa-4edd-ba82-d2758c763c32"} */}
                <iframe style={{width: "70%", height: "90%", marginTop: 20}} src={pdf}></iframe>
            </div>
            <div className="templatecontainer3">
                <h3>More information</h3>
                <div className="moreinfo">
                    <h5>Abstract</h5>
                    <p>{abstract}</p>
                </div>
                <div className="moreinfo" style={{marginTop: -100}}>
                    <h5>Explain like I'm five</h5>
                    {eli5!="" &&
                        <p>{eli5}</p>
                    }
                    {eli5==="" &&
                        <p>No simplified information was provided for this paper</p>
                    }
                </div>
            </div>
        </>
    )
}

export default PaperPageComp;