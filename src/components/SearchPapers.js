import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import './Search.css';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';


const SearchPapers = () => {
    const [queryval, setQueryVal] = useState("")
    const [data, setData] = useState([]);

    useEffect(() => {
        if (queryval.length > 1) {
            firebase
                .firestore()
                .collection("Papers")
                .where("title", ">=", queryval)
                .where("title", "<=", queryval + "\uf8ff")
                .get()
                .then((res) => {
                    const results = res.docs.map((x) => x.data());
                    setData(results);
                })
                .catch((err) => alert(err));
        } else {
            setData([]);
        }
    }, [queryval])
    return (
        <>
            <div className="searchcontainer1">
                <h2>Find Papers</h2>
                <form>
                    <div className="inputfield">
                        <label>
                            <input
                                name="keywordsearch"
                                type="keywordsearch"
                                placeholder="Enter keywords to find papers"
                                size="100"
                                onChange={queryText => setQueryVal(queryText.target.value)}
                                value={queryval}
                            />
                        </label>
                    </div>
                </form>
            </div>
            <div className="searchcontainer2">
                {data.map((item) => {
                    <h1>hello</h1>
                })}
                <h1>hello</h1>
            </div>
        </>
    )
}

export default SearchPapers;